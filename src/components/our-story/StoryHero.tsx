import { motion } from 'framer-motion'

export function StoryHero() {
  return (
    <section className="relative pt-20 pb-24 px-6 overflow-hidden">
      {/* Background gradients with a mask that fades out at the bottom so it seamlessly blends into the next section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]">
        <div className="absolute -top-32 -right-40 size-96 bg-skyward-accent/40 blur-3xl rounded-full animate-float-slow" />
        <div className="absolute -bottom-40 -left-32 size-96 bg-blossom-accent/30 blur-3xl rounded-full animate-float-slow [animation-delay:2s]" />
      </div>
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-13 text-label font-semibold text-brave-primary uppercase tracking-widest">
            About LetAllGirls
          </span>
          <h1 className="mt-4 text-49 md:text-76 font-semibold leading-[1.05] tracking-tight text-night max-w-4xl">
            Building the classroom{' '}
            <span className="text-brave-primary">the infrastructure forgot.</span>
          </h1>
          <p className="mt-8 text-20 text-night/70 leading-[1.5] font-medium max-w-2xl">
            LetAllGirls is a 501(c)(3) nonprofit building edge-AI hardware for schools without
            internet. Our first device, DIDI, brings a personal AI tutor, a full digital library, and
            teacher tools to any classroom — powered by solar, running entirely offline.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
