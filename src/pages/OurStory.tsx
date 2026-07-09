import { StoryHero } from '../components/our-story/StoryHero'
import { StorySection } from '../components/our-story/StorySection'
import { EdgeAiSection } from '../components/our-story/EdgeAiSection'
import { TimelineSection } from '../components/our-story/TimelineSection'
import { BeliefsSection } from '../components/our-story/BeliefsSection'

export function OurStory() {
  return (
    <>
      <StoryHero />
      <StorySection />
      <EdgeAiSection />
      <TimelineSection />
      <BeliefsSection />
    </>
  )
}
