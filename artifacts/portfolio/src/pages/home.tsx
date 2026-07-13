import { useState, useCallback } from 'react';

import BootLoader from '@/components/BootLoader';
import StarfieldCanvas from '@/components/StarfieldCanvas';
import CursorTrail from '@/components/CursorTrail';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FounderTimeline from '@/components/FounderTimeline';
import CompanyDashboard from '@/components/CompanyDashboard';
import TechEcosystem from '@/components/TechEcosystem';
import AIBrain from '@/components/AIBrain';
import ProjectGalaxy from '@/components/ProjectGalaxy';
import InnovationTimeline from '@/components/InnovationTimeline';
import DigitalVault from '@/components/DigitalVault';
import GitHubIntelligence from '@/components/GitHubIntelligence';
import CommandCenter from '@/components/CommandCenter';
import EarthStation from '@/components/EarthStation';
import TerminalFooter from '@/components/TerminalFooter';
import JarvisOrb from '@/components/JarvisOrb';

export default function Home() {
  const [booted, setBooted] = useState(false);
  const handleBootComplete = useCallback(() => setBooted(true), []);

  return (
    <div className="relative min-h-screen" style={{ background: '#030712', color: '#fff', cursor: 'none' }}>
      {/* Global background — fixed stars + nebula */}
      <StarfieldCanvas />

      {/* Custom cursor trail */}
      <CursorTrail />

      {/* Boot loader overlay */}
      {!booted && <BootLoader onComplete={handleBootComplete} />}

      {/* Main content — always rendered so sections mount */}
      <div
        className="transition-opacity duration-700"
        style={{ opacity: booted ? 1 : 0, pointerEvents: booted ? 'auto' : 'none' }}
      >
        <Navbar />

        <main>
          <HeroSection />
          <FounderTimeline />
          <CompanyDashboard />
          <TechEcosystem />
          <AIBrain />
          <ProjectGalaxy />
          <InnovationTimeline />
          <DigitalVault />
          <GitHubIntelligence />
          <CommandCenter />
          <EarthStation />
        </main>

        <TerminalFooter />

        {/* JARVIS Orb — fixed bottom right */}
        <JarvisOrb />
      </div>
    </div>
  );
}
