import React, { useRef, useEffect } from 'react';
import { 
  Briefcase, 
  Wrench, 
  Buildings, 
  CalendarBlank, 
  FigmaLogo, 
  PenNib, 
  Image, 
  Cpu, 
  Cube, 
  PlayCircle, 
  Graph, 
  Layout, 
  Sparkle 
} from '@phosphor-icons/react';
import { animate, stagger } from 'animejs';
import { experienceTimeline, toolstack } from '../data/portfolioData';

export const AboutSection = () => {
  const historyListRef = useRef(null);
  const toolsGridRef = useRef(null);
  const hasAnimatedHistory = useRef(false);
  const hasAnimatedTools = useRef(false);

  const toolIcons = {
    'Figma': FigmaLogo,
    'Adobe XD': Layout,
    'Adobe Illustrator': PenNib,
    'Adobe Photoshop': Image,
    'After Effects': PlayCircle,
    'Midjourney AI': Cpu,
    'Miro': Graph,
    'Blender': Cube,
  };

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
          <div ref={toolsGridRef} className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4">
            {toolstack.map((t, idx) => {
              const Icon = toolIcons[t.name] || Sparkle;
              return (
                <div 
                  key={idx} 
                  className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between hover:border-orange-500/50 hover:bg-white dark:hover:bg-zinc-800 transition-all hover:-translate-y-0.5 shadow-2xs"
                >
                  <span className="font-bold text-sm text-zinc-900 dark:text-white">{t.name}</span>
                  <Icon size={20} weight="duotone" className="text-orange-500" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
};
