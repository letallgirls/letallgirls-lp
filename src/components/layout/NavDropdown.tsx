import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

type DropdownItem = { label: string; href: string }

function ChevronIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
        fill="currentColor"
      />
    </svg>
  )
}

export function NavDropdown({ label, items }: { label: string; items: DropdownItem[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function handlePointer(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="flex items-center gap-1.5 text-night/80 hover:text-brave-primary font-medium text-base transition-colors"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
        <ChevronIcon className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full mt-3 min-w-[13rem] rounded-2xl bg-cloud-light shadow-xl border border-night/5 p-2 transition-all duration-150 origin-top z-10 ${
          open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            onClick={() => setOpen(false)}
            className="block rounded-xl px-4 py-2.5 text-base text-night/80 hover:bg-cloud-neutral hover:text-brave-primary transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
