import { motion } from 'framer-motion'
import { Reveal } from '../ui/Reveal'

const didiCapabilities = [
  { title: 'Works 100% offline', body: 'No internet connection required — ever.' },
  { title: 'Personal AI tutor', body: 'Answers student questions in real time.' },
  { title: 'Teacher support', body: 'Helps teachers build lesson plans and track progress.' },
  { title: 'Digital library', body: "100+ resources where textbooks don't exist." },
  { title: 'Multi-user', body: 'Supports up to 25 students connected at once.' },
  { title: 'Region-specific', body: 'Content aligned to local national curriculums.' },
]

const steps = [
  { step: '01', title: 'Set up in a classroom or library.', body: 'Just press the power button.' },
  {
    step: '02',
    title: 'Connect any device.',
    body: 'DIDI broadcasts a local WiFi network. Students connect with whatever phone, tablet, or laptop they already have.',
  },
  {
    step: '03',
    title: 'Learn.',
    body: "Students explore dozens of curated resources or ask DIDI's AI a question directly.",
  },
]

export function DidiSection() {
  return (
    <section id="didi" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-3xl mb-20">
          <span className="text-13 text-label font-semibold text-brave-primary uppercase tracking-widest">
            Meet D.I.D.I.
          </span>
          <h2 className="text-39 md:text-49 font-semibold mt-4 mb-6 leading-[1.1] tracking-tight">
            The Digitally Integrated Daily Instructor.
          </h2>
          <p className="text-lg text-night/70 leading-[1.5] font-medium">
            DIDI is the world's first offline, AI-enabled educational device built specifically for
            communities without reliable internet access. It turns any room into a fully equipped,
            AI-powered classroom.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {didiCapabilities.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 0.06}>
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
                <h3 className="text-20 font-semibold mb-2">{cap.title}</h3>
                <p className="text-night/60 font-medium leading-[1.4]">{cap.body}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="text-25 md:text-31 font-semibold mb-12 tracking-tight">
            How it works, in three steps.
          </h3>
        </Reveal>
        <div className="relative grid md:grid-cols-3 gap-8 md:gap-12 mt-4">
          {steps.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.12} className="relative">
              <div className="relative pl-6 md:pl-0 md:pt-8 border-l-2 md:border-l-0 border-brave-primary/20 h-full md:text-center">
                {/* Connecting horizontal line to next step (desktop only) */}
                {i !== steps.length - 1 && (
                  <div className="hidden md:block absolute top-[5px] left-1/2 w-[calc(100%+3rem)] h-[2px] bg-brave-primary/20" />
                )}
                {/* Dot */}
                <span className="absolute -left-[7px] top-0 md:left-1/2 md:-translate-x-1/2 md:-top-[1px] size-3 rounded-full bg-brave-primary z-10" />
                
                <span className="inline-block mt-[-2px] md:mt-0 text-13 text-label font-semibold text-brave-primary uppercase tracking-widest">
                  Step {step.step}
                </span>
                <h4 className="text-20 font-semibold mt-2 md:mt-3 mb-2 md:mb-3">{step.title}</h4>
                <p className="text-night/60 font-medium leading-[1.4] md:mx-auto md:max-w-xs">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
