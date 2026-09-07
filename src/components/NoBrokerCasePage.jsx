import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowSquareOut,
  Sun,
  Moon
} from '@phosphor-icons/react';
import { Agentation } from 'agentation';
import { playSound } from '../utils/sound';
import { GlobalAsciiBackground } from './GlobalAsciiBackground';

// Modular Sections
import { CaseHeader } from './nobroker/CaseHeader';
import { PersonalStoryContext } from './nobroker/PersonalStoryContext';
import { InterviewDeductions } from './nobroker/InterviewDeductions';
import { ThreeProjectsInteractive } from './nobroker/ThreeProjectsInteractive';
import { ReflectionsAndGaps } from './nobroker/ReflectionsAndGaps';
import { Footer } from './Footer';
import { initScrollReveals } from '../utils/motion';

export const NoBrokerCasePage = ({ onBack, soundEnabled, onOpenContact, isDarkMode, setIsDarkMode }) => {
  // Use deployed Vercel lab by default, allowing seamless prototype interaction in production
  const [labHost, setLabHost] = useState('https://app-seven-indol-73.vercel.app');

  useEffect(() => {
    // When running locally on localhost, check if local Next.js lab is active
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      fetch('http://localhost:3000/ps1', { method: 'HEAD', mode: 'no-cors' })
        .then(() => setLabHost('http://localhost:3000'))
        .catch(() => setLabHost('https://app-seven-indol-73.vercel.app'));
    }
  }, []);

  const [activeProject, setActiveProject] = useState('ps2');
  const [activeSection, setActiveSection] = useState('header-section');

  const containerRef = useRef(null);

  const tocItems = [
    { id: 'header-section', label: 'Overview', kicker: 'Intro' },
    { id: 'story-section', label: 'Assumption & Discovery', kicker: '01–02' },
    { id: 'deductions-section', label: '7 Clusters & Metrics Framework', kicker: '03–04' },
    { id: 'projects-section', label: '3 Solved Pillars', kicker: '05' },
    { id: 'gaps-section', label: 'Reflections & Gaps', kicker: '06' },
  ];

  // 60FPS Scroll Reveal Initialization
  useEffect(() => {
    let cleanupReveals = null;
    const timer = setTimeout(() => {
      if (containerRef.current) {
        cleanupReveals = initScrollReveals(containerRef.current);
      }
    }, 120);

    return () => {
      clearTimeout(timer);
      if (cleanupReveals) cleanupReveals();
    };
  }, []);

  // Scroll spy setup
  useEffect(() => {
    const handleScroll = () => {
      for (const item of [...tocItems].reverse()) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    const scrollContainer = containerRef.current?.closest('.overflow-y-auto') || window;
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  // Robust smooth scroll helper that works across modal overflow containers and window
  const smoothScrollTo = (targetEl, offset = 70) => {
    if (!targetEl) return;
    const scrollContainer = targetEl.closest('.overflow-y-auto');
    if (scrollContainer) {
      const containerTop = scrollContainer.getBoundingClientRect().top;
      const targetTop = targetEl.getBoundingClientRect().top;
      const targetScroll = scrollContainer.scrollTop + (targetTop - containerTop) - offset;
      scrollContainer.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    } else {
      const pageOffset = window.pageYOffset || document.documentElement.scrollTop || 0;
      const targetTop = targetEl.getBoundingClientRect().top;
      window.scrollTo({
        top: Math.max(0, pageOffset + targetTop - offset),
        behavior: 'smooth'
      });
    }
  };

  const scrollToSection = (id) => {
    playSound('pop', soundEnabled);
    const el = document.getElementById(id);
    if (el) {
      smoothScrollTo(el, 70);
    }
  };

  const handleSelectSolvedPillar = (pillarId) => {
    setActiveProject(pillarId);
    setTimeout(() => {
      const projContainer = document.getElementById('projects-section');
      if (projContainer) {
        smoothScrollTo(projContainer, 70);
      }
    }, 40);
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#F5F5F7] dark:bg-[#09090B] text-zinc-900 dark:text-zinc-100 selection:bg-orange-500 selection:text-white antialiased relative font-sans transition-colors duration-300"
    >
      {/* Global Ambient '+' Grid Hover Spotlight across the entire case study page */}
      <GlobalAsciiBackground isDarkMode={isDarkMode} fullPage={true} />

      {/* Floating Top Bar (Sticky Navigation & Back Button) */}
      <nav className="sticky top-0 z-50 bg-[#F5F5F7]/85 dark:bg-[#09090B]/80 backdrop-blur-xl border-b border-zinc-200/90 dark:border-zinc-800 px-4 sm:px-6 xl:px-0 py-3.5 transition-all">
        <div className="max-w-[1240px] w-full mx-auto flex items-center justify-between gap-4">
          
          {/* Left Action: Back to Portfolio */}
          <button
            onClick={() => {
              playSound('pop', soundEnabled);
              onBack ? onBack() : (window.location.hash = '');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 transition-all hover:scale-105 active:scale-95 tactile-btn shrink-0"
          >
            <ArrowLeft size={14} weight="bold" />
            <span>Back to Portfolio</span>
          </button>

          {/* Quick Jump Navigation Pills (for mobile and tablet) */}
          <div className="flex xl:hidden items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {tocItems.map((nav) => {
              const isActive = activeSection === nav.id;
              return (
                <button
                  key={nav.id}
                  onClick={() => scrollToSection(nav.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors tactile-btn whitespace-nowrap ${
                    isActive
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {nav.label}
                </button>
              );
            })}
          </div>

          {/* Right Actions: Dark/Light Mode Toggle & Direct CTA to High-Fidelity Annotation Lab */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Dark / Light Theme Toggle Button */}
            <button 
              onClick={() => {
                if (setIsDarkMode) {
                  setIsDarkMode(!isDarkMode);
                }
                playSound('toggle', !isDarkMode);
              }}
              aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xs flex items-center justify-center text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all hover:scale-105 active:scale-95 tactile-btn"
            >
              {isDarkMode ? (
                <Sun size={15} weight="bold" className="text-amber-400 hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon size={15} weight="bold" className="text-zinc-800 hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                playSound('pop', soundEnabled);
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                const targetUrl = isMobile 
                  ? `${labHost}/ps1/prototype`
                  : `${labHost}/high-fid-annotation-lab`;
                window.open(targetUrl, '_blank', 'noopener,noreferrer');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold text-xs transition-all shadow-sm hover:scale-105 active:scale-95 tactile-btn"
            >
              <span>Open Hi-Fi Lab</span>
              <ArrowSquareOut size={14} weight="bold" />
            </a>
          </div>
        </div>
      </nav>

      {/* Editorial Page Container - Centered composite layout with sticky TOC */}
      <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 xl:px-0 relative z-20 pt-4">
        <div className="xl:grid xl:grid-cols-[240px_1fr] xl:gap-10 relative">
          
          {/* Prachi-Inspired Sticky Side Navigation (Desktop >= 1280px) */}
          <aside className="hidden xl:block h-full">
            <div className="sticky top-28 space-y-6 pb-10">
              
              {/* Table of Contents - Scaled down so all words are fully visible */}
              <nav className="space-y-1.5" aria-label="Table of Contents">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold block mb-3">
                  Case Study
                </span>
                <div className="space-y-1">
                  {tocItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left flex items-start gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors tactile-btn ${
                          isActive
                            ? 'text-zinc-900 dark:text-white font-bold bg-zinc-100/80 dark:bg-zinc-800/60'
                            : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900/40'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full transition-all shrink-0 mt-1.5 ${
                          isActive ? 'bg-orange-500 scale-125' : 'bg-transparent'
                        }`} />
                        <span className="font-mono text-[11px] text-zinc-400 shrink-0 mt-0.5">{item.kicker}</span>
                        <span className="leading-snug">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </nav>

            </div>
          </aside>

          {/* Main Editorial Column */}
          <main className="max-w-4xl w-full space-y-4 relative z-20">
            
            {/* Section 0: Header & Survey Data Hub */}
            <div id="header-section">
              <CaseHeader onJumpToSection={scrollToSection} />
            </div>

            {/* ASCII Cityscape Hero Banner */}
            <div className="w-full py-10 border-b border-zinc-200 dark:border-zinc-800" data-reveal>
              <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm bg-black group">
                <img 
                  src="/illustrations/ascii-magic-111.png" 
                  alt="Bangalore City Architecture ASCII Art" 
                  className="w-full h-auto object-cover max-h-[380px] sm:max-h-[440px] transition-transform duration-700 group-hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Section 1 & 2: Starting Assumption, Survey Stats, and 4 Coping Tactics */}
            <div id="story-section">
              <PersonalStoryContext soundEnabled={soundEnabled} />
            </div>

            {/* Section 3 & 4: 7 Affinity Clusters, Scoping Boundary & 3 Problem Statements */}
            <div id="deductions-section">
              <InterviewDeductions 
                soundEnabled={soundEnabled} 
                onSelectSolvedPillar={handleSelectSolvedPillar}
              />
            </div>

            {/* Section 5: The 3 Solved Problem Statements */}
            <div id="projects-section">
              <ThreeProjectsInteractive 
                labHost={labHost} 
                soundEnabled={soundEnabled} 
                activeProject={activeProject}
                setActiveProject={setActiveProject}
              />
            </div>

            {/* Section 6: Honest Gaps, Assumptions & Master Lab CTA */}
            <div id="gaps-section">
              <ReflectionsAndGaps 
                labHost={labHost} 
                soundEnabled={soundEnabled} 
              />
            </div>

          </main>
        </div>
      </div>

      {/* Landing Page Footer - Shifted 50px down per user feedback */}
      <Footer 
        soundEnabled={soundEnabled} 
        onOpenContact={onOpenContact} 
        className="-mt-[270px] sm:-mt-[370px] md:-mt-[430px]" 
      />

      {/* Visual Feedback & AI Review directly active via Agentation during local development only */}
      {import.meta.env.DEV && <Agentation />}
    </div>
  );
};
