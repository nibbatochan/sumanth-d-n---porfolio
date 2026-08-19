import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, Copy, Check, CheckCircle } from '@phosphor-icons/react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { designerProfile } from '../data/portfolioData';
import { playSound } from '../utils/sound';
import { AsciiCanvas } from './AsciiCanvas';
import { PixelFlower } from './PixelFlower';

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
      
      {/* Main Grid: Left Column Headline & Bio + Right Column 3D ASCII Canvas (Untouched) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center my-auto">
        
        {/* Left 7 Columns: Status Badge, Scaled Headline with Flower & Portrait Capsule, Bio & Lowered CTAs */}
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

          {/* Master Headline - Scaled-Up Flower & Scaled-Up Action Portrait Capsule */}
          <div className="space-y-1 text-zinc-900 dark:text-white select-none max-w-xl">
            
            {/* Line 1: 'Crafting thoughtful,' */}
            <div>
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[56px] font-sans font-bold tracking-tight">
                Crafting{' '}
              </span>
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[56px] font-serif italic font-normal text-orange-600 dark:text-orange-400">
                thoughtful,
              </span>
            </div>

            {/* Line 2: 'human-centered' + Scaled-Up Pixel Flower */}
            <div className="flex items-center flex-wrap gap-1 sm:gap-2">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[56px] font-serif italic font-normal text-orange-600 dark:text-orange-400 leading-none">
                human-centered
              </span>
              <PixelFlower 
                isDarkMode={isDarkMode}
                soundEnabled={soundEnabled} 
                className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 ml-2 sm:ml-3 -translate-y-0.5 sm:-translate-y-1 drop-shadow-xs" 
              />
            </div>

            {/* Line 3: Scaled-Up Action Portrait Capsule + 'products &' */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap pt-1 sm:pt-1.5">
              <span 
                onMouseEnter={() => playSound('pop', soundEnabled)}
                title="Sumanth D N — Hover to reveal"
                className="inline-flex items-center justify-center rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-md backdrop-blur-xs hover:border-orange-500 hover:shadow-orange-500/20 transition-all duration-300 select-none cursor-pointer h-10 sm:h-12 md:h-14 lg:h-15 w-26 sm:w-34 md:w-40 lg:w-44 shrink-0 group self-center bg-black"
              >
                {/* Smooth pan from Face on right to Hand on left */}
                <img 
                  src="/sumanth-pixel-action.png" 
                  alt="Sumanth D N Pixel Portrait" 
                  className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] object-[84%_center] group-hover:object-[8%_center] group-hover:scale-105"
                />
              </span>
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[56px] font-sans font-bold tracking-tight leading-none self-center">
                products &
              </span>
            </div>

            {/* Line 4: 'brand experiences.' */}
            <div className="pt-0.5 sm:pt-1">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[58px] font-sans font-bold tracking-tight text-zinc-900 dark:text-white leading-none">
                brand experiences.
              </span>
            </div>

          </div>

          {/* Bio Copy */}
          <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans max-w-lg pt-1">
            I’m <strong className="text-zinc-900 dark:text-white font-bold">{designerProfile.name}</strong> — a Bengaluru-based Graphic & UI/UX Designer. Specializing in scalable design systems, tactile web interactions, and distinctive brand identities.
          </p>

          {/* GSAP Magnetic Action CTAs */}
          <div className="pt-10 sm:pt-12 md:pt-[50px] flex flex-wrap items-center gap-3">
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

        {/* Right 5 Columns: 3D ASCII Flying Dove Canvas (100% Untouched) */}
        <div className="lg:col-span-5 flex items-center justify-center relative select-none w-full">
          <AsciiCanvas soundEnabled={soundEnabled} isDarkMode={isDarkMode} />
        </div>

      </div>

    </section>
  );
};
