import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

export function Mission() {
  return (
    <Reveal className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h2 className="text-3xl md:text-4xl text-scheme1-fg mb-5">Our Mission</h2>
      <p className="text-scheme1-fg/75 leading-relaxed mb-6">
        LetAllGirls is dedicated to breaking down barriers to quality education, promoting
        gender equality, and supporting youth in developing countries. We provide and sustain
        affordable, high quality, and culture-relevant educational tools for teachers and
        students, fostering curiosity and uplifting communities.
      </p>
      <Button href="/how-do-we-do-it" variant="primary">
        How we do it
      </Button>
    </Reveal>
  )
}
