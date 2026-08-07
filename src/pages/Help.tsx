import { Seo } from '../components/Seo'
import { HelpHero } from '../components/help/HelpHero'
import { WaysToHelp } from '../components/help/WaysToHelp'
import { SustainModel } from '../components/help/SustainModel'

export function Help() {
  return (
    <>
      <Seo
        title="How to Help | LetAllGirls"
        description="Donate, sponsor devices, give hardware, or partner with us. Every gift helps put a DIDI offline AI classroom in the hands of students who need it."
        path="/help"
      />
      <HelpHero />
      <WaysToHelp />
      <SustainModel />
    </>
  )
}
