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
import { NoBrokerCasePage } from './components/NoBrokerCasePage';
import { PosterChallengePage } from './components/PosterChallengePage';
import { projects } from './data/portfolioData';
import { preloadWindSounds } from './utils/sound';
import { Agentation } from 'agentation';

export function App() {
  const [loading, setLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeDedicatedCase, setActiveDedicatedCase] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Preload audio assets into Web Audio buffers on initial app load
  useEffect(() => {
    preloadWindSounds();
  }, []);

  // Synchronize hash routing for deep linking into case pages
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#/project/nobroker') {
        const nobrokerProj = projects.find(p => p.id === 'nobroker-commute');
        if (nobrokerProj) setActiveDedicatedCase(nobrokerProj);
      } else if (window.location.hash === '#/project/poster-challenge') {
        const posterProj = projects.find(p => p.id === 'poster-challenge');
        if (posterProj) setActiveDedicatedCase(posterProj);
      } else {
        setActiveDedicatedCase(null);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

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
    <div className="min-h-screen flex flex-col font-sans text-black dark:text-white bg-white dark:bg-[#09090B] antialiased selection:bg-orange-500 selection:text-white relative transition-colors duration-300 overflow-x-hidden">
      
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
          isLoaded={!loading}
        />

        {/* Continuous Skills Marquee Banner */}
        <KineticMarquee />

        {/* Clean Work Grid */}
        <WorkGrid
          soundEnabled={soundEnabled}
          onSelectProject={(proj) => {
            if (proj.id === 'nobroker-commute') {
              setActiveDedicatedCase(proj);
              window.history.pushState(null, '', '#/project/nobroker');
            } else if (proj.id === 'poster-challenge') {
              setActiveDedicatedCase(proj);
              window.history.pushState(null, '', '#/project/poster-challenge');
            } else if (proj.hasDedicatedPage) {
              setActiveDedicatedCase(proj);
              window.history.pushState(null, '', `#/project/${proj.id}`);
            } else {
              setSelectedProject(proj);
            }
          }}
        />

        {/* Work History & Clean Software Arsenal (Floats securely above footer) */}
        <AboutSection />

      </main>

      {/* 6. Footer with Upward Pulsating Gradient ASCII Shader & Mouse Hover Flare (z-10) */}
      <Footer
        soundEnabled={soundEnabled}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* 7. Dedicated Full Case Study Page View */}
      {activeDedicatedCase && activeDedicatedCase.id === 'nobroker-commute' && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#F5F5F7] dark:bg-[#0C0C0E] animate-fade-in">
          <NoBrokerCasePage
            soundEnabled={soundEnabled}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            onOpenContact={() => setIsContactOpen(true)}
            onBack={() => {
              setActiveDedicatedCase(null);
              window.history.pushState(null, '', window.location.pathname);
            }}
          />
        </div>
      )}

      {activeDedicatedCase && activeDedicatedCase.id === 'poster-challenge' && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-[#09090B] animate-fade-in">
          <PosterChallengePage
            soundEnabled={soundEnabled}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            onOpenContact={() => setIsContactOpen(true)}
            onBack={() => {
              setActiveDedicatedCase(null);
              window.history.pushState(null, '', window.location.pathname);
            }}
          />
        </div>
      )}

      {/* 8. Standard Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          soundEnabled={soundEnabled}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* 9. Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        soundEnabled={soundEnabled}
        onClose={() => setIsContactOpen(false)}
      />

      {/* 10. Agentation Visual Feedback Toolbar (Local Dev Server Only) */}
      {import.meta.env.DEV && <Agentation />}

    </div>
  );
}

export default App;
