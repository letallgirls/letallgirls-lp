import { Reveal } from '../ui/Reveal'
import mateo from '../../assets/images/team-mateo.jpg'
import lucia from '../../assets/images/team-lucia.jpg'
import samuel from '../../assets/images/team-samuel.jpg'
import sean from '../../assets/images/team-sean.jpg'
import madison from '../../assets/images/team-madison.png'
import ian from '../../assets/images/team-ian.webp'
import soha from '../../assets/images/team-soha.png'
import margarita from '../../assets/images/team-margarita.png'
import kuai from '../../assets/images/team-kuai.jpg'
import luka from '../../assets/images/team-luka.jpg'
import amou from '../../assets/images/team-amou.jpg'
import ayen from '../../assets/images/team-ayen.jpg'

type Person = { name: string; role: string; bio?: string; photo?: string }

const leadership: Person[] = [
  { name: 'Mateo Acosta-Rubio', role: 'Executive Director', photo: mateo, bio: 'Leads strategic direction and day-to-day operations.' },
  { name: 'Lucia Saab Arango', role: 'Operations Director', photo: lucia, bio: 'Oversees operations, community engagement, and educational impact.' },
  { name: 'Samuel Striker', role: 'Logistics Director', photo: samuel, bio: 'Manages operational logistics and project execution.' },
  { name: 'Sean Collins', role: 'Technical Director', photo: sean, bio: 'Leads AI / edge-computing implementation and ed-tech strategy.' },
  { name: 'Madison Spence', role: 'Marketing & Education', photo: madison, bio: 'Educational programming and marketing.' },
]

const board: Person[] = [
  { name: 'Ian Lester', role: 'Board Member', photo: ian, bio: 'CEO of Beyond.co.za; 17 years of experience, UNICEF partnerships, and social-impact startups.' },
  { name: 'Soha Ehsani', role: 'Board Member', photo: soha, bio: 'Director of Century City Property; expertise in African logistics and impact-driven investment.' },
  { name: 'Margarita Fonnegra', role: 'Board Member', photo: margarita, bio: 'CFO of Centro Interactivo de CRM; financial planning for NGOs.' },
  { name: 'María Pilar Amorocho Gutiérrez', role: 'Board Member', bio: 'CEO at FSQ Group; expertise in international expansion and corporate administration.' },
]

const southSudan: Person[] = [
  { name: 'Kuai Mayen Kuai', role: 'Team Director', photo: kuai, bio: "Didi's brother, leading local initiatives on the ground in South Sudan." },
  { name: 'Luka Lual Kuc', role: 'Deputy Director', photo: luka, bio: 'Deputy Director of the South Sudan team, coordinating field operations.' },
  { name: 'Amou Abot', role: 'Project Coordinator', photo: amou, bio: 'Project Coordinator on the ground in South Sudan.' },
  { name: 'Ayen Sharon', role: 'Communications Officer', photo: ayen, bio: 'Communications Officer for the South Sudan team.' },
]

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()

/**
 * Photo card that flips on hover to reveal the bio on the back — so the compact
 * cards can stay photo-first up front and still carry their details.
 */
function FlipCard({ person, delay }: { person: Person; delay: number }) {
  return (
    <Reveal delay={delay} className="group [perspective:1000px]">
      <div className="relative aspect-[4/5] w-full transition-transform duration-[600ms] ease-[var(--ease-out-slow)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front — photo (or monogram) with name/role overlay */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
          {person.photo ? (
            <img src={person.photo} alt={person.name} loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-brave-light flex items-center justify-center">
              <span className="text-49 font-semibold text-brave-primary/40">{initials(person.name)}</span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-night/85 via-night/40 to-transparent">
            <h3 className="text-cloud-light font-semibold leading-tight">{person.name}</h3>
            <p className="text-13 text-label text-cloud-light/80 mt-0.5">{person.role}</p>
          </div>
        </div>

        {/* Back — details over the dimmed photo, so it reads as one considered card */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
          {person.photo ? (
            <img src={person.photo} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-brave-light" />
          )}
          <div className="absolute inset-0 bg-brave-extra/90" />
          <div className="relative h-full flex flex-col justify-center p-5 text-cloud-light">
            <h3 className="font-semibold text-20 leading-tight">{person.name}</h3>
            <p className="text-13 text-label uppercase tracking-wider text-cloud-light/70 mt-1">{person.role}</p>
            {person.bio && <p className="mt-3 text-13 text-cloud-light/85 leading-[1.5]">{person.bio}</p>}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function Group({
  eyebrow,
  title,
  blurb,
  people,
  cols,
}: {
  eyebrow?: string
  title: string
  blurb?: string
  people: Person[]
  cols: string
}) {
  return (
    <div>
      <Reveal className="max-w-3xl mb-12">
        {eyebrow && (
          <span className="text-13 text-label font-semibold text-brave-primary uppercase tracking-widest">
            {eyebrow}
          </span>
        )}
        <h2 className={`${eyebrow ? 'mt-3 text-31 md:text-39' : 'text-25 md:text-31'} font-semibold leading-[1.1] tracking-tight`}>
          {title}
        </h2>
        {blurb && <p className="mt-2 text-night/60 font-medium">{blurb}</p>}
      </Reveal>
      <div className={`grid gap-6 ${cols}`}>
        {people.map((p, i) => (
          <FlipCard key={`${title}-${p.name}`} person={p} delay={i * 0.05} />
        ))}
      </div>
    </div>
  )
}

export function TeamSection() {
  return (
    <section id="team" className="py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        <Group
          eyebrow="Our Team"
          title="The people running the day-to-day."
          people={leadership}
          cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        />
        <Group
          title="Board of Directors"
          people={board}
          cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        />
        <Group
          title="South Sudan Team"
          blurb="Leading deployments and community work on the ground."
          people={southSudan}
          cols="grid-cols-2 sm:grid-cols-4"
        />
      </div>
    </section>
  )
}
