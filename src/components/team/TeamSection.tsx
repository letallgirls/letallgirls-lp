import { motion } from 'framer-motion'
import { Reveal } from '../ui/Reveal'

type Person = { name: string; role?: string; bio?: string }
type Group = { heading: string; blurb: string; people: Person[] }

const groups: Group[] = [
  {
    heading: 'Our Team',
    blurb: 'The core team leading strategy, operations, logistics, and technology.',
    people: [
      { name: 'Mateo Acosta-Rubio', role: 'Executive Director', bio: 'Leads strategic direction and day-to-day operations.' },
      { name: 'Lucia Saab Arango', role: 'Operations Director', bio: 'Oversees organizational operations, community engagement, and educational impact.' },
      { name: 'Samuel Striker', role: 'Logistics Director', bio: 'Manages operational logistics and project execution.' },
      { name: 'Sean Collins', role: 'Technical Director', bio: 'Leads AI/edge computing implementation and ed-tech strategy.' },
      { name: 'Madison Spence', role: 'Marketing & Education Planning' },
    ],
  },
  {
    heading: 'Board of Directors',
    blurb: 'Advisors guiding governance, finance, and international growth.',
    people: [
      { name: 'Mateo Acosta-Rubio' },
      { name: 'Samuel Striker' },
      { name: 'Lucia Saab Arango' },
      { name: 'Sean Collins' },
      { name: 'Ian Lester', bio: 'CEO of Beyond.co.za; 17 years of experience, UNICEF partnerships, social-impact startup background.' },
      { name: 'Soha Ehsani', bio: 'Director of Century City Property; expertise in African logistics and impact-driven investment.' },
      { name: 'Margarita Fonnegra', bio: 'CFO of Centro Interactivo de CRM; financial planning for NGOs.' },
      { name: 'María Pilar Amorocho Gutiérrez', bio: 'CEO at FSQ Group; expertise in international expansion and corporate administration.' },
    ],
  },
  {
    heading: 'South Sudan Team',
    blurb: 'The team leading deployments and community initiatives on the ground.',
    people: [
      { name: 'Kuai Mayen Kuai', role: 'South Sudan Team Director', bio: "Didi's brother, leading local initiatives on the ground." },
      { name: 'Luka Lual Kuc', role: 'Deputy Director, South Sudan' },
      { name: 'Amou Abot', role: 'Project Coordinator, South Sudan' },
      { name: 'Ayen Sharon', role: 'Communications Officer, South Sudan' },
    ],
  },
]

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

function PersonCard({ person, delay }: { person: Person; delay: number }) {
  return (
    <Reveal delay={delay}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="h-full p-6 bg-cloud-light rounded-2xl border border-brave-primary/10 hover:border-brave-primary/40 hover:shadow-lg hover:shadow-brave-primary/5 transition-all"
      >
        <div className="size-12 rounded-full bg-brave-primary/10 flex items-center justify-center mb-4">
          <span className="text-brave-primary font-semibold text-13">{initials(person.name)}</span>
        </div>
        <h3 className="text-20 font-semibold leading-tight">{person.name}</h3>
        {person.role && (
          <p className="mt-1 text-13 text-label font-semibold uppercase tracking-wider text-brave-primary">
            {person.role}
          </p>
        )}
        {person.bio && <p className="mt-3 text-night/60 font-medium leading-[1.4]">{person.bio}</p>}
      </motion.article>
    </Reveal>
  )
}

export function TeamSection() {
  return (
    <section id="team" className="py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        {groups.map((group) => (
          <div key={group.heading}>
            <Reveal className="max-w-3xl mb-12">
              <h2 className="text-31 md:text-39 font-semibold leading-[1.1] tracking-tight">
                {group.heading}
              </h2>
              <p className="mt-3 text-lg text-night/60 font-medium">{group.blurb}</p>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.people.map((person, i) => (
                <PersonCard key={`${group.heading}-${person.name}`} person={person} delay={i * 0.05} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
