import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import Hero from './components/Hero'
import LiveStats from './components/LiveStats'
import Features from './components/Features'
import VisualShowcase from './components/VisualShowcase'
import TerminalDemo from './components/TerminalDemo'
import Playground from './components/Playground'
import SetupWizard from './components/SetupWizard'
import Feedback from './components/Feedback'
import Footer from './components/Footer'
import FadeInSection from './components/FadeInSection'

function App() {
  return (
    <div className="bg-forest-dark min-h-screen font-sans text-white overflow-hidden">
      <Hero />
      <FadeInSection>
        <LiveStats />
      </FadeInSection>
      <FadeInSection>
        <Features />
      </FadeInSection>
      <FadeInSection>
        <VisualShowcase />
      </FadeInSection>
      <FadeInSection>
        <TerminalDemo />
      </FadeInSection>
      <FadeInSection>
        <Playground />
      </FadeInSection>
      <FadeInSection>
        <SetupWizard />
      </FadeInSection>
      <FadeInSection>
        <Feedback />
      </FadeInSection>
      <Footer />
      <Analytics />
    </div>
  )
}

export default App
