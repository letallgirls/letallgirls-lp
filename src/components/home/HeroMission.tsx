import { Link } from 'react-router-dom'
import classroomPhoto from '../../assets/images/hero-stack-classroom.png'
import pledgePhoto from '../../assets/images/hero-stack-pledge.png'
import readingPhoto from '../../assets/images/hero-stack-reading.png'
import { Reveal } from '../ui/Reveal'
import { IllustratedHero } from '../ui/IllustratedHero'
import { ImageStack } from '../ui/ImageStack'

const heroImages = [
  { src: classroomPhoto, alt: 'Girls listening attentively in a classroom in South Sudan' },
  { src: pledgePhoto, alt: 'Students standing together at a school assembly in South Sudan' },
  { src: readingPhoto, alt: 'A girl reading a worn notebook outdoors' },
]

export function HeroMission() {
  return (
    <IllustratedHero
      eyebrow="LetAllGirls — Our Mission"
      headline={
        <>
          Building the classroom{' '}
          <span className="text-brave-primary">the infrastructure forgot.</span>
        </>
      }
      body={
        <>
          <Reveal as="p" direction="up" distance={20} delay={0.25}>
            LetAllGirls is a 501(c)(3) nonprofit building edge-AI hardware for schools without
            internet. Millions of classrooms have a teacher and a chalkboard, and little else.
          </Reveal>
          <Reveal as="p" direction="up" distance={20} delay={0.35}>
            Our first device, <strong className="text-night">DIDI</strong>, brings a personal AI
            tutor, a full digital library, and teacher tools to any classroom — powered by solar,
            running entirely offline.
          </Reveal>
        </>
      }
      media={
        <div className="ml-auto w-[78%] min-w-[240px]">
          <ImageStack images={heroImages} />
        </div>
      }
      caption="South Sudan"
      captionAlign="right"
      ctas={
        <>
          <Link
            to="/our-story"
            className="px-8 py-4 bg-brave-primary text-cloud-light font-semibold rounded-full hover:bg-brave-extra transition-all"
          >
            Our story
          </Link>
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
