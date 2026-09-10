import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Sparkle, SquaresFour, Browsers, PaintBrush } from '@phosphor-icons/react';
import { animate, stagger } from 'animejs';
import { projects, projectCategories } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { playSound } from '../utils/sound';

export const WorkGrid = ({ onSelectProject, soundEnabled }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const hasAnimatedHeader = useRef(false);

  const categoryIcons = {
    'all': SquaresFour,
    'ui-ux': Browsers,
    'graphic-brand': PaintBrush
  };

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((item) => 
      item.category === activeCategory || 
      (Array.isArray(item.categories) && item.categories.includes(activeCategory)) ||
      (activeCategory === 'graphic-brand' && item.categoryLabel?.toLowerCase().includes('brand'))
    );
  }, [activeCategory]);

  // Staggered card entrance with anime.js on mount and category switch
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.children);
    if (!cards.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      cards.forEach((card) => {
        if (card) {
          card.style.opacity = '1';
          card.style.transform = '';
        }
      });
      return;
    }

    animate(cards, {
      opacity: [0, 1],
      y: [24, 0],
      duration: 550,
      ease: 'outCubic',
      delay: stagger(60),
      onComplete: () => {
        cards.forEach((card) => {
          if (card) {
            card.style.transform = '';
            card.style.opacity = '';
          }
        });
      }
    });
  }, [activeCategory]);

  // Smooth entrance for section header when scrolled into view
  useEffect(() => {
    if (!headerRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimatedHeader.current) {
          hasAnimatedHeader.current = true;
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (!prefersReducedMotion && headerRef.current) {
            animate(headerRef.current, {
              opacity: [0, 1],
              y: [20, 0],
              duration: 700,
              ease: 'outCubic',
              onComplete: () => {
                if (headerRef.current) {
                  headerRef.current.style.transform = '';
                  headerRef.current.style.opacity = '';
                }
              }
            });
          }
        }
      });
    }, { threshold: 0.15 });

    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" className="py-20 sm:py-24 px-4 sm:px-8 max-w-6xl mx-auto space-y-10 scroll-mt-24 sm:scroll-mt-28">
      
      {/* Section Header */}
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-zinc-200 dark:border-zinc-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold mb-2">
            <Sparkle size={15} weight="fill" />
            <span>Selected Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight">
            Crafted with warmth, structure & care.
          </h2>
        </div>

        {/* Clean Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {projectCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = categoryIcons[cat.id] || SquaresFour;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  playSound('pop', soundEnabled);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all tactile-btn flex items-center gap-1.5 ${
                  isActive 
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' 
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
                }`}
              >
                <Icon size={14} weight={isActive ? "bold" : "regular"} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Spacious Grid of Scaled Projects */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            soundEnabled={soundEnabled}
            onSelect={onSelectProject}
          />
        ))}
      </div>

    </section>
  );
};
