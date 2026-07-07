import donateHero from '../../assets/images/donate-hero.png'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

export function DonateHero() {
  return (
    <section className="mx-auto max-w-[130rem] px-6 md:px-10 lg:px-28 pt-10 pb-6">
      <Reveal className="grid grid-cols-1 md:grid-cols-[3fr_1fr] items-center">
        <img
          src={donateHero}
          alt=""
          className="w-full h-64 md:h-[28rem] object-cover rounded-2xl shadow-lg shadow-black/10 relative z-0"
          fetchPriority="high"
        />
        <div className="bg-gradient-blue text-blue-fg flex flex-col items-center justify-center gap-6 p-10 text-center rounded-3xl md:-ml-16 md:w-[calc(100%+4rem)] relative z-10">
          <h2 className="text-2xl md:text-3xl">Donate</h2>
          <Button href="https://gofund.me/d681cde8" variant="primary-on-blue">
            Click Here
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
