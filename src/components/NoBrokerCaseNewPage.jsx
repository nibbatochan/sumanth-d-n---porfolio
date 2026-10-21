import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowSquareOut, Sun, Moon, DotsThreeVertical, X, CaretRight } from '@phosphor-icons/react';
import { playSound } from '../utils/sound';
import { GlobalAsciiBackground } from './GlobalAsciiBackground';

// Modular Sections
import { CaseHeader } from './nobroker-new/CaseHeader';
import { PersonalStoryContext } from './nobroker-new/PersonalStoryContext';
import { InterviewDeductions } from './nobroker-new/InterviewDeductions';
import { ThreeProjectsInteractive } from './nobroker-new/ThreeProjectsInteractive';
import { ValidationSection } from './nobroker-new/ValidationSection';
import { MetricsFramework } from './nobroker-new/MetricsFramework';
import { Footer } from './Footer';
import { initScrollReveals } from '../utils/motion';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThankYou } from './nobroker-new/ThankYou';
import { setLenis, getLenis } from './nobroker-new/lenisStore';

export const NoBrokerCaseNewPage = ({ onBack, soundEnabled, onOpenContact, isDarkMode, setIsDarkMode }) => {
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
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const containerRef = useRef(null);

  // Close mobile TOC menu on Escape key or desktop resize
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileTocOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileTocOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const tocItems = [
    { id: 'header-section', label: 'Overview', kicker: 'Intro' },
    { id: 'story-section', label: 'Assumption & Discovery', kicker: '01–02' },
    { id: 'deductions-section', label: '7 Clusters', kicker: '03' },
    { id: 'projects-section', label: '3 Solved Pillars', kicker: '04' },
    { id: 'metrics-section', label: 'Goals & Metrics Framework', kicker: '05' },
    { id: 'validation-section', label: 'Validation & Results', kicker: '06' },
    { id: 'next-steps-section', label: 'Learnings', kicker: '07' },
    { id: 'prototype-section', label: 'Interactive Prototypes', kicker: 'Lab' },
  ];

  // Lenis smooth scroll on the case study's own scroll container
  useEffect(() => {
    const wrapper = containerRef.current?.closest('.overflow-y-auto');
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!wrapper || reduce) return undefined;
    const lenis = new Lenis({
      wrapper,
      content: containerRef.current,
      duration: 1.1,
      easing: (x) => 1 - Math.pow(1 - x, 4),
      autoRaf: true
    });
    lenis.on('scroll', () => ScrollTrigger.update());
    setLenis(lenis);
    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

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
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(targetEl, { offset: -offset });
      return;
    }
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
    setMobileTocOpen(false);
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
      className="min-h-screen bg-[#FAF9F6] dark:bg-[#09090B] text-zinc-900 dark:text-zinc-100 selection:bg-orange-500 selection:text-white antialiased relative font-sans transition-colors duration-300"
    >
      {/* Global Ambient '+' Grid Hover Spotlight across the entire case study page */}
      <GlobalAsciiBackground isDarkMode={isDarkMode} fullPage={true} />

      {/* Floating Top Bar (Sticky Navigation & Back Button) */}
      <nav className="sticky top-0 z-50 bg-[#FAF9F6]/90 dark:bg-[#09090B]/90 backdrop-blur-xl border-b border-zinc-200/90 dark:border-zinc-800 px-3 sm:px-6 xl:px-0 py-2.5 sm:py-3 transition-all">
        <div className="max-w-[1240px] w-full mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left Action: Back to Portfolio with responsive shrink text */}
          <button
            onClick={() => {
              playSound('pop', soundEnabled);
              onBack ? onBack() : (window.location.hash = '');
            }}
            title="Back to Portfolio"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 transition-all hover:scale-105 active:scale-95 tactile-btn shrink-0"
          >
            <ArrowLeft size={14} weight="bold" />
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="inline sm:hidden text-xs">Back</span>
          </button>

          {/* Mobile Center: Sleek Three-Dot / Section Selector Pill */}
          <div className="flex md:hidden items-center shrink-0">
            <button
              onClick={() => {
                setMobileTocOpen(prev => !prev);
                playSound('pop', soundEnabled);
              }}
              aria-label="Jump to Case Study Section"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold border transition-all ${
                mobileTocOpen
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-transparent shadow-sm'
                  : 'bg-zinc-100/90 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 shadow-xs'
              }`}
            >
              <span className="truncate max-w-[95px] sm:max-w-[120px] text-[11px] font-sans">
                {tocItems.find(t => t.id === activeSection)?.label || 'Sections'}
              </span>
              {mobileTocOpen ? (
                <X size={14} weight="bold" className="text-orange-500 shrink-0" />
              ) : (
                <DotsThreeVertical size={16} weight="bold" className="text-orange-500 shrink-0" />
              )}
            </button>
          </div>

          {/* Tablet Jump Navigation Pills (hidden on mobile, hidden on desktop XL which has sidebar) */}
          <div className="hidden md:flex xl:hidden flex-1 min-w-0 items-center gap-1.5 overflow-x-auto no-scrollbar py-1 mask-linear-fade">
            {tocItems.map((nav) => {
              const isActive = activeSection === nav.id;
              return (
                <button
                  key={nav.id}
                  onClick={() => scrollToSection(nav.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors tactile-btn whitespace-nowrap shrink-0 ${
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
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
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
                <Sun size={14} weight="bold" className="text-amber-400 sm:w-[15px] sm:h-[15px] hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon size={14} weight="bold" className="text-zinc-800 sm:w-[15px] sm:h-[15px] hover:-rotate-12 transition-transform duration-300" />
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
              title="Open High-Fidelity Prototype Lab"
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold text-xs transition-all shadow-sm hover:scale-105 active:scale-95 tactile-btn"
            >
              <span className="hidden sm:inline">Open Hi-Fi Lab</span>
              <span className="inline sm:hidden">Lab</span>
              <ArrowSquareOut size={13} weight="bold" className="sm:w-[14px] sm:h-[14px]" />
            </a>
          </div>
        </div>

        {/* Mobile Dropdown Drawer for Section Navigation */}
        {mobileTocOpen && (
          <div className="md:hidden mt-2.5 max-w-[1240px] mx-auto bg-white/95 dark:bg-[#121216]/95 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 shadow-2xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/80 px-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold">
                Jump to Case Study Section
              </span>
              <button
                onClick={() => setMobileTocOpen(false)}
                className="text-[11px] font-mono text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 flex items-center gap-1"
              >
                <span>Close</span>
                <X size={12} weight="bold" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-1 max-h-[60vh] overflow-y-auto py-1">
              {tocItems.map((nav) => {
                const isActive = activeSection === nav.id;
                return (
                  <button
                    key={nav.id}
                    onClick={() => scrollToSection(nav.id)}
                    className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-medium flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-orange-500 text-white font-bold'
                          : 'bg-zinc-200/70 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                      }`}>
                        {nav.kicker}
                      </span>
                      <span className="truncate">{nav.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
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

            {/* Section 5: Goals & Metric Framework, after the pillars */}
            <div id="metrics-section">
              <MetricsFramework />
            </div>

            {/* Sections 6, 7 & 8: Validation, Learnings & Next Iterations */}
            <ValidationSection soundEnabled={soundEnabled} />

            {/* Closing Master Prototype Lab CTA Container */}
            <div id="prototype-section" className="py-12 relative">
              <div data-reveal className="w-full max-w-4xl mx-auto p-8 sm:p-12 rounded-4xl bg-gradient-to-b from-white/95 to-zinc-50/90 dark:from-[#151519]/95 dark:to-[#0F0F12]/95 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl text-center relative z-30 space-y-4 overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-orange-500/[0.08] via-orange-500/[0.02] to-transparent pointer-events-none -z-0" />

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold bg-orange-500/10 border border-orange-500/20">
                  <CaretRight size={14} weight="bold" />
                  <span>Interactive Demos Ready</span>
                </div>

                <h3 className="text-xl sm:text-3xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight">
                  Explore the Interactive Prototypes
                </h3>

                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed">
                  The real interactions live in the lab. Try each redesign with realistic Bangalore data.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (soundEnabled) playSound('pop');
                      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                      const targetUrl = isMobile 
                        ? `${labHost}/ps1/prototype`
                        : labHost;
                      window.open(targetUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="px-6 py-3 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 transition-all hover:scale-105 active:scale-95 tactile-btn"
                  >
                    <span>Open All 3 Lab Prototypes</span>
                    <ArrowSquareOut size={16} weight="bold" />
                  </a>
                </div>
              </div>
            </div>



            <ThankYou />

          </main>
        </div>
      </div>

      {/* Landing Page Footer - Shifted 50px down per user feedback */}
      <Footer 
        fadeFrom="from-[#FAF9F6]"
        soundEnabled={soundEnabled} 
        onOpenContact={onOpenContact} 
        className="-mt-[270px] sm:-mt-[370px] md:-mt-[430px]" 
      />
    </div>
  );
};
