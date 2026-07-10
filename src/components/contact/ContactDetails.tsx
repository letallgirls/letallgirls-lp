import type { ReactNode } from 'react'
import { GOFUNDME_URL, EXTERNAL_LINK_PROPS } from '../../constants/links'

// TODO: confirm the correct public contact address before launch.
const CONTACT_EMAIL = 'hello@letallgirls.org'

function Row({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="shrink-0 mt-0.5 text-skyward-accent">{icon}</span>
      <div>
        <h3 className="text-16 font-semibold">{title}</h3>
        <div className="mt-1 text-cloud-light/60 font-medium leading-[1.5]">{children}</div>
      </div>
    </div>
  )
}

const iconClass = 'size-6'

export function ContactDetails() {
  return (
    <div className="rounded-3xl bg-brave-primary text-cloud-light p-6 md:p-10 space-y-8">
      <Row
        title="Email us"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={iconClass}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
          </svg>
        }
      >
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-skyward-accent hover:underline">
          {CONTACT_EMAIL}
        </a>
        <p className="mt-1 text-13 text-label text-cloud-light/55">
          We usually reply within a couple of business days.
        </p>
      </Row>

      <Row
        title="Want to give directly?"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={iconClass}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7z"
            />
          </svg>
        }
      >
        <a href={GOFUNDME_URL} {...EXTERNAL_LINK_PROPS} className="text-skyward-accent hover:underline">
          Donate on GoFundMe
        </a>
        <p className="mt-1 text-13 text-label text-cloud-light/55">Every gift funds DIDI devices in the field.</p>
      </Row>

      <div className="pt-6 border-t border-cloud-light/15">
        <p className="text-13 text-label text-cloud-light/55 leading-[1.6]">
          LetAllGirls is a registered <span className="text-cloud-light font-semibold">501(c)(3)</span>{' '}
          nonprofit. Donations are tax-deductible to the extent allowed by law.
          {/* TODO: add EIN + a link to the determination letter / Candid profile. */}
        </p>
      </div>
    </div>
  )
}
