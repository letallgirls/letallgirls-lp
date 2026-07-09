import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo-blu.png'
import { NAV_GROUPS, HOW_TO_HELP_LINK, DIDI_LINK } from '../../constants/nav'
import { NavDropdown } from './NavDropdown'

const NAV_LINK_CLASS = 'text-night/80 hover:text-brave-primary font-medium text-sm transition-colors'

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
    <header className="sticky top-0 z-50 bg-cloud-light border-b border-night/10">
      <nav className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 py-4 flex items-center justify-between gap-6 flex-wrap">
        <Link to="/" className="shrink-0">
          <img src={logo} alt="LetAllGirls" className="h-12 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to={DIDI_LINK.href} className={NAV_LINK_CLASS}>
            {DIDI_LINK.label}
          </Link>
          {NAV_GROUPS.map((group) => (
            <NavDropdown key={group.label} label={group.label} items={group.items} />
          ))}
          <Link to={HOW_TO_HELP_LINK.href} className={NAV_LINK_CLASS}>
            {HOW_TO_HELP_LINK.label}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://gofund.me/5663872b"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-dashed border-night/40 px-5 py-2 text-sm font-medium text-night hover:border-brave-primary hover:text-brave-primary transition-colors"
          >
            Donate
          </a>
          <button
            type="button"
            className="p-1 text-night md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <HamburgerIcon />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-night/10 bg-cloud-neutral px-6 py-4 flex flex-col gap-5">
          <Link
            to={DIDI_LINK.href}
            className={NAV_LINK_CLASS}
            onClick={() => setMenuOpen(false)}
          >
            {DIDI_LINK.label}
          </Link>
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="text-xs font-semibold uppercase tracking-wide text-night/50 mb-2">
                {group.label}
              </p>
              <div className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={NAV_LINK_CLASS}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link
            to={HOW_TO_HELP_LINK.href}
            className={NAV_LINK_CLASS}
            onClick={() => setMenuOpen(false)}
          >
            {HOW_TO_HELP_LINK.label}
          </Link>
        </div>
      )}
    </header>
  )
}
