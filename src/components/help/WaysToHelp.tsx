import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Reveal'
import { GOFUNDME_URL, EXTERNAL_LINK_PROPS } from '../../constants/links'

type Way = {
  title: string
  body: string
  cta: string
  href: string
  external?: boolean
  highlight?: boolean
  icon: ReactNode
}

const icon = (path: ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="size-6">
    {path}
  </svg>
)

const ways: Way[] = [
  {
    title: 'Donate',
    body: 'General gifts go toward whatever LetAllGirls needs most, including manufacturing, shipping, R&D, or field support.',
    cta: 'Donate now',
    href: GOFUNDME_URL,
    external: true,
    icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-4.35-9.5-8.5C1 9.5 2.5 6 6 6c2 0 3.2 1.2 4 2.5C10.8 7.2 12 6 14 6c3.5 0 5 3.5 3.5 6.5C19 16.65 12 21 12 21z" />),
  },
  {
    title: 'Sponsor a Device',
    body: '$25/month supports one DIDI device serving upwards of 500 students. This is a tangible, recurring way to see exactly what you power.',
    cta: 'Sponsor now',
    href: GOFUNDME_URL,
    external: true,
    highlight: true,
    icon: icon(<><rect x="4" y="4" width="16" height="12" rx="2" strokeLinejoin="round" /><path strokeLinecap="round" d="M8 20h8M12 16v4" /></>),
  },
  {
    title: 'Donate Computers',
    body: 'Refreshing your fleet? Previous-generation laptops go straight to students who would otherwise have no way to connect to DIDI.',
    cta: 'Get in touch',
    href: '/contact',
    icon: icon(<><rect x="3" y="5" width="18" height="12" rx="1.5" strokeLinejoin="round" /><path strokeLinecap="round" d="M2 21h20" /></>),
  },
  {
    title: 'Corporate Sponsor',
    body: 'Fund DIDI deployments starting at $1,000+, deployed under your name at the schools you help reach with real devices for real students.',
    cta: 'Get in touch',
    href: '/contact',
    icon: icon(<><path strokeLinejoin="round" d="M4 21V6l8-3 8 3v15" /><path strokeLinecap="round" d="M9 21v-5h6v5M9 9h.01M15 9h.01M9 13h.01M15 13h.01" /></>),
  },
  {
    title: 'Become a Partner',
    body: 'For schools, districts, and multi-school operators looking to bring DIDI into their network at scale.',
    cta: 'Get in touch',
    href: '/contact',
    icon: icon(<><circle cx="9" cy="8" r="3" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 100-6M3 20a6 6 0 0112 0M15 14a6 6 0 016 6" /></>),
  },
]

function CardCta({ way }: { way: Way }) {
  const className = way.highlight
    ? 'inline-flex items-center gap-2 rounded-full bg-cloud-light text-brave-primary px-6 py-2.5 text-13 font-semibold hover:-translate-y-0.5 transition-transform'
    : 'inline-flex items-center gap-2 rounded-full bg-brave-primary text-cloud-light px-6 py-2.5 text-13 font-semibold hover:bg-brave-extra transition-colors'

  return way.external ? (
    <a href={way.href} {...EXTERNAL_LINK_PROPS} className={className}>
      {way.cta}
    </a>
  ) : (
    <Link to={way.href} className={className}>
      {way.cta}
    </Link>
  )
}

export function WaysToHelp() {
  return (
    <section className="py-24 px-6 bg-brave-extra/[0.03]">
      <div className="max-w-7xl mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-13 text-label font-semibold text-brave-primary uppercase tracking-widest">
              Ways to help
            </span>
            <h2 className="text-31 md:text-49 font-semibold mt-4 leading-[1.1] tracking-tight">
              More than a donate button.
            </h2>
            <p className="mt-4 text-16 text-night/70 font-medium leading-[1.5]">
              Whether you give, sponsor, donate hardware, or partner with us, every path leads to a
              real device in a real classroom.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ways.map((way, i) => (
            <Reveal key={way.title} delay={i * 0.06}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`h-full p-8 rounded-3xl flex flex-col transition-all ${
                  way.highlight
                    ? 'bg-brave-primary text-cloud-light shadow-xl shadow-brave-primary/20'
                    : 'bg-brave-light text-night border border-brave-primary/10 hover:border-brave-primary/30'
                }`}
              >
                <div
                  className={`size-12 rounded-2xl flex items-center justify-center mb-6 ${
                    way.highlight ? 'bg-cloud-light/15 text-cloud-light' : 'bg-brave-primary/10 text-brave-primary'
                  }`}
                >
                  {way.icon}
                </div>
                <h3 className="text-25 font-semibold mb-3 leading-tight">{way.title}</h3>
                <p
                  className={`font-medium leading-[1.5] flex-1 mb-8 ${
                    way.highlight ? 'text-cloud-light/80' : 'text-night/60'
                  }`}
                >
                  {way.body}
                </p>
                <CardCta way={way} />
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
