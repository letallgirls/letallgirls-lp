import { Reveal } from '../ui/Reveal'

export function StorySection() {
  return (
    <section className="py-32 bg-brave-light border-y border-brave-primary/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          <Reveal className="lg:col-span-4">
            <span className="text-13 text-label font-semibold text-brave-primary uppercase tracking-widest">
              In memory of Didi
            </span>
            <h2 className="text-39 md:text-49 font-semibold mt-4 leading-[1.1] tracking-tight">
              A promise, not just a nonprofit.
            </h2>
          </Reveal>
          <Reveal
            delay={0.15}
            className="lg:col-span-8 space-y-6 text-lg leading-[1.5] text-night/80 font-medium"
          >
            <p>
              In March 2023,{' '}
              <strong className="text-night">Ding Mayen Kuai — known to everyone as "Didi"</strong> —
              a Babson College freshman from South Sudan, unexpectedly passed away. Didi had lived the
              exact problem LetAllGirls now exists to solve: a classroom with one overworked teacher
              and 60 other students, no internet, no quality learning resources.
            </p>
            <p>
              Before she passed, Didi had set up a GoFundMe for an idea she called LetAllGirls. She
              never got to see it built. In the days after her death, more than 180 people, moved by
              her story, donated nearly $6,000 almost overnight.
            </p>
            <p>
              The team picked up where she started. With that $6,000, they built three DIDI prototypes
              in partnership with schools, teachers, and students in South Sudan — the first real step
              of Didi's vision made physical.
            </p>
            <blockquote className="border-l-4 border-brave-primary pl-6 py-2 text-20 italic text-night">
              Every child deserves the chance to be unapologetically themselves.
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
