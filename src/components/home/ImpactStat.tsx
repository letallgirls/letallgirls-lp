import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

export function ImpactStat() {
  return (
    <Reveal className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 items-stretch">
        {/* Stats card */}
        <div className="rounded-[2rem] md:rounded-[2.5rem] bg-brave-primary text-cloud-light p-8 md:p-10 flex flex-col justify-center gap-6">
          <div>
            <div className="text-25 md:text-31 font-bold">62%</div>
            <p className="mt-1 text-13 md:text-16 text-cloud-light/80">
              Improvement in test scores from a six-week AI-powered adaptive learning program.
            </p>
          </div>
          <div>
            <div className="text-25 md:text-31 font-bold">2 yrs</div>
            <p className="mt-1 text-13 md:text-16 text-cloud-light/80">
              Worth of curriculum content covered by students in that same six-week program.
            </p>
          </div>
          <Button href="/impact" variant="on-dark" className="w-fit">
            See our impact
          </Button>
        </div>

        {/* Visual accent card — asymmetric counterweight */}
        <div className="hidden md:flex rounded-[2rem] md:rounded-[2.5rem] bg-brave-light items-center justify-center p-10">
          <div className="text-center">
            <p className="text-49 md:text-61 font-bold text-brave-primary leading-none">500+</p>
            <p className="mt-2 text-16 text-night/60">Students impacted per DIDI device</p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
