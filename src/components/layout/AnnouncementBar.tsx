import { useEffect, useRef, useState, type ReactNode } from 'react'

const SLIDES: { label: string; href: string | null }[] = [
  { label: 'LetAllGirls', href: null },
  { label: 'Donate', href: 'https://gofund.me/5663872b' },
  { label: 'Join Our Team', href: null },
]

function Chevron({ className = '' }: { className?: string }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
        fill="currentColor"
      />
    </svg>
  )
}

function SlideContent({ label, href }: { label: string; href: string | null }) {
  return href ? (
    <a
      href={href}
      className="font-medium tracking-wide whitespace-nowrap underline decoration-1 underline-offset-4 decoration-blue-fg/50 hover:decoration-blue-fg transition-[text-decoration-color]"
    >
      {label}
    </a>
  ) : (
    <span className="font-medium tracking-wide whitespace-nowrap">{label}</span>
  )
}

/** Mounts fresh per slide change (keyed by parent), so its local state always starts unsettled. */
function Slide({
  children,
  direction,
  phase,
  onDone,
}: {
  children: ReactNode
  direction: number
  phase: 'enter' | 'exit'
  onDone?: () => void
}) {
  const [settled, setSettled] = useState(phase === 'exit')

  useEffect(() => {
    if (phase !== 'enter') return
    const raf = requestAnimationFrame(() => setSettled(true))
    return () => cancelAnimationFrame(raf)
  }, [phase])

  useEffect(() => {
    if (phase !== 'exit') return
    const raf = requestAnimationFrame(() => setSettled(false))
    const timeout = setTimeout(() => onDone?.(), 260)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // enter comes from `direction`'s side; exit leaves toward the opposite side
  const enterFrom = direction > 0 ? '1.25rem' : '-1.25rem'
  const exitTo = direction > 0 ? '-1.25rem' : '1.25rem'
  const unsettledOffset = phase === 'enter' ? enterFrom : exitTo

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        transform: settled ? 'translateX(0)' : `translateX(${unsettledOffset})`,
        opacity: settled ? 1 : 0,
        transition: 'transform 0.25s ease, opacity 0.25s ease',
      }}
    >
      {children}
    </div>
  )
}

type Entry = { key: number; index: number; direction: number }

export function AnnouncementBar() {
  const nonce = useRef(1)
  const [active, setActive] = useState<Entry>({ key: 0, index: 0, direction: 1 })
  const [exiting, setExiting] = useState<Entry | null>(null)

  function go(delta: number) {
    setExiting(active)
    setActive({
      key: nonce.current++,
      index: (active.index + delta + SLIDES.length) % SLIDES.length,
      direction: delta,
    })
  }

  useEffect(() => {
    const id = setInterval(() => go(1), 7000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  return (
    <div className="bg-gradient-blue text-blue-fg text-sm overflow-hidden">
      <div className="mx-auto max-w-[130rem] px-6 md:px-10 lg:px-28 flex items-center justify-between py-2">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous announcement"
          className="p-1 opacity-80 hover:opacity-100 shrink-0"
        >
          {/* down-chevron rotated 90deg clockwise = left-pointing */}
          <Chevron className="rotate-90" />
        </button>

        <div className="relative flex-1 h-5">
          {exiting && (
            <Slide
              key={exiting.key}
              direction={exiting.direction}
              phase="exit"
              onDone={() => setExiting(null)}
            >
              <SlideContent {...SLIDES[exiting.index]} />
            </Slide>
          )}
          <Slide key={active.key} direction={active.direction} phase="enter">
            <SlideContent {...SLIDES[active.index]} />
          </Slide>
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next announcement"
          className="p-1 opacity-80 hover:opacity-100 shrink-0"
        >
          {/* down-chevron rotated 90deg counter-clockwise = right-pointing */}
          <Chevron className="-rotate-90" />
        </button>
      </div>
    </div>
  )
}
