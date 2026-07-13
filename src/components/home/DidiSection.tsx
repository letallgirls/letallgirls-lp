import { motion } from 'framer-motion'
import { Reveal } from '../ui/Reveal'
import didiDevice from '../../assets/images/didi-device.png'
import stepSetup from '../../assets/images/step-setup-tanzania.png'
import stepConnect from '../../assets/images/impact-students.jpg'
import stepLearn from '../../assets/images/gallery-3.jpg'

const didiCapabilities = [
  { title: 'Works 100% offline', body: 'No internet connection required — ever.' },
  { title: 'Personal AI tutor', body: 'Answers student questions in real time.' },
  { title: 'Teacher support', body: 'Helps teachers build lesson plans and track progress.' },
  { title: 'Digital library', body: "100+ resources where textbooks don't exist." },
  { title: 'Multi-user', body: 'Supports up to 25 students connected at once.' },
  { title: 'Region-specific', body: 'Content aligned to local national curriculums.' },
]

// Annotated callouts: label sits at the outer point, a connector line runs to an
// anchor on the device (percentages of the fixed-aspect stage).
type Side = 'left' | 'right'
const callouts: {
  title: string
  body: string
  side: Side
  label: { x: number; y: number }
  anchor: { x: number; y: number }
}[] = [
  { ...didiCapabilities[0], side: 'left', label: { x: 16, y: 18 }, anchor: { x: 34, y: 34 } },
  { ...didiCapabilities[1], side: 'left', label: { x: 15, y: 50 }, anchor: { x: 31, y: 52 } },
  { ...didiCapabilities[2], side: 'left', label: { x: 16, y: 82 }, anchor: { x: 36, y: 68 } },
  { ...didiCapabilities[3], side: 'right', label: { x: 84, y: 18 }, anchor: { x: 69, y: 30 } },
  { ...didiCapabilities[4], side: 'right', label: { x: 85, y: 50 }, anchor: { x: 69, y: 53 } },
  { ...didiCapabilities[5], side: 'right', label: { x: 84, y: 82 }, anchor: { x: 64, y: 68 } },
]

const steps = [
  {
    step: '01',
    title: 'Set up in a classroom or library.',
    body: 'Just press the power button.',
    image: stepSetup,
    rotation: -2.5,
  },
  {
    step: '02',
    title: 'Connect any device.',
    body: 'DIDI broadcasts a local WiFi network. Students connect with whatever phone, tablet, or laptop they already have.',
    image: stepConnect,
    rotation: 1.5,
  },
  {
    step: '03',
    title: 'Learn.',
    body: "Students explore dozens of curated resources or ask DIDI's AI a question directly.",
    image: stepLearn,
    rotation: -1,
  },
]



const VIEWPORT = { once: true, margin: '-100px' } as const

/** Soft glow + drop-shadowed device render — reads as a floating 3D object. */
function DeviceImage({ className = '' }: { className?: string }) {
  return (
    <img
      src={didiDevice}
      alt="The DIDI device"
      className={`object-contain drop-shadow-[0_35px_45px_rgba(36,36,126,0.28)] ${className}`}
    />
  )
}

