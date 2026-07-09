import { Link } from 'react-router-dom'
import storyIllustration from '../../assets/images/story-illustration.jpg'
import { Reveal } from '../ui/Reveal'
import { GOFUNDME_URL, EXTERNAL_LINK_PROPS } from '../../constants/links'

export function HeroStory() {
  return (
    <section className="relative pt-20 pb-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7">
          <Reveal as="p" direction="right" delay={0} className="text-13 text-label font-semibold text-brave-primary uppercase tracking-[0.25em]">
            In memory of Didi
          </Reveal>
          <Reveal direction="right" distance={40} delay={0.1} className="mt-5">
            <h1 className="text-39 md:text-61 font-semibold leading-[1.05] tracking-tight text-night">
              A promise, made in her name.{' '}
              <span className="text-brave-primary">Built in her memory.</span>
            </h1>
          </Reveal>
          <div className="mt-8 space-y-5 text-16 text-night/75 leading-[1.55] font-medium max-w-2xl">
            <Reveal as="p" direction="up" distance={20} delay={0.25}>
              In March 2023, <strong className="text-night">Ding Mayen "Didi" Kuai</strong> — a
              Babson College freshman from South Sudan — unexpectedly passed away. Didi had lived
              the exact problem LetAllGirls now exists to solve: one overworked teacher, sixty
              students, no internet, no textbooks.
            </Reveal>
            <Reveal as="p" direction="up" distance={20} delay={0.35}>
              Before she passed, Didi had set up a GoFundMe for an idea she called LetAllGirls. She
              never got to see it built. In the days that followed, more than 180 people, moved by
              her story, donated nearly $6,000 almost overnight.
            </Reveal>
            <Reveal as="p" direction="up" distance={20} delay={0.45}>
              The team picked up where she started. With that $6,000, they built three DIDI
              prototypes in partnership with schools, teachers, and students in South Sudan — the
              first real step of Didi's vision made physical.
            </Reveal>
          </div>
          <Reveal direction="up" distance={16} delay={0.6} className="mt-10 flex flex-wrap gap-4">
            <a
              href={GOFUNDME_URL}
              {...EXTERNAL_LINK_PROPS}
              className="px-8 py-4 bg-brave-primary text-cloud-light font-semibold rounded-full hover:bg-brave-extra transition-all"
            >
              Continue her vision
            </a>
            <Link
              to="/#didi"
              className="px-8 py-4 bg-cloud-light text-night border border-brave-neutral/40 font-semibold rounded-full hover:border-brave-primary transition-all"
            >
              Meet DIDI
            </Link>
          </Reveal>
        </div>

        <Reveal
          as="figure"
          direction="left"
          distance={48}
          duration={1.1}
          delay={0.25}
          className="lg:col-span-5 relative mx-auto max-w-md"
        >
          <img
            src={storyIllustration}
            alt="A schoolgirl reading under a mango tree — editorial illustration"
            width={1024}
            height={1280}
            className="w-full h-auto block mix-blend-multiply"
          />
          <figcaption className="mt-4 pl-2 border-l border-night/30 text-13 text-label uppercase tracking-[0.28em] text-night/55 font-medium">
            Illustration · Under the mango tree
          </figcaption>
        </Reveal>
      </div>
    </section>
  )
}
