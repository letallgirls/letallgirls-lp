import { motion } from 'framer-motion'
import { Reveal } from '../ui/Reveal'

const partners = [
  { country: 'South Sudan', devices: '2 deployed', org: 'Eta Power Youth Foundation' },
  { country: 'South Africa', devices: '2 committed · Summer 2026', org: 'Future Horizons' },
  { country: 'Malawi', devices: '2 committed · Summer 2026', org: 'Supportive Pillow Organization' },
  { country: 'Tanzania', devices: '1 committed · Summer 2026', org: "Girls' Foundation of Tanzania" },
]

export function WhereWeWorkSection() {
  return (
    <section id="where-we-work" className="py-32 px-6 bg-brave-light border-y border-brave-primary/10">
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-3xl mb-16">
          <span className="text-13 text-label font-semibold text-brave-primary uppercase tracking-widest">
            Where We Work
          </span>
          <h2 className="text-39 md:text-49 font-semibold mt-4 leading-[1.1] tracking-tight">
            A growing network of schools and community partners.
          </h2>
        </Reveal>
        <ul className="grid md:grid-cols-2 gap-4">
          {partners.map((p, i) => (
            <Reveal as="li" key={p.country} delay={i * 0.08}>
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="p-6 md:p-8 rounded-2xl bg-cloud-light border border-brave-primary/10 hover:border-brave-primary/40 hover:shadow-md transition-all flex items-center justify-between gap-6"
              >
                <div>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="text-25 font-semibold">{p.country}</h3>
                    <span className="text-13 text-label font-semibold uppercase tracking-wider text-brave-primary bg-brave-light px-2 py-1 rounded-full">
                      {p.devices}
                    </span>
                  </div>
                  <p className="mt-2 text-night/60 font-medium">with {p.org}</p>
                </div>
                <svg className="size-6 text-brave-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.3}>
          <p className="mt-8 text-night/60 font-medium">
            Additional partners and relationships in{' '}
            <span className="text-night">Pakistan, Bangladesh, Grenada, and Colombia</span> — with
            more reaching out as awareness of DIDI grows.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
