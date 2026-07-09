import { motion } from 'framer-motion'
import heroPhoto from '../../assets/images/impact-students.jpg'

/** Small circular-outlined glyph that sits inline in the headline, Klim-style. */
function SeedGlyph() {
  return (
    <span className="inline-flex items-center justify-center align-middle size-[0.82em] rounded-full border-[0.06em] border-cloud-light mx-[0.15em] translate-y-[-0.05em]">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-[0.5em]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20V9m0 0a5 5 0 015-5 5 5 0 01-5 5zm0 0A5 5 0 007 4a5 5 0 005 5z" />
      </svg>
    </span>
  )
}

const CAPTION = 'Every gift — a dollar, a device, or a partnership — reaches a real classroom.'

export function HelpHero() {
  return (
    <section className="px-4 md:px-6 pt-6 pb-10">
      <div className="max-w-7xl mx-auto">
        {/* Top card: dark-blue block with a transparent notch cut from the top-right. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="cut-tr [--pw:15rem] [--ph:5rem] bg-brave-extra text-cloud-light rounded-[1.75rem] md:rounded-[2.5rem] px-6 md:px-12 py-10 md:py-14"
        >
          <div className="md:pr-[16rem]">
            <p className="text-13 text-label font-semibold uppercase tracking-[0.25em] text-cloud-light/70">
              How to Help
            </p>
            <h1 className="mt-4 text-31 md:text-61 font-semibold leading-[1.05] tracking-tight text-cloud-light max-w-4xl">
              Turn your support <SeedGlyph /> into a real classroom.
            </h1>
          </div>
        </motion.div>

        {/* Bottom card: photo with a transparent caption pocket cut from the
            top-right (cut-tr on the figure) and a decorative notch cut from the
            bottom-left (cut-bl on the wrapper — nested masks compose to both). */}
        <div className="cut-bl [--pw:13rem] [--ph:6rem] relative mt-4 md:mt-5">
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="cut-tr [--pw:20rem] [--ph:7rem] img-grain rounded-[1.75rem] md:rounded-[2.5rem] overflow-hidden"
          >
            <img
              src={heroPhoto}
              alt="Students learning together on a tablet connected to DIDI"
              className="w-full h-56 md:h-[24rem] object-cover object-[center_35%]"
              fetchPriority="high"
            />
          </motion.figure>

          {/* Caption sits over the transparent top-right pocket (desktop) */}
          <div className="hidden md:flex absolute top-0 right-0 w-[20rem] h-[7rem] items-center pl-7 pr-6">
            <p className="text-16 text-night/70 leading-[1.5] font-medium">{CAPTION}</p>
          </div>

          {/* Caption below the photo (mobile) */}
          <p className="md:hidden mt-4 text-16 text-night/70 leading-[1.55] font-medium">{CAPTION}</p>
        </div>
      </div>
    </section>
  )
}