export function DidiSection() {
  return (
    <section id="didi" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-6 md:mb-2">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 md:items-end">
            <div>
              <span className="text-13 text-label font-semibold text-brave-primary uppercase tracking-widest">
                Meet D.I.D.I.
              </span>
              <h2 className="text-39 md:text-49 font-semibold mt-4 leading-[1.1] tracking-tight">
                The Digitally Integrated Daily Instructor.
              </h2>
            </div>
            <p className="text-lg text-night/70 leading-[1.5] font-medium md:pb-2">
              DIDI is the world's first offline, AI-enabled educational device built specifically for
              communities without reliable internet access. It turns any room into a fully equipped,
              AI-powered classroom.
            </p>
          </div>
        </Reveal>

        <div className="mb-24">
          {/* Desktop — annotated device diagram */}
          <div className="relative hidden md:block aspect-[16/9]">
            {/* concentric spec-diagram backdrop + breathing glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="absolute size-[64%] rounded-full border border-brave-primary/[0.07]" />
              <div className="absolute size-[46%] rounded-full border border-brave-primary/10" />
              <div className="animate-breathe size-[42%] rounded-full bg-skyward-accent/45 blur-3xl" />
            </div>

            {/* connector lines — draw outward from the device on scroll */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden
            >
              {callouts.map((c, i) => (
                <motion.line
                  key={c.title}
                  x1={c.anchor.x}
                  y1={c.anchor.y}
                  x2={c.label.x}
                  y2={c.label.y}
                  stroke="#3a51aa"
                  strokeWidth={1.5}
                  strokeOpacity={0.4}
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
                />
              ))}
            </svg>

            {/* device — scales in on scroll, then floats gently */}
            <motion.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <DeviceImage className="animate-float-device w-[50%] max-w-[30rem]" />
            </motion.div>

            {/* anchor markers — pop in after their line, then pulse */}
            {callouts.map((c, i) => (
              <span
                key={c.title}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${c.anchor.x}%`, top: `${c.anchor.y}%` }}
              >
                <motion.span
                  className="grid place-items-center"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.12, ease: 'backOut' }}
                >
                  <span className="animate-marker-pulse absolute size-5 rounded-full bg-brave-primary/15" />
                  <span className="block size-2.5 rounded-full bg-brave-primary ring-2 ring-cloud-light" />
                </motion.span>
              </span>
            ))}

            {/* labels — fade in after markers */}
            {callouts.map((c, i) => (
              <motion.div
                key={c.title}
                className={`absolute w-[42%] max-w-[12.5rem] ${c.side === 'left' ? 'text-right pr-4' : 'text-left pl-4'}`}
                style={{
                  left: `${c.label.x}%`,
                  top: `${c.label.y}%`,
                  transform: `translate(${c.side === 'left' ? '-100%' : '0'}, -50%)`,
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: 0.65 + i * 0.1 }}
              >
                <h3 className="text-20 font-semibold leading-tight tracking-tight">{c.title}</h3>
                <p className="mt-1.5 text-13 text-night/55 font-medium leading-[1.4]">{c.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile — device on top, capabilities as a simple list */}
          <div className="md:hidden">
            <div className="relative flex items-center justify-center py-4">
              <div className="animate-breathe pointer-events-none absolute size-56 rounded-full bg-skyward-accent/25 blur-3xl" />
              <DeviceImage className="animate-float-device relative w-4/5 max-w-xs" />
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {didiCapabilities.map((cap) => (
                <div key={cap.title} className="flex gap-3">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brave-primary" />
                  <div>
                    <h3 className="text-16 font-semibold leading-tight">{cap.title}</h3>
                    <p className="text-13 text-night/55 font-medium leading-[1.35]">{cap.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── How-it-works: Polaroid cards + curved connector ─── */}
        <HowItWorksSteps />
      </div>
    </section>
  )
}

/**
 * The three-step section: small tilted polaroid photos on the same level,
 * with a dot + horizontal dotted line above each step label, text outside below.
 */
function HowItWorksSteps() {
  return (
    <>
      <Reveal>
        <h3 className="text-25 md:text-31 font-semibold mb-14 tracking-tight">
          How it works, in three steps.
        </h3>
      </Reveal>

      <div className="relative mt-4">
        {/* ── Cards grid ── */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.16}>
              <div className="group relative z-10 flex flex-col items-center">
                {/* Small polaroid photo card */}
                <motion.div
                  className="relative w-36 md:w-40 cursor-pointer"
                  initial={{ rotate: 0 }}
                  whileInView={{ rotate: step.rotation }}
                  whileHover={{ rotate: 0, scale: 1.08 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                >
                  <div className="rounded-[3px] bg-cloud-light p-1.5 pb-4 shadow-[0_3px_16px_rgba(31,34,48,0.12),0_1px_4px_rgba(31,34,48,0.06)]">
                    {/* Pin / tape accent */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 w-8 h-4 rounded-b-md bg-blossom-accent/65 shadow-sm" />

                    {/* Photo */}
                    <div className="img-grain aspect-[4/5] overflow-hidden rounded-[2px]">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* ── Dot + connecting dotted line ── */}
                <div className="relative w-full flex justify-center mt-5">
                  {/* Horizontal dotted line — spans full column width, hidden on mobile */}
                  <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 right-0 h-px border-t-2 border-dotted border-brave-primary/20" />
                  {/* Extend line to neighbouring columns */}
                  {i === 0 && (
                    <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-1/2 -right-[calc(50%+1rem)] h-px border-t-2 border-dotted border-brave-primary/20" style={{ right: 'calc(-50% - 1rem)' }} />
                  )}
                  {i === 1 && (
                    <>
                      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 h-px border-t-2 border-dotted border-brave-primary/20" style={{ left: 'calc(-50% - 1rem)', right: 'calc(-50% - 1rem)' }} />
                    </>
                  )}
                  {i === 2 && (
                    <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-1/2 h-px border-t-2 border-dotted border-brave-primary/20" style={{ left: 'calc(-50% - 1rem)' }} />
                  )}
                  {/* The dot */}
                  <span className="relative z-10 size-3 rounded-full bg-brave-primary shadow-sm" />
                </div>

                {/* Text below */}
                <div className="text-center mt-4 max-w-[16rem]">
                  <span className="text-13 text-label font-semibold text-brave-primary/60 tracking-widest uppercase">
                    Step {step.step}
                  </span>
                  <h4 className="text-16 md:text-20 font-semibold mt-1 leading-tight tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-13 text-night/55 font-medium leading-[1.4] mt-1.5">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  )
}
