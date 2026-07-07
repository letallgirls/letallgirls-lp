import { useEffect, useRef, useState, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  /** stagger index, matches Shopify's --animation-order (75ms per step) */
  order?: number
}

export function Reveal({ children, className, order = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -50px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transitionProperty: 'opacity, transform',
        transitionDuration: '0.6s',
        transitionTimingFunction: 'var(--ease-out-slow)',
        transitionDelay: `${order * 75}ms`,
        opacity: visible ? 1 : 0.01,
        transform: visible ? 'translateY(0)' : 'translateY(2rem)',
      }}
    >
      {children}
    </div>
  )
}
