import impactIllustration from '../../assets/images/impact-illustration.jpg'
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
            <figure className="max-w-md mx-auto">
              <img
                src={impactIllustration}
                alt="Students gathered around a small device in a sunlit classroom — editorial illustration"
                width={1024}
                height={1280}
                loading="lazy"
                className="w-full h-auto block mix-blend-multiply"
              />
              <figcaption className="mt-4 pl-2 border-l border-night/30 text-13 text-label uppercase tracking-[0.28em] text-night/55 font-medium">
                Illustration · A classroom around DIDI
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

        <div className="grid md:grid-cols-2 gap-6 mt-24">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.1}>
              <figure className="p-8 md:p-10 rounded-3xl bg-brave-light border border-brave-primary/10 h-full">
                <svg className="size-8 text-brave-primary/40 mb-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 6c2 0 3 1 3 3 0 2-1 3-3 3v2c3 0 5-2 5-5V6H4zm10 0c2 0 3 1 3 3 0 2-1 3-3 3v2c3 0 5-2 5-5V6h-5z" />
                </svg>
                <blockquote className="text-20 leading-[1.4] font-medium text-night">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 text-13 text-label font-semibold text-brave-primary">
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
