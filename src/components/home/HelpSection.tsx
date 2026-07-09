import { motion } from 'framer-motion'
import { Reveal } from '../ui/Reveal'
import { GOFUNDME_URL, EXTERNAL_LINK_PROPS } from '../../constants/links'

const helpOptions = [
  {
    title: 'Sponsor a Device',
    price: '$25 / month',
    body: 'Support one DIDI device serving upwards of 500 students every month.',
  },
  {
    title: 'Donate Computers',
    price: 'In-kind',
    body: 'Refreshing your fleet? Send us the previous generation — it goes directly to students who need it.',
  },
  {
    title: 'Become a Partner',
    price: 'Multi-school',
    body: 'For school districts and operators looking to bring DIDI into their network at scale.',
  },
]

export function HelpSection() {
  return (
    <section id="help" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-3xl mb-16">
          <span className="text-13 text-label font-semibold text-brave-primary uppercase tracking-widest">
            How to Help
          </span>
          <h2 className="text-39 md:text-49 font-semibold mt-4 leading-[1.1] tracking-tight">
            Concrete ways to support LetAllGirls.
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpOptions.map((opt, i) => (
            <Reveal key={opt.title} delay={i * 0.07}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-full p-8 rounded-2xl bg-cloud-light border border-brave-primary/10 hover:border-brave-primary hover:shadow-xl hover:shadow-brave-primary/5 transition-all flex flex-col"
              >
                <span className="text-13 text-label font-semibold uppercase tracking-widest text-blossom-extra">
                  {opt.price}
                </span>
                <h3 className="text-20 font-semibold mt-2 mb-3">{opt.title}</h3>
                <p className="text-night/60 font-medium leading-[1.4] flex-1">{opt.body}</p>
                <a
                  href={GOFUNDME_URL}
                  {...EXTERNAL_LINK_PROPS}
                  className="mt-6 inline-flex items-center gap-2 text-13 text-label font-semibold text-brave-primary hover:gap-3 transition-all"
                >
                  Get started
                  <span aria-hidden>→</span>
                </a>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
