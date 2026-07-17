import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Reveal'
import { GOFUNDME_URL, EXTERNAL_LINK_PROPS } from '../../constants/links'

const helpOptions = [
  {
    title: 'Donate',
    price: 'Any amount',
    body: 'General gifts go toward whatever LetAllGirls needs most, from manufacturing to field support.',
    href: GOFUNDME_URL,
    external: true,
  },
  {
    title: 'Donate Computers',
    price: 'In-kind',
    body: 'Refreshing your fleet? Send us the previous generation. It goes directly to students who need it.',
    href: '/contact',
    external: false,
  },
  {
    title: 'Become a Corporate Sponsor',
    price: '$1,000+',
    body: 'Fund DIDI deployments under your company name, reaching real schools and real students.',
    href: '/contact',
    external: false,
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
                {opt.external ? (
                  <a
                    href={opt.href}
                    {...EXTERNAL_LINK_PROPS}
                    className="mt-6 inline-flex items-center gap-2 text-13 text-label font-semibold text-brave-primary hover:gap-3 transition-all"
                  >
                    Get started
                    <span aria-hidden>→</span>
                  </a>
                ) : (
                  <Link
                    to={opt.href}
                    className="mt-6 inline-flex items-center gap-2 text-13 text-label font-semibold text-brave-primary hover:gap-3 transition-all"
                  >
                    Get started
                    <span aria-hidden>→</span>
                  </Link>
                )}
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.28} className="mt-28 md:mt-36">
          <div className="rounded-2xl md:rounded-3xl bg-blossom-extra text-cloud-light p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-25 md:text-31 font-semibold">Want a DIDI?</h3>
              <p className="mt-2 text-cloud-light/80 font-medium max-w-xl">
                Bring DIDI to your school, library, or community center. Tell us where you are and
                what you need.
              </p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 text-center px-8 py-4 bg-cloud-light text-blossom-extra font-semibold rounded-full hover:bg-cloud-light/90 transition-all"
            >
              Get in touch
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
