import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { GOFUNDME_URL, EXTERNAL_LINK_PROPS } from '../../constants/links'
import { Reveal } from '../ui/Reveal'

// TODO: confirm the correct public contact address before launch.
const CONTACT_EMAIL = 'hello@letallgirls.org'

const iconClass = 'size-6'

type Method = {
  title: string
  body: string
  cta: string
  href: string
  external?: boolean
  icon: ReactNode
}

const methods: Method[] = [
  {
    title: 'Email us',
    body: 'Our team can respond in real time.',
    cta: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={iconClass}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
  {
    title: 'Give directly',
    body: 'Every gift funds DIDI devices in the field.',
    cta: 'Donate on GoFundMe',
    href: GOFUNDME_URL,
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={iconClass}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7z"
        />
      </svg>
    ),
  },
  {
    title: 'Ways to help',
    body: 'Sponsorship, hardware donation, and partnership options.',
    cta: 'See how to get involved',
    href: '/help',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={iconClass}>
        <circle cx="9" cy="8" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 100-6M3 20a6 6 0 0112 0M15 14a6 6 0 016 6" />
      </svg>
    ),
  },
]

function MethodLink({ m }: { m: Method }) {
  const className = 'text-brave-primary font-semibold hover:underline'
  return m.external ? (
    <a href={m.href} {...EXTERNAL_LINK_PROPS} className={className}>
      {m.cta}
    </a>
  ) : m.href.startsWith('mailto:') ? (
    <a href={m.href} className={className}>
      {m.cta}
    </a>
  ) : (
    <Link to={m.href} className={className}>
      {m.cta}
    </Link>
  )
}

export function ContactMethods() {
  return (
    <section className="pt-10 md:pt-16 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal className="grid sm:grid-cols-3 gap-10">
          {methods.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.08}>
              <div className="size-12 rounded-full bg-brave-primary/10 flex items-center justify-center mb-5 text-brave-primary">
                {m.icon}
              </div>
              <h3 className="text-20 font-semibold text-night">{m.title}</h3>
              <p className="mt-1 text-night/60 font-medium">{m.body}</p>
              <div className="mt-3">
                <MethodLink m={m} />
              </div>
            </Reveal>
          ))}
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-16 text-13 text-label text-night/50 leading-[1.6] max-w-2xl">
            LetAllGirls is a registered <span className="text-night font-semibold">501(c)(3)</span>{' '}
            nonprofit. Donations are tax-deductible to the extent allowed by law.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
