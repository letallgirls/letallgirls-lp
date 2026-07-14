import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface GalleryImage {
  src: string
  alt: string
}

interface ExpandableGalleryProps {
  images: GalleryImage[]
  className?: string
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return isMobile
}

export function ExpandableGallery({ images, className = '' }: ExpandableGalleryProps) {
  const isMobile = useIsMobile()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const getFlexValue = (index: number) => {
    if (activeIndex === null) return 1
    if (activeIndex === index) return 2
    return isMobile ? 0.25 : 0.5
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
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
            <motion.div
              className="absolute inset-0 bg-night"
              initial={{ opacity: 0 }}
              animate={{ opacity: activeIndex === index ? 0 : 0.25 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
