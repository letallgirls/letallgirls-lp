import { Reveal } from '../ui/Reveal'

const timeline = [
  {
    year: '2023',
    title: 'A promise made',
    body: "Ding Mayen 'Didi' Kuai passes away at Babson College. Friends and family raise nearly $6,000 in her memory to bring her LetAllGirls vision to life.",
  },
  {
    year: '2024',
    title: 'Three prototypes, one classroom',
    body: 'The team builds the first three DIDI prototypes in direct partnership with schools, teachers, and students in South Sudan.',
  },
  {
    year: '2025',
    title: 'Proven in the field',
    body: 'A six-week pilot delivers +62% test-score gains and covers roughly two years of content in a single classroom cycle.',
  },
  {
    year: '2026',
    title: 'Scaling the network',
    body: 'New deployments committed across South Africa, Malawi, and Tanzania — with inbound interest from Pakistan, Bangladesh, Grenada, and Colombia.',
  },
]

export function TimelineSection() {
  return (
    <section className="py-32 px-6 bg-brave-extra text-cloud-light overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-3xl mb-16">
          <span className="text-13 text-label font-semibold text-skyward-accent uppercase tracking-widest">
            How we got here
          </span>
          <h2 className="text-39 md:text-49 font-semibold mt-4 leading-[1.1] tracking-tight">
            Three years, one classroom at a time.
          </h2>
        </Reveal>
        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.year} delay={i * 0.1}>
              <div className="border-t border-cloud-light/20 pt-6 h-full">
                <div className="text-31 font-semibold text-skyward-accent">{t.year}</div>
                <h3 className="font-semibold text-20 mt-4 mb-2">{t.title}</h3>
                <p className="text-13 text-label text-cloud-light/70 font-medium leading-[1.5]">
                  {t.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
