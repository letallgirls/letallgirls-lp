import { useEffect, useRef, type ReactNode } from 'react'

interface GooeyTextProps {
  texts: string[]
  morphTime?: number
  cooldownTime?: number
  className?: string
  textClassName?: string
}

const cx = (...parts: (string | undefined | false)[]) => parts.filter(Boolean).join(' ')

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
}: GooeyTextProps): ReactNode {
  const text1Ref = useRef<HTMLSpanElement | null>(null)
  const text2Ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    let textIndex = texts.length - 1
    let time = new Date()
    let morph = 0
    let cooldown = cooldownTime
    let rafId = 0

    const setMorph = (fraction: number) => {
      if (!text1Ref.current || !text2Ref.current) return
      text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
      text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

      const inv = 1 - fraction
      text1Ref.current.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`
      text1Ref.current.style.opacity = `${Math.pow(inv, 0.4) * 100}%`
    }

    const doCooldown = () => {
      morph = 0
      if (!text1Ref.current || !text2Ref.current) return
      text2Ref.current.style.filter = ''
      text2Ref.current.style.opacity = '100%'
      text1Ref.current.style.filter = ''
      text1Ref.current.style.opacity = '0%'
    }

    const doMorph = () => {
      morph -= cooldown
      cooldown = 0
      let fraction = morph / morphTime
      if (fraction > 1) {
        cooldown = cooldownTime
        fraction = 1
      }
      setMorph(fraction)
    }

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const newTime = new Date()
      const shouldIncrementIndex = cooldown > 0
      const dt = (newTime.getTime() - time.getTime()) / 1000
      time = newTime

      cooldown -= dt

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length]
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length]
          }
        }
        doMorph()
      } else {
        doCooldown()
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [texts, morphTime, cooldownTime])

  return (
    <div className={cx('relative', className)}>
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <defs>
          <filter id="gooey-threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="relative flex h-full w-full items-start"
        style={{ filter: 'url(#gooey-threshold)' }}
      >
        <span
          ref={text1Ref}
          className={cx('absolute top-0 left-0 inline-block w-full select-none text-left', textClassName)}
        >
          {texts[texts.length - 1]}
        </span>
        <span
          ref={text2Ref}
          className={cx('absolute top-0 left-0 inline-block w-full select-none text-left', textClassName)}
        >
          {texts[0]}
        </span>
      </div>
    </div>
  )
}
