import { Seo } from '../components/Seo'
import { StoryHero } from '../components/our-story/StoryHero'
import { EdgeAiSection } from '../components/our-story/EdgeAiSection'
import { TimelineSection } from '../components/our-story/TimelineSection'
import { BeliefsSection } from '../components/our-story/BeliefsSection'

export function OurStory() {
  return (
    <>
      <Seo
        title="Our Story | LetAllGirls"
        description='How a promise made in memory of Ding Mayen "Didi" Kuai grew into LetAllGirls and the DIDI device, bringing offline AI education to South Sudan and beyond.'
        path="/our-story"
      />
      <StoryHero />
      <EdgeAiSection />
      <TimelineSection />
      <BeliefsSection />
    </>
  )
}
