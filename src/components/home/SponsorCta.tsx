import sponsorPhoto from '../../assets/images/partners-banner.jpg'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

export function SponsorCta() {
  return (
    <Reveal className="px-0 py-8 md:py-12">
      {/* Edge-to-edge massive bento card */}
      <div className="relative overflow-hidden rounded-none md:rounded-[2.5rem] md:mx-10 lg:mx-16 min-h-[28rem] md:min-h-[34rem]">
        {/* Background image */}
        <img src={sponsorPhoto} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />

        {/* Solid dark overlay for legibility */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-8 md:p-14 max-w-xl min-h-[28rem] md:min-h-[34rem]">
          <p className="text-13 md:text-16 uppercase tracking-wide text-cloud-light/80 font-semibold mb-3">
            Sponsor a Device
          </p>
          <h2 className="text-20 md:text-31 text-cloud-light mb-4">
            $25/month can support one DIDI device serving upwards of 500 students.
          </h2>
          <p className="text-13 md:text-16 text-cloud-light/80 mb-8">
            A recurring, tangible way to see exactly what your contribution is powering.
          </p>
          <Button href="/help" variant="primary" className="w-fit">
            Sponsor a Device
          </Button>
        </div>
      </div>
    </Reveal>
  )
}
