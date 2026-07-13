import { Link } from 'react-router-dom'
import impactPhoto from '../../assets/images/gallery-6.jpg'
import { Reveal } from '../ui/Reveal'
import { GooeyText } from '../ui/GooeyText'
import { GOFUNDME_URL, EXTERNAL_LINK_PROPS } from '../../constants/links'

export function BeliefsSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
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
              What we believe
            </span>
            <div className="mt-4 mb-6 min-h-[4rem] md:min-h-[5rem]">
              <GooeyText
                texts={[
                  "Talent is everywhere. Opportunity isn't — yet.",
                  'Every girl should have a classroom.',
                  'Where you are born should not determine your potential.',
                  'The name is the mission.',
                ]}
                morphTime={1.2}
                cooldownTime={1.4}
                className="h-full w-full"
                textClassName="text-25 md:text-31 font-semibold text-brave-primary tracking-tight"
              />
            </div>
            <p className="text-lg text-night/70 font-medium leading-[1.5] mb-6">
              LetAllGirls exists to close the opportunity gap — one device, one school, one subject at
              a time.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href={GOFUNDME_URL}
                {...EXTERNAL_LINK_PROPS}
                className="px-8 py-4 bg-brave-primary text-cloud-light font-semibold rounded-full hover:bg-brave-extra transition-all"
              >
                Support the mission
              </a>
              <Link
                to="/#help"
                className="px-8 py-4 bg-cloud-light text-night border border-brave-neutral/40 font-semibold rounded-full hover:border-brave-primary transition-all"
              >
                Other ways to help
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
