import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { GlobalAsciiBackground } from './components/GlobalAsciiBackground';
import { Navbar } from './components/Navbar';
import { KineticHero } from './components/KineticHero';
import { KineticMarquee } from './components/KineticMarquee';
import { WorkGrid } from './components/WorkGrid';
import { CaseStudyModal } from './components/CaseStudyModal';
import { AboutSection } from './components/AboutSection';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

export function App() {
  const [loading, setLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Default to Dark Mode with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('sumanth_portfolio_theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    return true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sumanth_portfolio_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sumanth_portfolio_theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-zinc-900 dark:text-white bg-white dark:bg-[#09090B] antialiased selection:bg-orange-500/20 relative transition-colors duration-300">
      
      {/* 1. Kinetic Preloader (Full-Screen z-[9999]) */}
      {loading && (
        <Preloader
          onComplete={() => setLoading(false)}
          soundEnabled={soundEnabled}
        />
      )}

      {/* 2. Custom Magnetic Cursor */}
      <CustomCursor />

      {/* 3. Global Ambient '+' Grid Hover Spotlight */}
      <GlobalAsciiBackground isDarkMode={isDarkMode} />

      {/* 4. Floating Navigation (Reveals only AFTER loader finishes) */}
      <Navbar
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenContact={() => setIsContactOpen(true)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isLoaded={!loading}
      />

      {/* 5. Main Sections (z-20 so all content is strictly ABOVE the footer background) */}
      <main className="flex-1 relative z-20">
        
        {/* Kinetic Hero with 3D ASCII Dove + Gun Crosshair & Laser Projectiles */}
        <KineticHero
          soundEnabled={soundEnabled}
          isDarkMode={isDarkMode}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Continuous Skills Marquee Banner */}
        <KineticMarquee />

        {/* Clean Work Grid */}
        <WorkGrid
          soundEnabled={soundEnabled}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* Work History & Clean Software Arsenal (Floats securely above footer) */}
        <AboutSection />

      </main>

      {/* 6. Footer with Upward Pulsating Gradient ASCII Shader & Mouse Hover Flare (z-10) */}
      <Footer
        soundEnabled={soundEnabled}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* 7. Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          soundEnabled={soundEnabled}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* 8. Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        soundEnabled={soundEnabled}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}

export default App;
