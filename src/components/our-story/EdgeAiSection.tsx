import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import didiDevice from '../../assets/images/didi-device.png'
import { Reveal } from '../ui/Reveal'

const icon = (path: ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="size-6">
    {path}
  </svg>
)

const principles = [
  {
    title: 'Offline by design',
    body: 'Everything DIDI does runs on-device. No internet, no dependency on cellular networks, no cloud round-trips.',
    icon: icon(
      <>
        <path
          strokeLinecap="round"
          d="M1 8.5a15.9 15.9 0 014.7-2.88M10.71 5.05A16 16 0 0122.58 8M5 12.55a10.94 10.94 0 015.17-2.4M16.72 11.06A10.94 10.94 0 0119 12.55M8.53 16.11a6 6 0 016.95 0"
        />
        <path strokeLinecap="round" d="M1 1l22 22" />
        <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
      </>,
    ),
  },
  {
    title: 'Compute at the edge',
    body: 'A small language model runs locally, so students get real-time AI tutoring inside a mud-brick classroom just as quickly as a coastal one.',
    icon: icon(
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path strokeLinecap="round" d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
      </>,
    ),
  },
  {
    title: 'A network of its own',
    body: 'DIDI hosts its own private network, so student devices connect directly and reach hundreds of books, articles, and lessons with no internet connection at all.',
    icon: icon(
      <>
        <rect x="9" y="9" width="6" height="6" rx="1" />
        <path strokeLinecap="round" d="M12 9V4M12 15v5M9 12H4M15 12h5" />
        <circle cx="12" cy="2.3" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="12" cy="21.7" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="2.3" cy="12" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="21.7" cy="12" r="1.3" fill="currentColor" stroke="none" />
      </>,
    ),
  },
  {
    title: 'Local curriculum, always',
    body: "Content is tuned to each country's national curriculum before deployment, in partnership with local schools and teachers.",
    icon: icon(
      <>
        <path strokeLinejoin="round" d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path strokeLinejoin="round" d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </>,
    ),
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
              device, so learning happens where the students already are.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <figure className="relative">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="animate-breathe size-[70%] rounded-full bg-skyward-accent/35 blur-3xl" />
              </div>
              <img
                src={didiDevice}
                alt="The DIDI edge-AI device"
                loading="lazy"
                className="animate-float-device relative mx-auto w-full max-w-md h-auto object-contain drop-shadow-[0_35px_45px_rgba(36,36,126,0.28)]"
              />
              <figcaption className="mt-4 pl-2 border-l border-night/30 text-13 text-label uppercase tracking-[0.28em] text-night/55 font-medium">
                DIDI · The device itself
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`group relative h-full p-8 md:p-10 border-brave-primary/10 ${
                  i % 2 === 0 ? 'sm:border-r' : ''
                } ${i < principles.length - 2 ? 'border-b' : ''}`}
              >
                <span className="absolute left-0 top-0 bottom-0 w-0.5 origin-center scale-y-0 bg-brave-primary transition-transform duration-300 group-hover:scale-y-100" />
                <div className="mb-5 text-brave-primary/70 transition-colors group-hover:text-brave-primary">
                  {p.icon}
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
