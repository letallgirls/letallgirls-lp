import { Link } from 'react-router-dom'
import storyIllustration from '../../assets/images/story-illustration.jpg'
import { Reveal } from '../ui/Reveal'
import { IllustratedHero } from '../ui/IllustratedHero'
import { GOFUNDME_URL, EXTERNAL_LINK_PROPS } from '../../constants/links'

export function StoryHero() {
  return (
    <IllustratedHero
      eyebrow="In memory of Didi"
      headline={
        <>
          A promise, made in her name.{' '}
          <span className="text-brave-primary">Built in her memory.</span>
        </>
      }
      body={
        <>
          <Reveal as="p" direction="up" distance={20} delay={0.25}>
            In March 2023, <strong className="text-night">Ding Mayen "Didi" Kuai</strong>, a
            Babson College freshman from South Sudan, unexpectedly passed away. Didi had lived
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
            prototypes in partnership with schools, teachers, and students in South Sudan: the
            first real step of Didi's vision made physical.
          </Reveal>
        </>
      }
      media={
        <img
          src={storyIllustration}
          alt="A schoolgirl reading under a mango tree, editorial illustration"
          width={1024}
          height={1280}
          className="w-full h-auto block mix-blend-multiply"
        />
      }
      caption="Illustration · Under the mango tree"
      ctas={
        <>
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
        </>
      }
    />
  )
}
