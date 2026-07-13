import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryImage {
  src: string
  alt: string
}

interface ExpandableGalleryProps {
  images: GalleryImage[]
  className?: string
}

export function ExpandableGallery({ images, className = '' }: ExpandableGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedIndex !== null) setSelectedIndex((selectedIndex + 1) % images.length)
  }

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedIndex !== null) setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
  }

  useEffect(() => {
    if (selectedIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedIndex])

  const getFlexValue = (index: number) => {
    if (hoveredIndex === null) return 1
    return hoveredIndex === index ? 2 : 0.5
  }

  return (
    <div className={className}>
      <div className="flex gap-2 h-64 sm:h-80 md:h-[26rem] w-full">
        {images.map((image, index) => (
          <motion.div
            key={image.src}
            className="relative cursor-pointer overflow-hidden rounded-2xl"
            style={{ flex: 1 }}
            animate={{ flex: getFlexValue(index) }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setSelectedIndex(index)}
          >
            <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
            <motion.div
              className="absolute inset-0 bg-night"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === index ? 0 : 0.25 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-night/95 p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 text-cloud-light/80 hover:text-cloud-light transition-colors"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close gallery"
            >
              <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {images.length > 1 && (
              <button
                className="absolute left-4 md:left-6 z-10 text-cloud-light/80 hover:text-cloud-light transition-colors"
                onClick={goToPrev}
                aria-label="Previous image"
              >
                <svg className="size-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            <motion.div className="relative max-w-5xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={selectedIndex}
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                className="w-full h-full object-contain rounded-2xl"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {images.length > 1 && (
              <button
                className="absolute right-4 md:right-6 z-10 text-cloud-light/80 hover:text-cloud-light transition-colors"
                onClick={goToNext}
                aria-label="Next image"
              >
                <svg className="size-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-13 font-semibold text-cloud-light bg-cloud-light/10 px-4 py-2 rounded-full">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
