import didiWithGirl from '../../assets/images/didi-with-girl.png'
import southSudanStudents from '../../assets/images/south-sudan-students.png'
import girls from '../../assets/images/girls.png'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

type Row = {
  image: string
  heading: string
  text: string
  cta: string
  href: string
  reverse?: boolean
}

const ROWS: Row[] = [
  {
    image: didiWithGirl,
    heading: 'Donate',
    text: 'Every dollar is invested into providing essential resources to schools and libraries across under-served communities. Your donation goes a long way in getting us one step closer to consistently fulfilling our mission.',
    cta: 'Donate!',
    href: 'https://gofund.me/5663872b',
  },
  {
    image: southSudanStudents,
    heading: 'Join Our Team',
    text: "The more, the merrier! Join our team and play a pivotal role in empowering the future generation of leaders. Every new member offers unique strengths and helps us expand our reach while deepening our impact. Whether you're an artist, an engineer, a teacher, an entrepreneur, or just feel passionate about what we are doing... We could use your help!",
    cta: 'Join Our Team!',
    href: '/join-our-team',
    reverse: true,
  },
  {
    image: girls,
    heading: 'Learn More',
    text: 'Learn more about our efforts to empower the youth in South Sudan and discover how you can contribute to positive change. By simply sharing our story or actively engaging in our initiatives, every action counts. Dive deeper into our mission and how it all came to be.',
    cta: 'Learn More!',
    href: '/our-mission',
  },
]

export function ImpactRows() {
  return (
    <section className="mx-auto max-w-[130rem] px-6 md:px-10 lg:px-28 py-20 flex flex-col gap-16">
      {ROWS.map((row, i) => (
        <Reveal
          key={row.heading}
          order={i}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
            row.reverse ? 'md:[&>*:first-child]:order-2' : ''
          }`}
        >
          <img
            src={row.image}
            alt=""
            loading="lazy"
            className="w-full h-72 object-cover rounded-2xl"
          />
          <div>
            <h2 className="text-2xl md:text-3xl text-scheme1-fg mb-4">{row.heading}</h2>
            <p className="text-scheme1-fg/75 leading-relaxed mb-6">{row.text}</p>
            <Button href={row.href} variant="secondary">
              {row.cta}
            </Button>
          </div>
        </Reveal>
      ))}
    </section>
  )
}
