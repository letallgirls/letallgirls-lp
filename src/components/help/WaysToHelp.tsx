import type { ReactNode } from 'react'
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
  const content = (
    <span className="group/cta inline-flex items-center gap-1.5 text-16 font-semibold text-brave-primary">
      {way.cta}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-3.5 transition-transform group-hover/cta:translate-x-0.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  )

  return way.external ? (
    <a href={way.href} {...EXTERNAL_LINK_PROPS}>
      {content}
    </a>
  ) : (
    <Link to={way.href}>{content}</Link>
  )
}

export function WaysToHelp() {
  return (
    <section className="py-24 px-6">
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

        <Reveal delay={0.1} className="grid sm:grid-cols-2 lg:grid-cols-3 rounded-2xl border-t border-l border-night/10 overflow-hidden">
          {ways.map((way) => (
            <article
              key={way.title}
              className={`relative p-8 md:p-10 flex flex-col border-r border-b border-night/10 ${
                way.highlight ? 'bg-brave-light/50' : ''
              }`}
            >
              {way.highlight && (
                <span className="absolute top-8 right-8 md:top-10 md:right-10 text-13 text-label font-semibold text-brave-primary uppercase tracking-widest">
                  Recommended
                </span>
              )}
              <div className="text-brave-primary mb-5">{way.icon}</div>
              <h3 className="text-20 font-semibold mb-2.5 leading-tight text-night">{way.title}</h3>
              <p className="text-16 text-night/60 font-medium leading-[1.5] flex-1 mb-6">{way.body}</p>
              <CardCta way={way} />
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
