import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowSquareOut, 
  Sparkle, 
  Globe, 
  Cpu, 
  ShieldCheck, 
  Sun, 
  Moon, 
  SpeakerHigh, 
  SpeakerSlash, 
  CheckCircle, 
  GameController, 
  Flame, 
  Bookmarks, 
  LinkSimpleHorizontal,
  Compass
} from '@phosphor-icons/react';
import { playSound } from '../../utils/sound';
import { GlobalAsciiBackground } from '../GlobalAsciiBackground';
import { Footer } from '../Footer';

export const NameGeniusSubPage = ({ 
  onBack, 
  soundEnabled, 
  setSoundEnabled, 
  isDarkMode, 
  setIsDarkMode, 
  onOpenContact 
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    playSound('pop', soundEnabled);
  };

  const liveUrl = "https://namegenius-lilac.vercel.app";

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0C0C0E] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300 relative overflow-x-hidden">
      
      {/* Ambient Spotlight Background */}
      <GlobalAsciiBackground isDarkMode={isDarkMode} />

      {/* Top Floating Navigation */}
      <header className="sticky top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 bg-white/85 dark:bg-[#0C0C0E]/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 transition-all">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          
          {/* Breadcrumbs & Back */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                playSound('pop', soundEnabled);
                onBack();
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 transition-all group"
            >
              <ArrowLeft size={14} weight="bold" className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Playground</span>
            </button>

            <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">/</span>

            <span className="text-xs font-mono font-semibold text-zinc-500 hidden sm:inline">
              NameGenius System Spec
            </span>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            <button 
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200 transition-colors"
            >
              {isDarkMode ? <Sun size={15} weight="bold" className="text-amber-400" /> : <Moon size={15} weight="bold" className="text-zinc-700" />}
            </button>

            {setSoundEnabled && (
              <button 
                onClick={() => {
                  const next = !soundEnabled;
                  setSoundEnabled(next);
                  playSound('toggle', next);
                }}
                aria-label="Toggle audio"
                className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200 transition-colors"
              >
                {soundEnabled ? <SpeakerHigh size={15} weight="bold" className="text-orange-500" /> : <SpeakerSlash size={15} weight="bold" className="text-zinc-400" />}
              </button>
            )}

            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('success', soundEnabled)}
              className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
            >
              <span>Launch NameGenius</span>
              <ArrowSquareOut size={13} weight="bold" />
            </a>
          </div>

        </div>
      </header>

      {/* Main Content Article */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-16 relative z-20">
        
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-mono font-bold">
            <Sparkle size={13} weight="fill" />
            <span>TACTILE WEB ENGINE // HARNESS BUILT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            NameGenius
          </h1>

          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
            Brand names you can actually own — verified live at the registry before you see them.
          </p>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Built entirely in this harness, NameGenius dismantles the frustrating loop between generative AI tools and domain registrars. It integrates real-time IANA RDAP protocol verification with a tactile, retro-styled NG-01 pocket game console aesthetic, complete with Vedic nakshatra-pada derivation algorithms for India-first founders.
          </p>
        </div>

        {/* Live Mockup Presentation Card */}
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121215] shadow-xl overflow-hidden space-y-0">
          
          {/* Window Chrome Header */}
          <div className="px-4 py-3 bg-zinc-100 dark:bg-[#0E0E11] border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
            </div>

            <div className="px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>namegenius-lilac.vercel.app</span>
            </div>

            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
            >
              <span>Visit</span>
              <ArrowSquareOut size={12} weight="bold" />
            </a>
          </div>

          {/* High-Res Interactive Thumbnail Frame */}
          <div className="relative group overflow-hidden">
            <img 
              src="/namegenius-thumbnail.png" 
              alt="NameGenius tactile domain generator application screen"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('success', soundEnabled)}
                className="px-5 py-2.5 rounded-full bg-white text-zinc-900 text-xs font-bold shadow-xl flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <span>Launch Live Web Application</span>
                <ArrowSquareOut size={14} weight="bold" />
              </a>
            </div>
          </div>

          {/* Technical Spec Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 bg-zinc-50/50 dark:bg-zinc-900/40 border-t border-zinc-200 dark:border-zinc-800">
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">Registry Protocol</span>
              <span className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 block">Direct IANA RDAP Bootstrap</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">Verification Model</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">4 States (0 False Positives)</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">Interactive Hardware</span>
              <span className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 block">NG-01 Tactile Game Console</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">Cultural Algorithm</span>
              <span className="text-xs sm:text-sm font-bold text-orange-600 dark:text-orange-400 mt-0.5 block">Avakahada Chakra Vastu</span>
            </div>
          </div>

        </div>

        {/* Section 1: The Broken Loop */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
            <span>01 // The Friction</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            The Broken Registry Loop in domain naming
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Founders naming a company or product waste days trapped between two broken extremes:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold shrink-0">•</span>
              <span><strong>AI Generators:</strong> Produce hundreds of poetic names that are almost universally taken or squatted by domain brokers demanding $5,000+.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold shrink-0">•</span>
              <span><strong>Domain Registrars:</strong> Know domain availability instantly, but know zero context about your brand, competitors, or target audience.</span>
            </li>
          </ul>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            NameGenius solves this by <strong>generating 5x the candidate pool and verifying every single domain against live registry endpoints</strong> before showing it to the user. If a name appears on screen, it is 100% available to register right now.
          </p>
        </section>

        {/* Section 2: Core Engineering Pillars */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
            <span>02 // Architectural Breakthroughs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            How NameGenius delivers verified results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <Globe size={20} weight="bold" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Generate-Then-Verify Pipeline
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Rather than checking names on click, NameGenius synthesizes candidate trees across prefixes, suffixes, and blends, and batch-checks them concurrently over native RDAP.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <ShieldCheck size={20} weight="bold" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Strict 4-State Honesty Model
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Every domain has 4 states: Available, Taken, Reserved, and Could-Not-Verify. When a registry rate-limits, NameGenius never rounds up to "available".
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <GameController size={20} weight="bold" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Tactile NG-01 Handheld Console
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                A love letter to physical hardware. Designed like a chunky retro handheld device with physical audio clickers, glowing CRT scanlines, and pixel-art mini games.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <Compass size={20} weight="bold" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Vedic & Vastu Compliance Mode
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                A dedicated flow mapping 108 nakshatra-pada syllables from the Avakahada Chakra, planetary element chains, and two-syllable firmness rules for India-first founders.
              </p>
            </div>

          </div>
        </section>

        {/* Section 3: URL Derive & Smart Inputs */}
        <section className="p-6 sm:p-8 rounded-3xl bg-zinc-100 dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="flex items-center gap-2">
            <LinkSimpleHorizontal size={18} weight="bold" className="text-orange-500" />
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
              URL Derive & SSRF Security Protection
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            NameGenius allows founders to paste competitor landing page URLs to auto-extract brand positioning and keyword seeds. The backend is protected by a strict SSRF guard that blocks private/loopback IP ranges, caps redirects, and enforces response bounds before tokenization.
          </p>
        </section>

        {/* Final Launch Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-900/40 via-zinc-900 to-black text-white border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold">Try NameGenius in your browser</h4>
            <p className="text-xs text-zinc-300">Play with the NG-01 console and verify available brand domains in real time.</p>
          </div>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('success', soundEnabled)}
            className="px-6 py-3 rounded-full bg-white text-zinc-950 font-bold text-xs hover:bg-zinc-200 transition-all flex items-center gap-2 shrink-0 shadow-lg"
          >
            <span>Launch Live App</span>
            <ArrowSquareOut size={14} weight="bold" />
          </a>
        </div>

      </main>

      {/* Footer */}
      <Footer 
        soundEnabled={soundEnabled}
        onOpenContact={onOpenContact}
      />

    </div>
  );
};
