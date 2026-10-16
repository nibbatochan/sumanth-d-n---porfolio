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

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0C0C0E] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300 relative overflow-x-hidden">
      
      {/* Ambient Canvas Spotlight */}
      <GlobalAsciiBackground isDarkMode={isDarkMode} />

      {/* Top Floating Navigation Bar */}
      <header className="sticky top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 bg-white/85 dark:bg-[#0C0C0E]/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10 relative z-20">
        
        {/* Intro Section - Engaging, punchy & tag removed */}
        <div className="space-y-3 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.12]">
            Experiments built to be touched, <span className="underline decoration-orange-500 decoration-wavy decoration-2 underline-offset-8">not pitched</span>.
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Functional micro-apps and conversational agents crafted from scratch in this harness. Shipped live on Vercel—tap in, play around, and test the edges.
          </p>
        </div>

        {/* 3-Column Grid: Three Cards per Row on the Same Line */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Flowsy */}
          <article className="bg-white dark:bg-[#121215] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 group">
            
            {/* Simple Image Thumbnail */}
            <a 
              href="https://talkflow-mvp.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('pop', soundEnabled)}
              className="relative aspect-16/10 overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200/80 dark:border-zinc-800/80 block"
            >
              <img 
                src="/flowsy-thumbnail.png" 
                alt="Flowsy conversational AI application thumbnail"
                className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                loading="lazy"
              />
            </a>

            {/* Content Space: Flowsy */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-1.5">
                <h2 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">
                  Flowsy
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  Make better small talk — practice real-time conversations with an empathetic ASCII AI companion.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href="https://talkflow-mvp.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('success', soundEnabled)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-zinc-100 text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-98"
                >
                  <span>Launch Live App</span>
                  <ArrowSquareOut size={14} weight="bold" />
                </a>
              </div>
            </div>

          </article>

          {/* Card 2: NameGenius */}
          <article className="bg-white dark:bg-[#121215] rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 group">
            
            {/* Simple Image Thumbnail */}
            <a 
              href="https://namegenius-lilac.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('pop', soundEnabled)}
              className="relative aspect-16/10 overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200/80 dark:border-zinc-800/80 block"
            >
              <img 
                src="/namegenius-thumbnail.png" 
                alt="NameGenius domain generator application thumbnail"
                className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                loading="lazy"
              />
            </a>

            {/* Content Space: Name Genius */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-1.5">
                <h2 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">
                  NameGenius
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  Brand names you can actually own — verified live at the registry before you see them.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href="https://namegenius-lilac.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('success', soundEnabled)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-zinc-100 text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-98"
                >
                  <span>Launch Live App</span>
                  <ArrowSquareOut size={14} weight="bold" />
                </a>
              </div>
            </div>

          </article>

          {/* Card 3: In the Works / Slot 3 */}
          <article className="bg-white/60 dark:bg-[#121215]/60 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800/90 shadow-2xs overflow-hidden flex flex-col justify-between transition-all duration-300">
            
            {/* Placeholder Thumbnail Header */}
            <div className="relative aspect-16/10 bg-zinc-100/70 dark:bg-zinc-900/40 border-b border-dashed border-zinc-200 dark:border-zinc-800/80 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-10 h-10 rounded-2xl bg-zinc-200/70 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 mb-2">
                <Flask size={20} weight="duotone" />
              </div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Slot 03 // Next Build
              </span>
            </div>

            {/* Content Space */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-1.5">
                <h2 className="text-xl font-black text-zinc-400 dark:text-zinc-500 tracking-tight">
                  Coming Soon
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 leading-relaxed font-normal">
                  Next experimental AI project in active development. Deploying shortly.
                </p>
              </div>

              {/* Placeholder CTA */}
              <div className="pt-2">
                <div className="w-full px-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-600 text-xs font-bold flex items-center justify-center gap-2 select-none border border-zinc-200/50 dark:border-zinc-800/50">
                  <span>In Development</span>
                </div>
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
