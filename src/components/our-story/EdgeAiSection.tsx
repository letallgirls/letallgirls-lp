import { motion } from 'framer-motion'
import deviceIllustration from '../../assets/images/device-illustration.jpg'
import { Reveal } from '../ui/Reveal'

const principles = [
  {
    title: 'Offline by design',
    body: 'Everything DIDI does runs on-device. No internet, no dependency on cellular networks, no cloud round-trips.',
  },
  {
    title: 'Compute at the edge',
    body: 'A small language model runs locally, so students get real-time AI tutoring inside a mud-brick classroom just as quickly as a coastal one.',
  },
  {
    title: 'Solar-first hardware',
    body: 'Low-power silicon and solar charging mean the device works through outages and off-grid — where the electricity comes and goes.',
  },
  {
    title: 'Local curriculum, always',
    body: "Content is tuned to each country's national curriculum before deployment, in partnership with local schools and teachers.",
  },
]

export function EdgeAiSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <Reveal>
            <span className="text-13 text-label font-semibold text-brave-primary uppercase tracking-widest">
              The edge-AI approach
            </span>
            <h2 className="text-39 md:text-49 font-semibold mt-4 mb-6 leading-[1.1] tracking-tight">
              Intelligence that doesn't need a signal.
            </h2>
            <p className="text-lg text-night/70 leading-[1.5] font-medium">
              Most ed-tech assumes broadband, a power grid, and one device per student. DIDI assumes
              none of that. We push the model, the content, and the compute down to a single low-power
              device — so learning happens where the students already are.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <figure className="relative">
              <img
                src={deviceIllustration}
                alt="A DIDI edge-AI device on a wooden desk — editorial illustration"
                width={1024}
                height={1024}
                loading="lazy"
                className="w-full h-auto block mix-blend-multiply"
              />
              <figcaption className="mt-4 pl-2 border-l border-night/30 text-13 text-label uppercase tracking-[0.28em] text-night/55 font-medium">
                Illustration · DIDI on the desk
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-full p-8 bg-brave-light rounded-2xl border border-brave-primary/10 hover:border-brave-primary/40 hover:shadow-lg hover:shadow-brave-primary/5 transition-all"
              >
                <div className="size-10 rounded-lg bg-brave-primary/10 flex items-center justify-center mb-5">
                  <span className="text-brave-primary font-semibold text-13">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-20 font-semibold mb-2">{p.title}</h3>
                <p className="text-night/60 font-medium leading-[1.4]">{p.body}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
