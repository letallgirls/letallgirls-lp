import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { PlaceholderPage } from './pages/PlaceholderPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<PlaceholderPage title="Our Story" />} />
        <Route path="/didi" element={<PlaceholderPage title="What We Do" />} />
        <Route path="/where-we-work" element={<PlaceholderPage title="Where We Work" />} />
        <Route path="/team" element={<PlaceholderPage title="Team & Board" />} />
        <Route path="/impact" element={<PlaceholderPage title="Impact" />} />
        <Route path="/help" element={<PlaceholderPage title="How to Help" />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
        <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
      </Route>
    </Routes>
  )
}

export default App
