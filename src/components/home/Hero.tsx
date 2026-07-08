import heroPhoto from '../../assets/images/donate-hero.png'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

export function Hero() {
  return (
    <section className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 pt-10 pb-6">
      <Reveal className="grid grid-cols-1 md:grid-cols-[3fr_1fr] items-center">
        <img
          src={heroPhoto}
          alt="LetAllGirls students in a classroom"
          className="w-full h-64 md:h-[28rem] object-cover rounded-[2rem] shadow-lg shadow-night/10 relative z-0"
          fetchPriority="high"
        />
        <div className="bg-gradient-brand text-cloud-light flex flex-col items-center justify-center gap-6 p-10 text-center rounded-[2rem] md:-ml-16 md:w-[calc(100%+4rem)] relative z-10">
          <h2 className="text-25 md:text-31">Donate</h2>
          <Button href="https://gofund.me/5663872b" variant="on-dark">
            Click Here
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
