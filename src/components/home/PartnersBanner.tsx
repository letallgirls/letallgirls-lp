import partnersBanner from '../../assets/images/partners-banner.jpg'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

export function PartnersBanner() {
  return (
    <Reveal className="relative w-full min-h-[420px] flex items-center justify-center overflow-hidden mt-10">
      <img
        src={partnersBanner}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative text-dark-fg text-center max-w-xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl mb-4">Meet Our Partners!</h2>
        <p className="mb-6 opacity-90">
          Meet the organizations we partner with that help make everything possible.
        </p>
        <Button href="/our-partners" variant="primary-on-dark">
          Meet our Partners
        </Button>
      </div>
    </Reveal>
  )
}
