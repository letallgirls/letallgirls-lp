import { Seo } from '../components/Seo'
import { TeamHero } from '../components/team/TeamHero'
import { TeamSection } from '../components/team/TeamSection'
import { GallerySection } from '../components/team/GallerySection'

export function Team() {
  return (
    <>
      <Seo
        title="Team & Board | LetAllGirls"
        description="Meet the builders, educators, and advisors behind LetAllGirls, working across three continents and on the ground in South Sudan."
        path="/team"
      />
      <TeamHero />
      <TeamSection />
      <GallerySection />
    </>
  )
}
