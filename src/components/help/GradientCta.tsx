import { motion } from 'framer-motion'
import { GOFUNDME_URL, EXTERNAL_LINK_PROPS } from '../../constants/links'

export function GradientCta() {
  return (
    <section className="px-4 md:px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-brave-light px-6 py-20 md:py-28">
          {/* Sean's soft, blurred multicolour gradient — a wash of the brand
              accents rather than a hard edge. */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-16 size-[28rem] rounded-full bg-skyward-accent/60 blur-3xl" />
            <div className="absolute -bottom-32 -left-8 size-[26rem] rounded-full bg-harmonica-accent/50 blur-3xl" />
            <div className="absolute -top-16 right-0 size-[30rem] rounded-full bg-blossom-accent/45 blur-3xl" />
            <div className="absolute bottom-0 right-24 size-[22rem] rounded-full bg-brave-neutral/50 blur-3xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-3xl mx-auto text-center"
          >
            <h2 className="text-31 md:text-61 font-semibold leading-[1.05] tracking-tight text-night">
              Every gift reaches a student.
            </h2>
            <p className="mt-6 text-16 md:text-20 text-night/70 font-medium leading-[1.5] max-w-2xl mx-auto">
              Fund an offline, AI-powered classroom for a school the infrastructure forgot. It's
              tax-deductible, and it starts with a single click.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={GOFUNDME_URL}
                {...EXTERNAL_LINK_PROPS}
                className="px-9 py-4 bg-brave-primary text-cloud-light font-semibold rounded-full hover:bg-brave-extra shadow-lg shadow-brave-primary/20 transition-all"
              >
                Donate now
              </a>
            </div>
            <p className="mt-6 text-13 text-label text-night/50 font-medium">
              Tax-deductible in the U.S. — 501(c)(3) nonprofit.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
