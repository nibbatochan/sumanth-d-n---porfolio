import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Copy, Check, CheckCircle } from '@phosphor-icons/react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { designerProfile } from '../data/portfolioData';
import { playSound } from '../utils/sound';
import { AsciiCanvas } from './AsciiCanvas';

export const KineticHero = ({ soundEnabled, isDarkMode }) => {
  const [copied, setCopied] = useState(false);
  
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleContainerRef = useRef(null);
  const bioRef = useRef(null);
  const ctaRef = useRef(null);
  const timelineRef = useRef(null);

  const headlineWords = [
    { text: 'Designing', isItalic: false, isAccent: false },
    { text: 'warm,', isItalic: true, isAccent: true },
    { text: 'minimal', isItalic: false, isAccent: false },
    { text: 'digital', isItalic: false, isAccent: false },
    { text: 'products', isItalic: false, isAccent: false },
    { text: '&', isItalic: false, isAccent: false },
    { text: 'visual', isItalic: false, isAccent: false },
    { text: 'identities.', isItalic: false, isAccent: false },
  ];

  useEffect(() => {
    if (!heroRef.current) return;

    const words = titleContainerRef.current?.querySelectorAll('.gsap-word-inner');
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    timelineRef.current = tl;

    if (badgeRef.current) {
      tl.from(badgeRef.current, {
        opacity: 0,
        y: 15,
        scale: 0.92,
        duration: 0.6,
        ease: 'back.out(1.5)',
      });
    }

    if (words && words.length > 0) {
      tl.from(
        words,
        {
          opacity: 0,
          y: 25,
          filter: 'blur(10px)',
          scale: 0.96,
          duration: 0.85,
          stagger: 0.045,
          ease: 'power3.out',
        },
        '-=0.25'
      );
    }

    if (bioRef.current) {
      tl.from(
        bioRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.35'
      );
    }

    if (ctaRef.current?.children) {
      tl.from(
        ctaRef.current.children,
        {
          opacity: 0,
          y: 15,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
        },
        '-=0.35'
      );
    }

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(designerProfile.email);
    setCopied(true);
    playSound('success', soundEnabled);

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#EA580C', '#F59E0B', '#10B981', '#38BDF8']
    });

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section ref={heroRef} id="home" className="pt-28 sm:pt-36 pb-12 px-4 sm:px-8 max-w-6xl mx-auto space-y-8 relative z-10">
      
      {/* Main Grid: Left Column Headline + Right Column 3D ASCII Dove */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left 7 Columns: Availability Badge, Headline, Bio & Action Buttons */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          
          {/* Availability Status Badge */}
          <div ref={badgeRef}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm text-xs text-zinc-700 dark:text-zinc-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5 text-xs">
                <CheckCircle size={14} weight="fill" className="text-emerald-500" />
                <span>{designerProfile.status}</span>
              </span>
            </div>
          </div>

          {/* GSAP Soft Deblur Responsive Headline */}
          <h1
            ref={titleContainerRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-sans font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.08] max-w-xl"
          >
            {headlineWords.map((word, idx) => (
              <span
                key={idx}
                className="inline-block mr-[0.24em] align-top"
              >
                <span
                  className={`gsap-word-inner inline-block ${
                    word.isAccent
                      ? 'font-serif italic font-normal text-orange-600 dark:text-orange-400'
                      : ''
                  }`}
                >
                  {word.text}
                </span>
              </span>
            ))}
          </h1>

          {/* Intro Bio */}
          <p ref={bioRef} className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans max-w-xl">
            Hey, I’m <strong className="text-zinc-900 dark:text-white font-bold">{designerProfile.name}</strong> — a Graphic & UI/UX Designer based in Bengaluru. Crafting tactile, human-scale digital interfaces and brand identities.
          </p>

          {/* Action CTAs */}
          <div ref={ctaRef} className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              onClick={() => playSound('whoosh', soundEnabled)}
              className="bg-zinc-900 dark:bg-white hover:bg-black dark:hover:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-sm flex items-center gap-2 tactile-btn transition-all group"
            >
              <span>Explore Selected Work</span>
              <ArrowDown size={15} weight="bold" className="text-amber-400 dark:text-orange-500 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={handleCopyEmail}
              className="bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 px-5 py-3.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm flex items-center gap-2 tactile-btn transition-all"
            >
              {copied ? <Check size={15} weight="bold" className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={15} weight="bold" className="text-zinc-500 dark:text-zinc-400" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Email'}</span>
            </button>
          </div>

        </div>

        {/* Right 5 Columns: Grand-Scale 3D ASCII Dove */}
        <div className="lg:col-span-5 flex items-center justify-center relative select-none w-full">
          <AsciiCanvas soundEnabled={soundEnabled} isDarkMode={isDarkMode} />
        </div>

      </div>

    </section>
  );
};
