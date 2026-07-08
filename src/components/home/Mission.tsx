import { Reveal } from '../ui/Reveal'

export function Mission() {
  return (
    <Reveal className="mx-auto max-w-4xl px-6 py-16 md:py-20 text-center">
      <h2 className="text-20 md:text-25 text-night mb-6">Our Mission</h2>
      <p className="text-16 md:text-20 text-night/75 leading-relaxed">
        LetAllGirls exists to make sure that a student's circumstances, whether that's where
        they live, their gender, or the situation they're in, never determine whether they get
        to learn. We build technology that works where the infrastructure doesn't. No internet,
        no electricity grid, no problem. So every student, regardless of their situation, has a
        real shot at a quality education.
      </p>
    </Reveal>
  )
}
