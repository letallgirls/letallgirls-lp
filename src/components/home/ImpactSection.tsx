import impactPhoto from '../../assets/images/gallery-6.jpg'
import { Reveal } from '../ui/Reveal'

const impactRows = [
  { value: '+62%', label: 'improvement in test scores', body: 'A six-week AI-powered adaptive learning program.' },
  { value: '2 yrs', label: 'of content covered', body: 'In the same six-week program with DIDI-style tools.' },
  { value: 'Live', label: 'in South Sudan today', body: 'Piloted directly with schools, teachers, and students.' },
]

const testimonials = [
  {
    quote:
      'The DIDI is going to give girls the opportunity to be creative and explore! It will help their morale.',
    author: 'Amou Abot',
  },
  {
    quote:
      'Having access to the DIDI is a privilege — to support us to become the people we want to be.',
    author: 'Daniela Achol Garang',
  },
]

export function ImpactSection() {
  return (
    <section id="impact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <Reveal>
            <figure>
              <img
                src={impactPhoto}
                alt="Two students in school uniform smiling together"
                width={1080}
                height={645}
                loading="lazy"
                className="w-full aspect-[4/3] object-cover object-top rounded-2xl"
              />
              <figcaption className="mt-4 pl-2 border-l border-night/30 text-13 text-label uppercase tracking-[0.28em] text-night/55 font-medium">
                Photo · Students in South Sudan
              </figcaption>
            </figure>
          </Reveal>
          <div>
            <Reveal>
              <span className="text-13 text-label font-semibold text-brave-primary uppercase tracking-widest">
                Proven Impact
              </span>
              <h2 className="text-39 md:text-49 font-semibold mt-4 mb-10 tracking-tight leading-[1.1]">
                Two years of content in six weeks.
              </h2>
            </Reveal>
            <div className="space-y-10">
              {impactRows.map((row, i) => (
                <Reveal key={row.label} delay={i * 0.1}>
                  <div className="flex gap-8 items-start">
                    <div className="text-39 md:text-49 font-semibold text-brave-primary min-w-[7ch]">
                      {row.value}
                    </div>
                    <div>
                      <h3 className="font-semibold text-20 mb-1">{row.label}</h3>
                      <p className="text-night/60 font-medium">{row.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 mt-24">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.1}>
              <figure className="pl-6 md:pl-8 border-l-4 border-brave-primary/30 h-full flex flex-col justify-center">
                <blockquote className="text-20 md:text-23 leading-[1.6] font-medium text-night/80 italic tracking-tight flex-grow">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 text-14 font-semibold text-night/60">
                  — {t.author}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
