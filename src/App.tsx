import React from 'react';
import { Navbar } from './components/Navbar';
import { ParticleBackground } from './components/ParticleBackground';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { BenefitsSection } from './components/BenefitsSection';
import { ScrollytellingSection } from './components/ScrollytellingSection';
import { RitualSection } from './components/RitualSection';
import { GuideSection } from './components/GuideSection';
import { CTASection } from './components/CTASection';
import { MobileStickyOrder } from './components/MobileStickyOrder';

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <ParticleBackground />
      
      <main className="relative z-10">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <BenefitsSection />
        <ScrollytellingSection />
        <RitualSection />
        <GuideSection />
        <CTASection />
      </main>
      
      {/* Mobile Sticky Order Button - Only visible on mobile devices */}
      <MobileStickyOrder />
    </div>
  );
}

export default App;