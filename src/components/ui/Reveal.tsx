import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const offsetFor = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance }
    case 'down':
      return { y: -distance }
    case 'left':
      return { x: distance }
    case 'right':
      return { x: -distance }
    case 'none':
      return {}
  }
}

type RevealTag = 'div' | 'section' | 'li' | 'article' | 'figure' | 'p'

interface RevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  distance?: number
  direction?: Direction
  className?: string
  as?: RevealTag
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.9,
  distance = 28,
  direction = 'up',
  className,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as]
  const offset = offsetFor(direction, distance)
  const variants: Variants = {
    hidden: { opacity: 0, ...offset, filter: 'blur(6px)' },
    visible: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' },
  }
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

interface StaggerProps {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
  as?: 'div' | 'section' | 'ul' | 'ol'
}

/**
 * Wrap a group of Reveal children (or any motion children using
 * variants "hidden"/"visible") to have them cascade in when the
 * container enters the viewport.
 */
export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.12,
  as = 'div',
}: StaggerProps) {
  const MotionTag = motion[as]
  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }
  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </MotionTag>
  )
}
