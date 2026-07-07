import { useState } from 'react'
import logo from '../../assets/images/logo-blu.png'

const NAV_LINK_CLASS =
  'relative text-scheme1-fg/80 hover:text-scheme1-fg font-medium text-sm transition-colors ' +
  "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full " +
  'after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-200 ' +
  'hover:after:scale-x-100'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'The D.I.D.I Device', href: '/how-do-we-do-it' },
  { label: 'About Us', href: '/our-mission' },
  { label: 'Join Our Team', href: '/join-our-team' },
  { label: 'Open a Chapter', href: '/open-a-chapter' },
  { label: 'More', href: '/events' },
]

function SearchIcon() {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.7l5.4 5.4a.5.5 0 11-.71.7l-5.41-5.4z"
        fill="currentColor"
      />
    </svg>
  )
}

function AccountIcon() {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 4.5a3 3 0 116 0 3 3 0 01-6 0zm3-4a4 4 0 100 8 4 4 0 000-8zm5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15zM9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35z"
        fill="currentColor"
      />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 5h16l-1 12.5a1 1 0 01-1 .9H3a1 1 0 01-1-.9L1 5z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path d="M5 5V4a4 4 0 118 0v1" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg width="20" height="18" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 .5a.5.5 0 100 1h15.71a.5.5 0 000-1H1zM.5 8a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1A.5.5 0 01.5 8zm0 7a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1a.5.5 0 01-.5-.5z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-gradient-scheme1 border-b border-scheme1-fg/10">
      <div className="relative mx-auto max-w-[130rem] px-6 md:px-10 lg:px-28 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3 text-scheme1-fg">
          <button type="button" aria-label="Search" className="p-1 hover:opacity-70 hidden sm:inline-flex">
            <SearchIcon />
          </button>
          <button
            type="button"
            className="p-1 text-scheme1-fg sm:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <HamburgerIcon />
          </button>
        </div>

        <a href="/" className="absolute left-1/2 -translate-x-1/2">
          <img src={logo} alt="LetAllGirls" className="h-16 w-auto" />
        </a>

        <div className="flex items-center gap-4 text-scheme1-fg">
          <a href="#" aria-label="Log in" className="p-1 hover:opacity-70 hidden sm:inline-flex">
            <AccountIcon />
          </a>
          <a href="#" aria-label="Cart" className="p-1 hover:opacity-70 hidden sm:inline-flex">
            <CartIcon />
          </a>
        </div>
      </div>

      <nav className="hidden sm:flex items-center justify-center gap-8 pt-3 pb-4">
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href} className={NAV_LINK_CLASS}>
            {link.label}
          </a>
        ))}
      </nav>

      {menuOpen && (
        <nav className="sm:hidden border-t border-scheme1-fg/10 bg-scheme1-bg px-6 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-scheme1-fg/80 hover:text-scheme1-fg font-medium text-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
