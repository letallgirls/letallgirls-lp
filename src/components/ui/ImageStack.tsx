import { useEffect, useRef, useState } from 'react'
import { motion, type PanInfo } from 'framer-motion'

interface StackImage {
  src: string
  alt: string
}

interface ImageStackProps {
  images: StackImage[]
  intervalMs?: number
}

const MIN_DRAG_DISTANCE = 50
const OTHER_CARDS_MS = 500
const EASE = [0.22, 1, 0.36, 1] as const

// Toned-down springs for the simulated auto-cycle — heavily damped so there's
// barely any bounce/overshoot, just a touch of natural ease instead of a tween.
const RELEASE_SPRING = { type: 'spring' as const, stiffness: 300, damping: 40 }
const OUT_SPRING = { type: 'spring' as const, stiffness: 300, damping: 40 }
// How long the departing card lingers "kicked out" before the settle spring
// starts — long enough for the out-spring to visibly stop, plus a real pause.
const HOLD_MS = 550
// Generous estimate of how long the settle spring takes to visually finish.
const SETTLE_MS = 550
const AUTO_TOTAL_MS = HOLD_MS + SETTLE_MS

function cardTransform(position: number) {
  return {
    x: position * -12,
    y: position * -10,
    rotate: position === 0 ? 0 : -(4 + position * 4),
    scale: 1 - position * 0.02,
    transition: { duration: OTHER_CARDS_MS / 1000, ease: EASE },
  }
}

// Matches the whileDrag treatment below (flat, scaled up, lifted) so the
// simulated "kick" looks like the same gesture as an actual drag.
function departingOutTransform() {
  return { x: 44, y: -4, rotate: 0, scale: 1.06, transition: OUT_SPRING }
}

function departingSettleTransform(finalPosition: number) {
  const final = cardTransform(finalPosition)
  return { x: final.x, y: final.y, rotate: final.rotate, scale: final.scale, transition: RELEASE_SPRING }
}

export function ImageStack({ images, intervalMs = 4200 }: ImageStackProps) {
  const [order, setOrder] = useState(() => images.map((_, i) => i))
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  // Only set for auto-triggered cycles, so the simulated "kick" is added to the
  // hands-off auto-play case without changing the already-good manual drag feel.
  const [departingId, setDepartingId] = useState<number | null>(null)
  const [departingPhase, setDepartingPhase] = useState<'out' | 'settle'>('out')
  const isAnimatingRef = useRef(false)
  const isHoveredRef = useRef(false)
  const dragStartPos = useRef({ x: 0, y: 0 })
  const orderRef = useRef(order)
  orderRef.current = order

  const advance = (isAuto: boolean) => {
    isAnimatingRef.current = true
    setIsAnimating(true)

    if (isAuto) {
      const frontId = orderRef.current[0]
      setDepartingId(frontId)
      setDepartingPhase('out')
      setOrder((prev) => [...prev.slice(1), prev[0]])
      setTimeout(() => setDepartingPhase('settle'), HOLD_MS)
      setTimeout(() => {
        isAnimatingRef.current = false
        setIsAnimating(false)
        setDepartingId(null)
      }, AUTO_TOTAL_MS)
    } else {
      setOrder((prev) => [...prev.slice(1), prev[0]])
      setTimeout(() => {
        isAnimatingRef.current = false
        setIsAnimating(false)
      }, OTHER_CARDS_MS)
    }
  }

  useEffect(() => {
    if (images.length < 2) return
    const id = setInterval(() => {
      if (!isAnimatingRef.current && !isHoveredRef.current) advance(true)
    }, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs, images.length])

  const handleDragStart = (_: unknown, info: PanInfo) => {
    setHasInteracted(true)
    dragStartPos.current = { x: info.point.x, y: info.point.y }
  }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (isAnimatingRef.current) return
    const dragDistance = Math.hypot(
      info.point.x - dragStartPos.current.x,
      info.point.y - dragStartPos.current.y,
    )
    if (dragDistance < MIN_DRAG_DISTANCE) return
    advance(false)
  }

  return (
    <div
      className="relative w-full aspect-[4/5]"
      onMouseEnter={() => {
        isHoveredRef.current = true
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false
      }}
    >
      {order.map((imageIndex, position) => {
        const isTop = position === 0
        const isDeparting = imageIndex === departingId
        const image = images[imageIndex]
        const zIndex = isDeparting && departingPhase === 'out' ? images.length + 1 : images.length - position
        return (
          <motion.div
            key={imageIndex}
            className="absolute inset-0 origin-bottom rounded-2xl overflow-hidden shadow-xl shadow-night/15 bg-cloud-light cursor-grab active:cursor-grabbing"
            style={{ zIndex }}
            animate={
              isDeparting
                ? departingPhase === 'out'
                  ? departingOutTransform()
                  : departingSettleTransform(position)
                : cardTransform(position)
            }
            aria-hidden={!isTop}
            drag={isTop && !isAnimating}
            dragElastic={0.2}
            dragConstraints={{ left: -120, right: 120, top: -120, bottom: 120 }}
            dragSnapToOrigin
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            whileHover={isTop ? { scale: 1.03, transition: { duration: 0.2 } } : {}}
            whileDrag={{
              scale: 1.06,
              rotate: 0,
              zIndex: images.length + 2,
              boxShadow: '0 25px 50px -12px rgba(20, 20, 50, 0.35)',
              transition: { duration: 0.1 },
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          </motion.div>
        )
      })}

      {images.length > 1 && !hasInteracted && (
        <motion.div
          className="pointer-events-none absolute -bottom-3 -right-3 z-[70] flex size-8 items-center justify-center rounded-full bg-night/80 text-cloud-light shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, x: [0, -3, 0] }}
          transition={{
            opacity: { delay: 1.5, duration: 0.4 },
            scale: { delay: 1.5, duration: 0.4 },
            x: { delay: 1.9, duration: 1.4, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' },
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8L22 12L18 16" />
            <path d="M2 12H22" />
          </svg>
        </motion.div>
      )}
    </div>
  )
}
