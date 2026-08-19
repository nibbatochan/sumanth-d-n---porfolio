import React, { useState } from 'react';
import { ArrowDown, Copy, Check, CheckCircle, Sparkle } from '@phosphor-icons/react';
import confetti from 'canvas-confetti';
import { designerProfile } from '../data/portfolioData';
import { playSound } from '../utils/sound';
import { AsciiCanvas } from './AsciiCanvas';

export const KineticHero = ({ soundEnabled, isDarkMode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(designerProfile.email);
    setCopied(true);
    playSound('success', soundEnabled);

    confetti({
      particleCount: 48,
      spread: 65,
      origin: { y: 0.75 },
      colors: ['#EA580C', '#F59E0B', '#10B981', '#38BDF8']
    });

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="home" className="min-h-[auto] lg:min-h-[calc(100vh-140px)] flex flex-col justify-center pt-14 sm:pt-16 pb-2 sm:pb-3 px-4 sm:px-8 max-w-6xl mx-auto relative z-10">
      
      {/* Main Grid: Left Column Editorial Headline & Bio + Right Column 3D ASCII Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center my-auto">
        
        {/* Left 7 Columns: Status Badge, Typographic Headline, Bio & Action Buttons */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
          
          {/* Availability Status Badge with Pulse Indicator */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs text-xs text-zinc-700 dark:text-zinc-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5 text-xs">
                <CheckCircle size={14} weight="fill" className="text-emerald-500" />
                <span>{designerProfile.status}</span>
              </span>
            </div>
          </div>

          {/* Master Typographic Headline - Impeccable Typeset with Serif Accent */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[54px] xl:text-[60px] font-sans font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.05] max-w-xl">
            Designing <span className="font-serif italic font-normal text-orange-600 dark:text-orange-400">warm,</span>
            <br />minimal digital
            <br />products & visual
            <br />identities.
          </h1>

          {/* Impeccable Enhanced Bio Copy - Clear Value Proposition & Craftsmanship */}
          <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans max-w-lg">
            I’m <strong className="text-zinc-900 dark:text-white font-bold">{designerProfile.name}</strong> — a Graphic & UI/UX Designer based in Bengaluru. Crafting human-scale digital products, tokenized design systems, and tactile brand experiences.
          </p>

          {/* Action CTAs with Tactile Feedback & Eased Motion Physics */}
          <div className="pt-1 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              onClick={() => playSound('whoosh', soundEnabled)}
              className="bg-zinc-900 dark:bg-white hover:bg-black dark:hover:bg-zinc-100 text-white dark:text-zinc-900 px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-sm flex items-center gap-2 tactile-btn transition-all duration-200 group"
            >
              <span>Explore Selected Work</span>
              <ArrowDown size={15} weight="bold" className="text-amber-400 dark:text-orange-500 group-hover:translate-y-0.5 transition-transform duration-200" />
            </a>

            <button
              onClick={handleCopyEmail}
              aria-label="Copy Sumanth Reddy email to clipboard"
              className="bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 px-4 sm:px-5 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-2 tactile-btn transition-all duration-200"
            >
              {copied ? (
                <>
                  <Check size={15} weight="bold" className="text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy size={15} weight="bold" className="text-zinc-500 dark:text-zinc-400" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Right 5 Columns: Grand-Scale 3D ASCII Dove with Laser Tracers & Palette Shuffle */}
        <div className="lg:col-span-5 flex items-center justify-center relative select-none w-full">
          <AsciiCanvas soundEnabled={soundEnabled} isDarkMode={isDarkMode} />
        </div>

      </div>

    </section>
  );
};
