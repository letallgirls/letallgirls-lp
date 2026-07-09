import type { ReactNode } from 'react'
import { GOFUNDME_URL, EXTERNAL_LINK_PROPS } from '../../constants/links'

// TODO: confirm the correct public contact address before launch.
const CONTACT_EMAIL = 'hello@letallgirls.org'

function Row({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 size-11 rounded-xl bg-brave-primary/10 flex items-center justify-center text-brave-primary">
        {icon}
      </div>
      <div>
        <h3 className="text-16 font-semibold">{title}</h3>
        <div className="mt-1 text-night/60 font-medium leading-[1.5]">{children}</div>
      </div>
    </div>
  )
}

const iconClass = 'size-5'

export function ContactDetails() {
  return (
    <div className="rounded-3xl bg-brave-light border border-brave-primary/10 p-6 md:p-10 space-y-8">
      <Row
        title="Email us"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={iconClass}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
          </svg>
        }
      >
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-brave-primary hover:underline">
          {CONTACT_EMAIL}
        </a>
        <p className="mt-1 text-13 text-label">We usually reply within a couple of business days.</p>
      </Row>

      <Row
        title="Want to give directly?"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={iconClass}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21s-7-4.35-9.5-8.5C1 9.5 2.5 6 6 6c2 0 3.2 1.2 4 2.5C10.8 7.2 12 6 14 6c3.5 0 5 3.5 3.5 6.5C19 16.65 12 21 12 21z"
            />
          </svg>
        }
      >
        <a href={GOFUNDME_URL} {...EXTERNAL_LINK_PROPS} className="text-brave-primary hover:underline">
          Donate on GoFundMe
        </a>
        <p className="mt-1 text-13 text-label">Every gift funds DIDI devices in the field.</p>
      </Row>

      <Row
        title="Where we work"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={iconClass}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c4-4 7-7.5 7-11a7 7 0 10-14 0c0 3.5 3 7 7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        }
      >
        Piloting on the ground in South Sudan, with a team spread across three continents.
      </Row>

      <div className="pt-6 border-t border-brave-primary/10">
        <p className="text-13 text-label text-night/60 leading-[1.6]">
          LetAllGirls is a registered <span className="text-night font-semibold">501(c)(3)</span>{' '}
          nonprofit. Donations are tax-deductible to the extent allowed by law.
          {/* TODO: add EIN + a link to the determination letter / Candid profile. */}
        </p>
      </div>
    </div>
  )
}
