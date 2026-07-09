import { Reveal } from '../ui/Reveal'

const problemStats = [
  { value: '$160B', label: 'spent on education across Africa each year' },
  { value: '4%', label: 'of Sub-Saharan schools have basic internet' },
  { value: '60:1', label: 'student-to-teacher ratios in some regions' },
  { value: '1 / 30', label: 'textbook to student ratio in some countries' },
]

export function ProblemSection() {
  return (
    <section className="py-32 px-6 bg-brave-extra text-cloud-light overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-3xl mb-16">
          <span className="text-13 text-label font-semibold text-skyward-accent uppercase tracking-widest">
            The Problem
          </span>
          <h2 className="text-39 md:text-49 font-semibold mt-4 leading-[1.1] tracking-tight">
            Most solutions assume infrastructure that doesn't exist.
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {problemStats.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.08}>
              <div className="border-t border-cloud-light/20 pt-6">
                <div className="text-39 md:text-49 font-semibold text-skyward-accent">{s.value}</div>
                <p className="mt-3 text-13 text-label text-cloud-light/70 font-medium leading-[1.4]">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="max-w-3xl text-lg text-cloud-light/80 leading-[1.5] font-medium">
            High-cost alternatives like Starlink run $600+ upfront and $200+/month — out of reach for
            the schools that need them most. DIDI was built as the opposite: cheap, offline by design,
            and built around the reality on the ground.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
