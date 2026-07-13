import { Reveal } from '../ui/Reveal'
import { ExpandableGallery } from '../ui/ExpandableGallery'
import { GOFUNDME_URL, EXTERNAL_LINK_PROPS } from '../../constants/links'
import classroomPhoto from '../../assets/images/hero-stack-classroom.png'
import pledgePhoto from '../../assets/images/hero-stack-pledge.png'
import readingPhoto from '../../assets/images/hero-stack-reading.png'
import mentorshipPhoto from '../../assets/images/gallery-4.jpg'
import teamPhoto from '../../assets/images/gallery-1.jpg'

const model = [
  {
    value: '$200',
    label: 'Shipping & deployment',
    body: 'A one-time fee per DIDI unit that covers getting a device on the ground. This is often waived.',
  },
  {
    value: '$25',
    label: 'Per month, per device',
    body: 'A subscription covering remote support, software updates, and content refreshes.',
  },
]

const galleryImages = [
  { src: classroomPhoto, alt: 'Girls listening attentively in a classroom in South Sudan' },
  { src: pledgePhoto, alt: 'Students standing together at a school assembly in South Sudan' },
  { src: readingPhoto, alt: 'A girl reading a worn notebook outdoors' },
  { src: mentorshipPhoto, alt: 'A speaker addressing a girls’ mentorship event' },
  { src: teamPhoto, alt: 'Young professionals from the LetAllGirls community' },
]

export function SustainModel() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <span className="text-13 text-label font-semibold text-brave-primary uppercase tracking-widest">
              Built to last
            </span>
            <h2 className="text-31 md:text-49 font-semibold mt-4 leading-[1.1] tracking-tight">
              A model built for the long run, not one-time gifts.
            </h2>
            <p className="mt-5 text-16 text-night/70 font-medium leading-[1.55]">
              LetAllGirls is a nonprofit, but DIDI is priced for sustainability. This lets schools
              access DIDI at a fraction of the cost of alternatives like satellite internet, while
              giving us a recurring path to fund manufacturing, R&D, and expansion.
            </p>
            <div className="mt-8">
              <a
                href={GOFUNDME_URL}
                {...EXTERNAL_LINK_PROPS}
                className="inline-flex px-9 py-4 bg-brave-primary text-cloud-light font-semibold rounded-full hover:bg-brave-extra shadow-lg shadow-brave-primary/20 transition-all"
              >
                Donate now
              </a>
              <p className="mt-4 text-13 text-label text-night/50 font-medium">
                Tax-deductible in the U.S. as a 501(c)(3) nonprofit.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-8">
            {model.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.1}>
                <div className={i > 0 ? 'h-full pl-8 border-l border-night/10' : 'h-full'}>
                  <div className="text-49 md:text-61 font-semibold text-brave-primary leading-none">{m.value}</div>
                  <h3 className="mt-4 text-20 font-semibold">{m.label}</h3>
                  <p className="mt-2 text-night/60 font-medium leading-[1.45]">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15} className="mt-16 md:mt-20">
          <ExpandableGallery images={galleryImages} />
        </Reveal>
      </div>
    </section>
  )
}
