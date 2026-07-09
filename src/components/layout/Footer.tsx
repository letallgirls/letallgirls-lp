import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo-blu.png'
import { GOFUNDME_URL, EXTERNAL_LINK_PROPS } from '../../constants/links'

const LINK_CLASS = 'hover:text-brave-primary transition-colors'

const exploreLinks = [
  { label: 'Our Story', href: '/our-story' },
  { label: 'DIDI', href: '/#didi' },
  { label: 'Proven Impact', href: '/#impact' },
  { label: 'Where We Work', href: '/#where-we-work' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-cloud-light border-t border-brave-primary/10 py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <Link to="/" className="inline-block">
            <img src={logo} alt="LetAllGirls" className="h-10 w-auto mb-6" />
          </Link>
          <p className="text-night/60 font-medium leading-[1.5] max-w-md">
            A registered 501(c)(3) nonprofit. Donations are tax-deductible to the extent allowed by
            law.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-13">
          <div>
            <p className="text-13 text-label font-semibold uppercase tracking-widest text-brave-primary mb-4">
              Explore
            </p>
            <ul className="space-y-3 text-night/70 font-medium">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className={LINK_CLASS}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-13 text-label font-semibold uppercase tracking-widest text-brave-primary mb-4">
              Get Involved
            </p>
            <ul className="space-y-3 text-night/70 font-medium">
              <li>
                <a href={GOFUNDME_URL} {...EXTERNAL_LINK_PROPS} className={LINK_CLASS}>
                  Donate
                </a>
              </li>
              <li>
                <Link to="/#help" className={LINK_CLASS}>
                  Sponsor a Device
                </Link>
              </li>
              <li>
                <Link to="/#help" className={LINK_CLASS}>
                  Corporate Sponsor
                </Link>
              </li>
              <li>
                <Link to="/#help" className={LINK_CLASS}>
                  Become a Partner
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-brave-primary/10 flex flex-col md:flex-row justify-between gap-4 text-13 text-label text-night/50 font-medium">
        <span>© {year} LetAllGirls · 501(c)(3) Nonprofit</span>
        <span>In loving memory of Ding Mayen "Didi" Kuai</span>
      </div>
    </footer>
  )
}
