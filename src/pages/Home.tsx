import { Hero } from '../components/home/Hero'
import { Mission } from '../components/home/Mission'
import { VideoSection } from '../components/home/VideoSection'
import { DidiExplainer } from '../components/home/DidiExplainer'
import { ImpactStat } from '../components/home/ImpactStat'
import { SponsorCta } from '../components/home/SponsorCta'
import { Newsletter } from '../components/home/Newsletter'

export function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <VideoSection />
      <DidiExplainer />
      <ImpactStat />
      <SponsorCta />
      <Newsletter />
    </>
  )
}
