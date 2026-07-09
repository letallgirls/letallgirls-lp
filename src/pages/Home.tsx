import { HeroStory } from '../components/home/HeroStory'
import { DidiSection } from '../components/home/DidiSection'
import { ProblemSection } from '../components/home/ProblemSection'
import { ImpactSection } from '../components/home/ImpactSection'
import { WhereWeWorkSection } from '../components/home/WhereWeWorkSection'
import { HelpSection } from '../components/home/HelpSection'

export function Home() {
  return (
    <>
      <HeroStory />
      <DidiSection />
      <ProblemSection />
      <ImpactSection />
      <WhereWeWorkSection />
      <HelpSection />
    </>
  )
}
