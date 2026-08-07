import { Seo } from '../components/Seo'
import { HeroMission } from '../components/home/HeroMission'
import { DidiSection } from '../components/home/DidiSection'
import { ProblemSection } from '../components/home/ProblemSection'
import { ImpactSection } from '../components/home/ImpactSection'
import { WhereWeWorkSection } from '../components/home/WhereWeWorkSection'
import { HelpSection } from '../components/home/HelpSection'

export function Home() {
  return (
    <>
      <Seo
        title="LetAllGirls | Offline AI classrooms for schools without internet"
        description="LetAllGirls builds DIDI, an offline AI-powered learning device that brings a personal tutor, digital library, and teacher tools to schools without reliable internet."
        path="/"
      />
      <HeroMission />
      <DidiSection />
      <ProblemSection />
      <ImpactSection />
      <WhereWeWorkSection />
      <HelpSection />
    </>
  )
}
