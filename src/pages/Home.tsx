import { HeroMission } from '../components/home/HeroMission'
import { DidiSection } from '../components/home/DidiSection'
import { ProblemSection } from '../components/home/ProblemSection'
import { ImpactSection } from '../components/home/ImpactSection'
import { WhereWeWorkSection } from '../components/home/WhereWeWorkSection'
import { HelpSection } from '../components/home/HelpSection'

export function Home() {
  return (
    <>
      <HeroMission />
      <DidiSection />
      <ProblemSection />
      <ImpactSection />
      <WhereWeWorkSection />
      <HelpSection />
    </>
  )
}
