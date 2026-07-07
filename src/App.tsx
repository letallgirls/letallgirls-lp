import { AnnouncementBar } from './components/layout/AnnouncementBar'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { DonateHero } from './components/home/DonateHero'
import { Mission } from './components/home/Mission'
import { VideoSection } from './components/home/VideoSection'
import { ImpactRows } from './components/home/ImpactRows'
import { PartnersBanner } from './components/home/PartnersBanner'
import { Newsletter } from './components/home/Newsletter'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <DonateHero />
        <Mission />
        <VideoSection />
        <ImpactRows />
        <PartnersBanner />
      </main>
      <Newsletter />
      <Footer />
    </div>
  )
}

export default App
