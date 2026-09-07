import React, { useEffect, useRef } from 'react';
import { Sparkle } from '@phosphor-icons/react';
import { splitWords, animateHeaderLoad } from '../../utils/motion';

export const CaseHeader = ({ onJumpToSection }) => {
  const headerRef = useRef(null);

  useEffect(() => {
    const anim = animateHeaderLoad(headerRef.current);
    return () => {
      if (anim && anim.kill) anim.kill();
    };
  }, []);

  const line1Text = "NoBroker Rental Research:";
  const line2Text = "Ending the Flow Break";

  return (
    <header ref={headerRef} className="pt-8 pb-12 border-b border-zinc-200 dark:border-zinc-800 relative space-y-8">
      {/* Top Editorial Kicker */}
      <div className="header-kicker flex flex-wrap items-center gap-2 will-change-transform">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold">
          <Sparkle size={14} weight="fill" />
          <span>Personal Project · 2026</span>
        </div>
        <span className="text-zinc-300 dark:text-zinc-700 font-mono">/</span>
        <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          Self-Initiated Product Exploration · B2C Rental Journey
        </span>
      </div>

      {/* Main Title & Editorial Elevator Pitch - Shifted 20px down via pt-5 */}
      <div className="max-w-4xl space-y-5 pt-5">
        {/* NoBroker Logo with Dark Mode support */}
        <div className="header-logo pt-2 will-change-transform">
          <img 
            src="/nb_logo_dark.svg" 
            alt="NoBroker Logo" 
            className="hidden dark:block h-8 sm:h-10 md:h-11 w-auto object-contain" 
          />
          <img 
            src="/nb_logo.svg" 
            alt="NoBroker Logo" 
            className="block dark:hidden h-8 sm:h-10 md:h-11 w-auto object-contain" 
          />
        </div>

        {/* Word Load Animation on H1: First Line White, Second Line Orange */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-sans tracking-tight leading-[1.25]">
          <span className="block text-zinc-900 dark:text-white mb-1 pb-0.5">
            {splitWords(line1Text, "header-title-word text-zinc-900 dark:text-white")}
          </span>
          <span className="block text-orange-600 dark:text-orange-500 pb-1">
            {splitWords(line2Text, "header-title-word text-orange-600 dark:text-orange-500")}
          </span>
        </h1>
        
        {/* Clean Natural Paragraph with Smooth Motion */}
        <p className="header-desc text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed will-change-transform">
          How a simple search filter project led to a bigger discovery: <strong className="font-semibold text-zinc-900 dark:text-white">renters abandon their search when the app breaks their flow</strong>. Here is how I redesigned NoBroker to show <strong className="font-semibold text-zinc-900 dark:text-white">real rush-hour commute times</strong>, <strong className="font-semibold text-zinc-900 dark:text-white">verified photos</strong>, and <strong className="font-semibold text-zinc-900 dark:text-white">calm alerts</strong> without forcing renters to jump to Google Maps or deal with notification spam.
        </p>

        {/* Editorial Metadata Grid with Identical Spacing & Clean Typography */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="header-meta-col flex flex-col space-y-1 will-change-transform">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold block">Role</span>
            <p className="text-sm font-bold font-sans text-zinc-900 dark:text-white leading-tight">Product Designer</p>
            <span className="text-xs font-sans text-zinc-500 dark:text-zinc-400 leading-snug block">Personal Exploration</span>
          </div>
          <div className="header-meta-col flex flex-col space-y-1 will-change-transform">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold block">Timeline</span>
            <p className="text-sm font-bold font-sans text-zinc-900 dark:text-white leading-tight">3 Months</p>
            <span className="text-xs font-sans text-zinc-500 dark:text-zinc-400 leading-snug block">Jun – Aug 2026</span>
          </div>
          <div className="header-meta-col flex flex-col space-y-1 will-change-transform">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold block">Scope</span>
            <p className="text-sm font-bold font-sans text-zinc-900 dark:text-white leading-tight">End-to-End Product</p>
            <span className="text-xs font-sans text-zinc-500 dark:text-zinc-400 leading-snug block">Research, Spec & UI</span>
          </div>
          <div className="header-meta-col flex flex-col space-y-1 will-change-transform">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold block">Audience</span>
            <p className="text-sm font-bold font-sans text-zinc-900 dark:text-white leading-tight">Budget Renters</p>
            <span className="text-xs font-sans text-zinc-500 dark:text-zinc-400 leading-snug block">Metropolitan Cities</span>
          </div>
        </div>

        {/* Tech Arsenal: Pure logos with uniform optical sizing and no container backgrounds */}
        <div className="header-meta-col pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 will-change-transform">
          <div className="flex flex-col space-y-0.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold block">
              Tech Arsenal
            </span>
            <span className="text-xs font-sans text-zinc-500 dark:text-zinc-400">
              Tools used for research, spec, design & prototype
            </span>
          </div>

          <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
            {/* Google Antigravity */}
            <div className="flex items-center h-7" title="Google Antigravity">
              <img 
                src="/illustrations/logos/antigravity.png" 
                alt="Google Antigravity" 
                className="h-6 sm:h-7 w-auto object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* Cursor */}
            <div className="flex items-center h-7" title="Cursor">
              <img 
                src="/illustrations/logos/cursor-dark.png" 
                alt="Cursor" 
                className="h-5 sm:h-6 w-auto object-contain hidden dark:block transition-transform duration-300 hover:scale-105"
              />
              <img 
                src="/illustrations/logos/cursor-light.png" 
                alt="Cursor" 
                className="h-5 sm:h-6 w-auto object-contain block dark:hidden transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Figma */}
            <div className="flex items-center h-7" title="Figma">
              <img 
                src="/illustrations/logos/figma-dark.png" 
                alt="Figma" 
                className="h-5 sm:h-6 w-auto object-contain hidden dark:block transition-transform duration-300 hover:scale-105"
              />
              <img 
                src="/illustrations/logos/figma-light.png" 
                alt="Figma" 
                className="h-5 sm:h-6 w-auto object-contain block dark:hidden transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Red Tool Icon */}
            <div className="flex items-center h-7" title="Tool Icon">
              <img 
                src="/illustrations/logos/icon.png" 
                alt="Tool" 
                className="h-6 sm:h-7 w-auto object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* Vercel */}
            <div className="flex items-center h-7" title="Vercel">
              <img 
                src="/illustrations/logos/vercel.png" 
                alt="Vercel" 
                className="h-6 sm:h-7 w-auto object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
