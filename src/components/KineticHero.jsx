import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, Copy, Check, CheckCircle } from '@phosphor-icons/react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { designerProfile } from '../data/portfolioData';
import { playSound } from '../utils/sound';
import { AsciiCanvas } from './AsciiCanvas';
import { InlineAsciiGlobe, InlineAsciiMorph } from './InlineAsciiBadge';

export const KineticHero = ({ soundEnabled, isDarkMode }) => {
  const [copied, setCopied] = useState(false);

  const workBtnRef = useRef(null);
  const copyBtnRef = useRef(null);

  // GSAP Magnetic Hover Physics for CTAs
  useEffect(() => {
    const setupMagnetic = (el) => {
      if (!el) return;
      const onMouseMove = (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        gsap.to(el, {
          x: x * 0.28,
          y: y * 0.28,
          scale: 1.03,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      const onMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: 'elastic.out(1.2, 0.4)'
        });
      };

      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);
      return () => {
        el.removeEventListener('mousemove', onMouseMove);
        el.removeEventListener('mouseleave', onMouseLeave);
      };
    };

    const cleanup1 = setupMagnetic(workBtnRef.current);
    const cleanup2 = setupMagnetic(copyBtnRef.current);

    return () => {
      if (cleanup1) cleanup1();
      if (cleanup2) cleanup2();
    };
  }, []);

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
      
      {/* Main Grid: Left Column Headline & Bio + Right Column 3D ASCII Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center my-auto">
        
        {/* Left 7 Columns: Status Badge, Headline with Inline Badges, Bio & Action Buttons */}
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

          {/* Master Headline (Option 2) with Bespoke Inline Animated ASCII Badges */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[54px] xl:text-[60px] font-sans font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.12] max-w-xl">
            Crafting <InlineAsciiGlobe soundEnabled={soundEnabled} /> <span className="font-serif italic font-normal text-orange-600 dark:text-orange-400">thoughtful,</span>
            <br />human-centered <InlineAsciiMorph soundEnabled={soundEnabled} />
            <br />products & brand
            <br />experiences.
          </h1>

          {/* Option 2 Bio Copy */}
          <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans max-w-lg">
            I’m <strong className="text-zinc-900 dark:text-white font-bold">{designerProfile.name}</strong> — a Bengaluru-based Graphic & UI/UX Designer. Specializing in scalable design systems, tactile web interactions, and distinctive brand identities.
          </p>

          {/* GSAP Magnetic Action CTAs */}
          <div className="pt-1 flex flex-wrap items-center gap-3">
            <a
              ref={workBtnRef}
              href="#work"
              onClick={() => playSound('whoosh', soundEnabled)}
              className="bg-zinc-900 dark:bg-white hover:bg-black dark:hover:bg-zinc-100 text-white dark:text-zinc-900 px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 transition-colors duration-200 group cursor-pointer"
            >
              <span>Explore Selected Work</span>
              <ArrowDown size={15} weight="bold" className="text-amber-400 dark:text-orange-500 group-hover:translate-y-1 transition-transform duration-200" />
            </a>

            <button
              ref={copyBtnRef}
              onClick={handleCopyEmail}
              aria-label="Copy Sumanth Reddy email to clipboard"
              className="bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 px-4 sm:px-5 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-2 transition-colors duration-200 cursor-pointer"
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
