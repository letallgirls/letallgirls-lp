import { ContactHero } from '../components/contact/ContactHero'
import { ContactForm } from '../components/contact/ContactForm'
import { ContactDetails } from '../components/contact/ContactDetails'
import { Reveal } from '../components/ui/Reveal'

export function Contact() {
  return (
    <>
      <ContactHero />
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.3fr_0.7fr] gap-8 items-start">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1}>
            <ContactDetails />
          </Reveal>
        </div>
      </section>
    </>
  )
}
