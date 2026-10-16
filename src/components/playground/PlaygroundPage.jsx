import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowSquareOut, 
  Flask, 
  Sun,
  Moon,
  SpeakerHigh,
  SpeakerSlash,
  ArrowRight
} from '@phosphor-icons/react';
import { playSound } from '../../utils/sound';
import { GlobalAsciiBackground } from '../GlobalAsciiBackground';
import { Footer } from '../Footer';

export const PlaygroundPage = ({ 
  onBack, 
  soundEnabled, 
  setSoundEnabled, 
  isDarkMode, 
  setIsDarkMode, 
  onOpenContact,
  onNavigateToProject
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    playSound('pop', soundEnabled);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0C0C0E] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300 relative overflow-x-hidden">
      
      {/* Ambient Canvas Spotlight */}
      <GlobalAsciiBackground isDarkMode={isDarkMode} />

      {/* Top Floating Navigation Bar */}
      <header className="sticky top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 bg-white/85 dark:bg-[#0C0C0E]/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back to Home CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playSound('pop', soundEnabled);
                onBack();
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 transition-all group"
            >
              <ArrowLeft size={14} weight="bold" className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Portfolio</span>
            </button>

            <span className="hidden sm:inline-block text-zinc-300 dark:text-zinc-700">/</span>

            <div className="flex items-center gap-2">
              <Flask size={14} weight="bold" className="text-orange-500" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                AI Playground
              </span>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200 transition-colors"
            >
              {isDarkMode ? <Sun size={15} weight="bold" className="text-amber-400" /> : <Moon size={15} weight="bold" className="text-zinc-700" />}
            </button>

            {/* Audio Toggle */}
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

            {/* Contact Modal CTA */}
            <button
              onClick={() => {
                playSound('success', soundEnabled);
                onOpenContact();
              }}
              className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-zinc-100 px-4 py-2 rounded-full text-xs font-bold shadow-sm transition-all"
            >
              Collaborate
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-10 relative z-20">
        
        {/* Intro Section - Clean & Focused */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-mono font-bold">
            <Flask size={13} weight="bold" />
            <span>AI EXPERIMENTAL LAB</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.12]">
            Where agentic AI meets <span className="underline decoration-orange-500 decoration-wavy decoration-2 underline-offset-8">tactile craft</span>.
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            A curated space showcasing functional AI micro-products, conversational agents, and generative systems designed and developed from scratch in this harness.
          </p>
        </div>

        {/* Responsive Multi-Card Grid: Side-by-Side on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1: Flowsy */}
          <article className="bg-white dark:bg-[#121215] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 group">
            
            {/* Super Simple Image Thumbnail Only */}
            <div 
              onClick={() => onNavigateToProject('flowsy')}
              className="relative aspect-16/10 overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200/80 dark:border-zinc-800/80"
            >
              <img 
                src="/flowsy-thumbnail.png" 
                alt="Flowsy conversational AI application thumbnail"
                className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Content Space: Flowsy */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                  What’s the point of Flowsy?
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://talkflow-mvp.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('success', soundEnabled)}
                  className="flex-1 px-4 py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-zinc-100 text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-98"
                >
                  <span>Launch Live App</span>
                  <ArrowSquareOut size={14} weight="bold" />
                </a>

                <button
                  onClick={() => {
                    playSound('pop', soundEnabled);
                    onNavigateToProject('flowsy');
                  }}
                  className="px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-colors"
                >
                  Details
                </button>
              </div>
            </div>

          </article>

          {/* Card 2: NameGenius */}
          <article className="bg-white dark:bg-[#121215] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 group">
            
            {/* Super Simple Image Thumbnail Only */}
            <div 
              onClick={() => onNavigateToProject('namegenius')}
              className="relative aspect-16/10 overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200/80 dark:border-zinc-800/80"
            >
              <img 
                src="/namegenius-thumbnail.png" 
                alt="NameGenius domain generator application thumbnail"
                className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Content Space: Name Genius */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                  NameGenius
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Brand names you can actually own — verified live at the registry before you see them.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://namegenius-lilac.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('success', soundEnabled)}
                  className="flex-1 px-4 py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-zinc-100 text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-98"
                >
                  <span>Launch Live App</span>
                  <ArrowSquareOut size={14} weight="bold" />
                </a>

                <button
                  onClick={() => {
                    playSound('pop', soundEnabled);
                    onNavigateToProject('namegenius');
                  }}
                  className="px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-colors"
                >
                  Details
                </button>
              </div>
            </div>

          </article>

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
