import React, { useRef, useEffect } from 'react';
import { 
  Briefcase, 
  Wrench, 
  Buildings, 
  CalendarBlank 
} from '@phosphor-icons/react';
import { animate, stagger } from 'animejs';
import { experienceTimeline, toolstack } from '../data/portfolioData';

const RealToolIcons = {
  Figma: (props) => (
    <svg viewBox="0 0 38 57" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5" {...props}>
      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" />
      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" />
      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" />
      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" />
      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" />
    </svg>
  ),
  Cursor: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5" {...props}>
      <path d="M11.527 1.547a1.002 1.002 0 0 1 .946 0l9.5 5.5a1 1 0 0 1 .5.866v11a1 1 0 0 1-.5.866l-9.5 5.5a1 1 0 0 1-.946 0l-9.5-5.5a1 1 0 0 1-.5-.866v-11a1 1 0 0 1 .5-.866l9.5-5.5Zm.473 1.733-8.5 4.921 8.5 4.921 8.5-4.921-8.5-4.921Zm-9 6.654v9.124l8.5 4.921v-9.124l-8.5-4.921Zm10.5 4.921v9.124l8.5-4.921v-9.124l-8.5 4.921Z" />
    </svg>
  ),
  Claude: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5" {...props}>
      <path d="M4.77 15.65c-.37-.7-.57-1.47-.57-2.26 0-.8.2-1.56.57-2.26l3.35 1.13c-.09.37-.14.75-.14 1.13s.05.76.14 1.13l-3.35 1.13zm2.59 4.49c-.61-.51-1.1-1.14-1.45-1.85l3.02-1.8c.2.32.45.6.74.83l-2.31 2.82zm5.04 1.86c-.79 0-1.55-.2-2.24-.57l1.14-3.35c.36.09.73.14 1.1.14s.74-.05 1.1-.14l1.14 3.35c-.69.37-1.45.57-2.24.57zm5.03-1.86l-2.31-2.82c.29-.23.54-.51.74-.83l3.02 1.8c-.35.71-.84 1.34-1.45 1.85zm2.6-4.49l-3.35-1.13c.09-.37.14-.75.14-1.13s-.05-.76-.14-1.13l3.35-1.13c.37.7.57 1.46.57 2.26 0 .79-.2 1.56-.57 2.26zm-2.6-4.49c.61.51 1.1 1.14 1.45 1.85l-3.02 1.8c-.2-.32-.45-.6-.74-.83l2.31-2.82zm-5.03-1.86c.79 0 1.55.2 2.24.57l-1.14 3.35c-.36-.09-.73-.14-1.1-.14s-.74.05-1.1.14l-1.14-3.35c.69-.37 1.45-.57 2.24-.57zm-5.04 1.86l2.31 2.82c-.29.23-.54.51-.74.83l-3.02-1.8c.35-.71.84-1.34 1.45-1.85z" />
    </svg>
  ),
  Antigravity: (props) => (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5 text-current" {...props}>
      <circle cx="12" cy="12" r="3.5" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4.2" stroke="currentColor" strokeWidth="1.8" transform="rotate(-30 12 12)" />
      <circle cx="19.5" cy="7.5" r="1.5" fill="currentColor" />
    </svg>
  ),
  Vercel: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5" {...props}>
      <path d="M12 1.5L24 22.5H0L12 1.5Z" />
    </svg>
  ),
  Midjourney: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5" {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 3.5v9h4.5c-1.2 2-3.3 3.5-5.5 3.5-3.9 0-7-3.1-7-7 0-3.3 2.3-6.1 5.4-6.8l.6.3v1zm-2 2.1c-2.3.6-4 2.7-4 5.1 0 2.2 1.3 4.1 3.2 4.8l.8-.4v-9.5z" />
    </svg>
  ),
  "Midjourney AI": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5" {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 3.5v9h4.5c-1.2 2-3.3 3.5-5.5 3.5-3.9 0-7-3.1-7-7 0-3.3 2.3-6.1 5.4-6.8l.6.3v1zm-2 2.1c-2.3.6-4 2.7-4 5.1 0 2.2 1.3 4.1 3.2 4.8l.8-.4v-9.5z" />
    </svg>
  ),
  Illustrator: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M7 16l2.8-8h1.4l2.8 8h-1.4l-.7-2.2H9.1L8.4 16H7zm2.5-3.4h2.1L10.5 9.7l-1 2.9zm6.3-4.3c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1zm-.7 7.7V10.8h1.4V16h-1.4z" />
    </svg>
  ),
  Photoshop: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M7 8h3.2c1.8 0 2.8.9 2.8 2.4 0 1.6-1.1 2.5-2.9 2.5H8.4V16H7V8zm1.4 3.7h1.6c.9 0 1.5-.4 1.5-1.3 0-.8-.6-1.2-1.5-1.2H8.4v2.5zm6.8 4.4c-1.2 0-2.1-.6-2.3-1.6l1.2-.4c.2.6.6.9 1.2.9.6 0 1-.3 1-.7 0-.5-.4-.7-1.2-.9-1.3-.4-1.9-1-1.9-1.9 0-1.1.9-1.8 2.1-1.8 1.1 0 1.8.5 2.1 1.4l-1.2.5c-.2-.5-.5-.7-.9-.7-.5 0-.8.3-.8.6 0 .4.3.6 1.1.8 1.4.4 2 1 2 2 0 1.1-.9 1.9-2.2 1.9z" />
    </svg>
  ),
  "After Effects": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M6 16l2.8-8h1.4l2.8 8h-1.4l-.7-2.2H8.1L7.4 16H6zm2.5-3.4h2.1L9.5 9.7l-1 2.9zm7.3 3.5c-1.6 0-2.7-1.1-2.7-2.8 0-1.7 1.2-2.8 2.8-2.8 1.5 0 2.5 1 2.5 2.6v.5h-3.9c.1 1 .7 1.4 1.5 1.4.7 0 1.2-.3 1.4-.8l1.1.5c-.5 1-1.4 1.4-2.7 1.4zm-1.3-3.2h2.5c-.1-.7-.5-1.1-1.2-1.1-.7 0-1.2.4-1.3 1.1z" />
    </svg>
  ),
  Blender: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5" {...props}>
      <path d="M12.516 3.033a1.5 1.5 0 0 0-1.898.883l-1.986 5.56-4.636-3.66a1.5 1.5 0 1 0-1.862 2.36l4.47 3.53-5.285 1.417a1.5 1.5 0 0 0 .777 2.9l6.398-1.714a6.5 6.5 0 1 0 4.022-11.276zm-.516 16.467a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    </svg>
  ),
  "Tailwind CSS": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5" {...props}>
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  ),
  Miro: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5" {...props}>
      <path d="M4 17.5L8.5 4H4L0 17.5h4zm7.5-3L16 4h-4.5l-4 10.5h4zm7.5-6L23.5 4H19l-4 4.5h4z" />
    </svg>
  )
};

