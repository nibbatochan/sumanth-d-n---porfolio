import React from 'react';
import { CaretRight } from '@phosphor-icons/react';
import { KineticHeading } from '../../utils/motion';

export const MetricsFramework = () => {
  return (
    <section className="py-12 border-b border-zinc-200 dark:border-zinc-800 relative space-y-12">
      {/* Section 04: Deriving the Problem Statements & North Star Alignment */}
      <div className="space-y-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/80">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold mb-2">
            <CaretRight size={14} weight="bold" />
            <span>05 · Goals & Metric Framework</span>
          </div>
          <KineticHeading 
            as="h3"
            text="Aligning to NoBroker's Rental North Star & Input Metrics"
            className="text-2xl sm:text-3xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight"
          />
        </div>

        {/* Better Spaced Layout: North Star Hero Banner + Containerless Input Metrics */}
        <div data-reveal className="space-y-6">
          
          {/* North Star Hero Banner with Image on the Right */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 rounded-3xl bg-gradient-to-b from-white to-zinc-50/50 dark:from-[#121215] dark:to-[#0C0C0E] border border-zinc-200 dark:border-zinc-800/90 shadow-sm relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-500/[0.04] via-transparent to-transparent pointer-events-none -z-0" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start relative z-10">
              {/* Left Content */}
              <div className="md:col-span-7 space-y-3 pt-6 sm:pt-8">
                <span className="text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 inline-block">
                  Primary Rental North Star Metric
                </span>
                <h4 className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 dark:text-white leading-tight">
                  Successful Move-Ins
                </h4>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  The speed and ease with which a renter finds, visits and leases a verified flat without broker fees. Baseline: the median search in my survey took 2 to 4 weeks (self-reported).
                </p>
              </div>

              {/* Right Image - Borderless, clean, flushed to top */}
              <div className="md:col-span-5 flex items-start justify-center pt-0">
                <div className="w-full max-w-[340px] flex items-start justify-center">
                  <img 
                    src="/illustrations/north_star_metric 1.png" 
                    alt="NoBroker Primary North Star Metric Diagram" 
                    className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Input metrics we are trying to connect with - Containerless layout */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold block">
              Input metrics we are trying to connect with.
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-1">
              
              {/* Lever 1 */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 block">
                  01 · Commute checks inside the app · Problem 1
                </span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Baseline: 24 of 37 left for Maps constantly.
                </p>
              </div>

              {/* Lever 2 */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 block">
                  02 · Visit-to-offer rate · Problem 2
                </span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  No baseline. The survey did not ask.
                </p>
              </div>

              {/* Lever 3 */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 block">
                  03 · Alert-to-contact speed and opt-outs · Problem 3
                </span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Baseline: 8 of 37 turned alerts off.
                </p>
              </div>

              {/* Lever 4 */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 block">
                  04 · Redeem-code use for NoBroker services
                </span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  No baseline. A business-side input for NoBroker overall.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
