import React from 'react';
import { CaretRight } from '@phosphor-icons/react';

export const DesignLanguageTokens = () => {
  return (
    <section className="py-16 border-b border-zinc-200 dark:border-zinc-800 relative space-y-10">
      {/* Section Tag */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold mb-2">
          <CaretRight size={14} weight="bold" />
          <span>04 · Design System & Native Token Integration</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight">
          Respecting NoBroker's Existing Design Grammar
        </h2>
        <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg max-w-4xl mt-3 leading-relaxed">
          A common failure in portfolio case studies is redesigning the entire brand from scratch. This was explicitly designed as a <strong>native feature addition</strong> living inside NoBroker's existing information architecture, respecting established visual tokens, typography hierarchies, and component physics.
        </p>
      </div>

      {/* Dual Token Jobs: Teal vs. Red */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Token 1: Teal */}
        <div className="p-6 sm:p-8 rounded-3xl sm:rounded-4xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold">
              Discovery & Spatial Token
            </span>
            <span className="text-xs font-mono text-zinc-400">
              #009999 · NoBroker Teal
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#009999] shadow-sm flex items-center justify-center text-white font-mono text-xs font-bold shrink-0">
              Teal
            </div>
            <div>
              <h4 className="text-lg font-bold font-sans text-zinc-900 dark:text-white">
                Search, Commute & Selection
              </h4>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Active radius boundaries, travel routes, amenity accordion tabs.
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-900/60 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
            <strong>Strict Boundary:</strong> Teal is used exclusively for exploration and spatial feedback. It signals safety, information discovery, and navigation.
          </p>
        </div>

        {/* Token 2: Red */}
        <div className="p-6 sm:p-8 rounded-3xl sm:rounded-4xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold">
              High-Intent Conversion Token
            </span>
            <span className="text-xs font-mono text-zinc-400">
              #E11D2E · NoBroker Crimson
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#E11D2E] shadow-sm flex items-center justify-center text-white font-mono text-xs font-bold shrink-0">
              Red
            </div>
            <div>
              <h4 className="text-lg font-bold font-sans text-zinc-900 dark:text-white">
                Action, Call & Schedule
              </h4>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Primary conversion CTAs: "Contact Owner" and "Schedule Visit".
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-900/60 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
            <strong>Strict Boundary:</strong> Crimson Red is never used for map decorations or informational chips. It is preserved strictly for irreversible conversion steps.
          </p>
        </div>
      </div>

      {/* Constraints & Anti-Patterns Kept Intact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800/90 p-6 rounded-3xl shadow-sm space-y-2">
          <div className="text-xs font-mono text-orange-600 dark:text-orange-400 uppercase tracking-wider font-bold">
            No New Bottom Bar Tab
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Commute search lives inside the existing <strong>Rent search shell</strong> as an alternative query mode, preserving user muscle memory.
          </p>
        </div>

        <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800/90 p-6 rounded-3xl shadow-sm space-y-2">
          <div className="text-xs font-mono text-orange-600 dark:text-orange-400 uppercase tracking-wider font-bold">
            No Fake Empty States
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            If a radius returns zero matches, the system auto-expands from 3 km to 5 km with clear inline feedback instead of showing an empty dead-end.
          </p>
        </div>

        <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800/90 p-6 rounded-3xl shadow-sm space-y-2">
          <div className="text-xs font-mono text-orange-600 dark:text-orange-400 uppercase tracking-wider font-bold">
            Map + Bottom Card Physics
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Retained the standard Android/iOS spatial pattern: tapping any house pin smoothly scrolls the bottom preview card into view.
          </p>
        </div>
      </div>
    </section>
  );
};
