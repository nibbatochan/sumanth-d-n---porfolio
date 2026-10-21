import React from 'react';
import { Sparkle, ShieldWarning, GitBranch, ArrowSquareOut, CaretRight } from '@phosphor-icons/react';
import { playSound } from '../../utils/sound';
import { KineticHeading } from '../../utils/motion';

export const ReflectionsAndGaps = ({ labHost, soundEnabled }) => {
  return (
    <section className="py-16 relative space-y-10">
      {/* Section Tag */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold mb-2">
          <CaretRight size={14} weight="bold" />
          <span>07 · Reflections, Honest Gaps & Next Steps</span>
        </div>
        <KineticHeading 
          as="h2"
          text="Honest Gaps & What I Learned"
          className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight"
        />
        <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg max-w-4xl mt-2 leading-relaxed">
          Great product design acknowledges where the work currently stops. The interactive prototypes prove feasibility, but a few real-world questions and engineering loops remain open for future production releases.
        </p>
      </div>

      {/* Honest Gaps Grid (3 cards) */}
      <div data-reveal-group className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div data-reveal-child className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800/90 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-mono text-xs uppercase tracking-wider font-bold">
              <ShieldWarning size={17} weight="bold" />
              Unverified Assumption
            </div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-white">
              Drop in App-Hopping Needs Production Data
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              While user interviews confirmed renters loved having travel times in-app, measuring the exact drop in app-switching requires <strong>real production telemetry</strong>. It remains a validated design hypothesis to test with live traffic.
            </p>
          </div>
          <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 font-semibold pt-2 border-t border-zinc-100 dark:border-zinc-800">
            Telemetry Metric to Track
          </span>
        </div>

        <div data-reveal-child className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800/90 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-mono text-xs uppercase tracking-wider font-bold">
              <GitBranch size={17} weight="bold" />
              Next Roadmap Item
            </div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-white">
              Fast Delisting for Already-Rented Flats
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Landlords often leave rented homes online for weeks. The next planned feature is an <strong>automated post-call check</strong>: <em>"Was this flat still available?"</em> If two callers confirm it is taken, the listing is automatically archived.
            </p>
          </div>
          <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 font-semibold pt-2 border-t border-zinc-100 dark:border-zinc-800">
            Roadmap Item · Fast Delist
          </span>
        </div>

        <div data-reveal-child className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800/90 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-mono text-xs uppercase tracking-wider font-bold">
              <Sparkle size={17} weight="bold" />
              Personal Takeaway
            </div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-white">
              Design for Real Friction, Not Prettier UI
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              When <strong>64.9% of renters switch to Google Maps</strong>, the fix is not a prettier filter dropdown. It is understanding where the app failed to answer a <strong>fundamental human need</strong> and solving it right inside the flow.
            </p>
          </div>
          <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 font-semibold pt-2 border-t border-zinc-100 dark:border-zinc-800">
            Core Design Philosophy
          </span>
        </div>
      </div>

      {/* Closing CTA Container */}
      <div data-reveal className="w-full max-w-4xl mx-auto p-8 sm:p-12 rounded-4xl bg-gradient-to-b from-white/95 to-zinc-50/90 dark:from-[#151519]/95 dark:to-[#0F0F12]/95 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl text-center relative z-30 space-y-4 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-orange-500/[0.08] via-orange-500/[0.02] to-transparent pointer-events-none -z-0" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold bg-orange-500/10 border border-orange-500/20">
          <CaretRight size={14} weight="bold" />
          <span>Interactive Demos Ready</span>
        </div>

        <h3 className="text-xl sm:text-3xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight">
          Explore the Interactive Prototypes
        </h3>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed">
          Test all three redesign features live in the interactive lab with realistic Bangalore commute data, verified photography, and calm notification feeds.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (soundEnabled) playSound('pop');
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
              const targetUrl = isMobile 
                ? `${labHost}/ps1/prototype`
                : labHost;
              window.open(targetUrl, '_blank', 'noopener,noreferrer');
            }}
            className="px-6 py-3 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 transition-all hover:scale-105 active:scale-95 tactile-btn"
          >
            <span>Open All 3 Lab Prototypes</span>
            <ArrowSquareOut size={16} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  );
};
