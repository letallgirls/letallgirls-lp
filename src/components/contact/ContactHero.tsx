import { motion } from 'framer-motion'

export function ContactHero() {
  return (
    <section className="relative pt-20 pb-16 px-6 overflow-hidden">
      <div className="absolute -top-32 -right-40 size-96 bg-skyward-accent/40 blur-3xl rounded-full animate-float-slow" />
      <div className="absolute -bottom-40 -left-32 size-96 bg-blossom-accent/30 blur-3xl rounded-full animate-float-slow [animation-delay:2s]" />
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-13 text-label font-semibold text-brave-primary uppercase tracking-widest">
            Contact
          </span>
          <h1 className="mt-4 text-49 md:text-76 font-semibold leading-[1.05] tracking-tight text-night max-w-3xl">
            Let's start a <span className="text-brave-primary">conversation.</span>
          </h1>
          <p className="mt-8 text-20 text-night/70 leading-[1.5] font-medium max-w-2xl">
            Whether you want to sponsor a device, donate hardware, bring DIDI to your schools, or
            just learn more — we'd love to hear from you. Reach out and we'll get back to you.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