export const AboutSection = () => {
  const historyListRef = useRef(null);
  const toolsGridRef = useRef(null);
  const hasAnimatedHistory = useRef(false);
  const hasAnimatedTools = useRef(false);

  // Viewport reveal for Work History items
  useEffect(() => {
    if (!historyListRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimatedHistory.current) {
          hasAnimatedHistory.current = true;
          const items = Array.from(historyListRef.current.children);
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (prefersReducedMotion) {
            items.forEach((item) => {
              if (item) item.style.opacity = '1';
            });
            return;
          }
          animate(items, {
            opacity: [0, 1],
            y: [24, 0],
            duration: 600,
            ease: 'outCubic',
            delay: stagger(90),
            onComplete: () => {
              items.forEach((item) => {
                if (item) {
                  item.style.transform = '';
                  item.style.opacity = '';
                }
              });
            }
          });
        }
      });
    }, { threshold: 0.1 });

    observer.observe(historyListRef.current);
    return () => observer.disconnect();
  }, []);

  // Viewport reveal for Software Arsenal grid items
  useEffect(() => {
    if (!toolsGridRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimatedTools.current) {
          hasAnimatedTools.current = true;
          const items = Array.from(toolsGridRef.current.children);
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (prefersReducedMotion) {
            items.forEach((item) => {
              if (item) item.style.opacity = '1';
            });
            return;
          }
          animate(items, {
            opacity: [0, 1],
            scale: [0.94, 1],
            y: [16, 0],
            duration: 500,
            ease: 'outCubic',
            delay: stagger(40),
            onComplete: () => {
              items.forEach((item) => {
                if (item) {
                  item.style.transform = '';
                  item.style.opacity = '';
                }
              });
            }
          });
        }
      });
    }, { threshold: 0.15 });

    observer.observe(toolsGridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="pt-20 pb-0 px-4 sm:px-8 max-w-6xl mx-auto space-y-20 relative z-30">
      
      {/* 1. Work History Section (#about) */}
      <div id="about" className="space-y-6 scroll-mt-28">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
            <Briefcase size={20} weight="duotone" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-sans text-zinc-900 dark:text-white">
            Work History
          </h3>
        </div>

        <div ref={historyListRef} className="space-y-4">
          {experienceTimeline.map((exp, idx) => (
            <div 
              key={idx} 
              className="p-6 sm:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3 transition-colors hover:border-orange-500/30"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white">{exp.role}</h4>
                  <p className="text-xs sm:text-sm font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-1.5 mt-0.5">
                    <Buildings size={15} weight="duotone" />
                    <span>{exp.company}</span>
                  </p>
                </div>
                <span className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 self-start sm:self-auto font-medium flex items-center gap-1.5">
                  <CalendarBlank size={13} weight="bold" />
                  <span>{exp.period}</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Software Arsenal & Tools Section (#tools) - Floats gracefully in front */}
      <div id="tools" className="space-y-6 scroll-mt-28 relative z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
            <Wrench size={19} weight="duotone" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-sans text-zinc-900 dark:text-white">
            Software Arsenal & Tools
          </h3>
        </div>

        <div className="p-6 sm:p-8 bg-white/95 dark:bg-[#121215]/95 backdrop-blur-md rounded-4xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl relative z-30">
          <div ref={toolsGridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-3 sm:gap-4">
            {toolstack.map((t, idx) => {
              const Icon = RealToolIcons[t.name] || RealToolIcons.Figma;
              return (
                <div 
                  key={idx} 
                  className="p-3.5 sm:p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between gap-2.5 hover:border-zinc-900 dark:hover:border-white hover:bg-white dark:hover:bg-zinc-800 transition-all hover:-translate-y-0.5 shadow-2xs group cursor-default"
                >
                  <span className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white truncate">
                    {t.name}
                  </span>
                  <div className="shrink-0 text-zinc-900 dark:text-white group-hover:scale-110 transition-transform">
                    <Icon />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
};
