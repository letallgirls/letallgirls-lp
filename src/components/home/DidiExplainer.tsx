import studentsPhoto from '../../assets/images/south-sudan-students.png'
import { Reveal } from '../ui/Reveal'

const CAPABILITIES = [
  { title: 'Works 100% offline', text: 'No internet connection required, ever.' },
  { title: 'Personal AI tutor', text: 'Answers student questions in real time.' },
  { title: 'Teacher support', text: 'Helps teachers build lesson plans and track student progress.' },
  { title: 'Digital library', text: 'Over 100+ learning resources, acting as a full library where textbooks dont exist.' },
  { title: 'Multi-user', text: 'Supports up to 25 students connected at once.' },
  { title: 'Region-specific', text: 'Content tailored and aligned to local national curriculums.' },
  { title: 'Remotely updatable', text: 'New content and improvements can be pushed to devices in the field.' },
]

export function DidiExplainer() {
  return (
    <Reveal className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 py-8 grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 items-stretch">
      {/* Image card */}
      <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] min-h-[20rem]">
        <img src={studentsPhoto} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Text card */}
      <div className="rounded-[2rem] md:rounded-[2.5rem] bg-cloud-neutral p-8 md:p-10 flex flex-col justify-center">
        <h2 className="text-20 md:text-25 text-night mb-2">What is D.I.D.I.?</h2>
        <p className="text-16 text-night/70 mb-6">
          The Digitally Integrated Daily Instructor turns any room into a fully equipped,
          AI-powered classroom. It requires no internet, computer lab, or reliable electricity.
        </p>
        <ul className="flex flex-col gap-3">
          {CAPABILITIES.map((item) => (
            <li key={item.title} className="flex gap-3 text-13 md:text-16">
              <span className="mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full bg-brave-primary" aria-hidden="true" />
              <span>
                <span className="font-semibold text-night">{item.title}.</span>{' '}
                <span className="text-night/70">{item.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}
