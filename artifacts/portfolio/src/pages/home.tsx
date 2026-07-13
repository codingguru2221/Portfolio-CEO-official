import { useState, useCallback } from 'react';
import BootLoader from '@/components/BootLoader';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  const [booted, setBooted] = useState(false);
  const handleBootComplete = useCallback(() => setBooted(true), []);

  return (
    <>
      {!booted && <BootLoader onComplete={handleBootComplete} />}
      <div
        className="transition-opacity duration-700"
        style={{ opacity: booted ? 1 : 0, pointerEvents: booted ? 'auto' : 'none' }}
      >
        <HeroSection />
      </div>
    </>
  );
}
