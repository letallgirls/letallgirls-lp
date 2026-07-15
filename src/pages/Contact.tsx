import { ContactHero } from '../components/contact/ContactHero'
import { ContactMethods } from '../components/contact/ContactMethods'
// The full contact form (ContactForm.tsx) and the dark-card contact details
// (ContactDetails.tsx) are left in place, unused, in case a stakeholder wants
// the form back — swap ContactMethods for <ContactForm /> + <ContactDetails />
// (see git history / this comment) to restore the previous layout.

export function Contact() {
  return (
    <>
      <ContactHero />
      <ContactMethods />
    </>
  )
}
