import React from 'react';
import { 
  Sparkle, 
  ChatCircleDots,
  Compass,
  MapPin,
  Camera,
  BellSimple,
  CheckCircle
} from '@phosphor-icons/react';

export const ValidationSection = ({ soundEnabled }) => {
  return (
    <div className="space-y-0">
      
      {/* =========================================================================
          SECTION 06: VALIDATION & RESULTS
         ========================================================================= */}
      <section id="validation-section" className="py-16 border-b border-zinc-200 dark:border-zinc-800 relative space-y-10 scroll-mt-28">
        
        {/* Section Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold mb-2">
            <Sparkle size={14} weight="fill" />
            <span>06 · Validation & Results</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight">
            Testing & Results
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg max-w-4xl mt-2 leading-relaxed">
            Evaluating usability, unassisted task performance, and renter confidence across the redesign.
          </p>
        </div>

        {/* Testing Setup: Pure Typography & Grid Divider, Zero Background Box */}
        <div className="py-4 border-y border-zinc-300/60 dark:border-zinc-800/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center shrink-0 text-xs">
                01
              </span>
              <div className="space-y-0.5">
                <div className="text-zinc-950 dark:text-white font-bold text-sm">
                  12 Bangalore Renters
                </div>
                <div className="text-zinc-500 dark:text-zinc-400 text-xs">
                  4 original interviewees + 8 experienced searchers
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center shrink-0 text-xs">
                02
              </span>
              <div className="space-y-0.5">
                <div className="text-zinc-950 dark:text-white font-bold text-sm">
                  Mobile + High-Fidelity Lab Prototypes
                </div>
                <div className="text-zinc-500 dark:text-zinc-400 text-xs">
                  Live think-aloud usability walkthroughs
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center shrink-0 text-xs">
                03
              </span>
              <div className="space-y-0.5">
                <div className="text-zinc-950 dark:text-white font-bold text-sm">
                  Three Practical Tasks
                </div>
                <div className="text-zinc-500 dark:text-zinc-400 text-xs">
                  Commute routing, photo verification, calm alerts
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Master Results Showcase: Single Clean Image (Typography Baked Inside) */}
        <div className="w-full rounded-3xl overflow-hidden border border-[#E5E3DC] dark:border-zinc-800/80 bg-[#FAF9F6] dark:bg-[#121215] shadow-xs">
          <img 
            src="/illustrations/xiaohei-results-summary.png" 
            alt="Xiaohei UX Testing Master Results: 97.2% Task Success Rate across Commute, Reality Verification and Calm Alerts"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* 3 Pillar Results: Refero-Inspired Horizontal Bento Strip Cards (No Internal Container) */}
        <div className="space-y-4">
          
          {/* Pillar 1: Commute Spine */}
          <div className="rounded-3xl p-6 sm:p-7 bg-[#FAF9F6] dark:bg-[#121215] border border-[#E5E3DC] dark:border-zinc-800/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
            {/* Left: Identity & Finding */}
            <div className="space-y-2.5 md:max-w-xl min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                  <MapPin size={20} weight="bold" />
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold block">
                    Pillar 01
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-sans text-zinc-900 dark:text-white truncate">
                    Commute Spine
                  </h3>
                </div>
                <span className="ml-auto md:ml-3 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full shrink-0">
                  12/12 Passed
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed min-w-0 break-words">
                Renters anchor search to their workplace to see rush-hour travel times directly on property cards, cutting app-switching fatigue and speeding up decisions.
              </p>
            </div>

            {/* Right: Metrics Structured Directly (No Internal Box) */}
            <div className="w-full md:w-72 shrink-0 space-y-2.5 pt-4 md:pt-0 border-t md:border-t-0 border-[#E5E3DC]/60 dark:border-zinc-800/60">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-black font-mono text-zinc-950 dark:text-white">4.7</span>
                    <span className="text-xs font-mono text-zinc-400 ml-1">/ 5.0</span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">Ease of Use</div>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline justify-end">
                    <span className="text-2xl font-black font-mono text-zinc-950 dark:text-white">4.6</span>
                    <span className="text-xs font-mono text-zinc-400 ml-1">/ 5.0</span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">Likelihood to Use</div>
                </div>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-200/80 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full rounded-full bg-orange-500" style={{ width: '94%' }} />
              </div>
              <div className="text-[11px] font-mono text-orange-600 dark:text-orange-400 font-semibold text-right">
                Speeds Up Decision-Making
              </div>
            </div>
          </div>

          {/* Pillar 2: Reality Verification */}
          <div className="rounded-3xl p-6 sm:p-7 bg-[#FAF9F6] dark:bg-[#121215] border border-[#E5E3DC] dark:border-zinc-800/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
            {/* Left: Identity & Finding */}
            <div className="space-y-2.5 md:max-w-xl min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                  <Camera size={20} weight="bold" />
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold block">
                    Pillar 02
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-sans text-zinc-900 dark:text-white truncate">
                    Reality Verification
                  </h3>
                </div>
                <span className="ml-auto md:ml-3 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full shrink-0">
                  12/12 Passed
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed min-w-0 break-words">
                Turns frustrating, wasted visits into a fair value exchange: visitors upload honest room photos to warn others and earn moving service discounts.
              </p>
            </div>

            {/* Right: Metrics Structured Directly (No Internal Box) */}
            <div className="w-full md:w-72 shrink-0 space-y-2.5 pt-4 md:pt-0 border-t md:border-t-0 border-[#E5E3DC]/60 dark:border-zinc-800/60">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-black font-mono text-zinc-950 dark:text-white">4.4</span>
                    <span className="text-xs font-mono text-zinc-400 ml-1">/ 5.0</span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">Ease of Use</div>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline justify-end">
                    <span className="text-2xl font-black font-mono text-zinc-950 dark:text-white">4.3</span>
                    <span className="text-xs font-mono text-zinc-400 ml-1">/ 5.0</span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">Likelihood to Use</div>
                </div>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-200/80 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full rounded-full bg-teal-500" style={{ width: '88%' }} />
              </div>
              <div className="text-[11px] font-mono text-teal-600 dark:text-teal-400 font-semibold text-right">
                Turns Failed Visits into Value
              </div>
            </div>
          </div>

          {/* Pillar 3: Calm Alerts */}
          <div className="rounded-3xl p-6 sm:p-7 bg-[#FAF9F6] dark:bg-[#121215] border border-[#E5E3DC] dark:border-zinc-800/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
            {/* Left: Identity & Finding */}
            <div className="space-y-2.5 md:max-w-xl min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <BellSimple size={20} weight="bold" />
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold block">
                    Pillar 03
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-sans text-zinc-900 dark:text-white truncate">
                    Calm Alerts
                  </h3>
                </div>
                <span className="ml-auto md:ml-3 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full shrink-0">
                  11/12 Passed
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed min-w-0 break-words">
                Alerts fire only for verified commute-fit homes with an automatic 14-day expiry, stopping notification spam and boosting adoption.
              </p>
            </div>

            {/* Right: Metrics Structured Directly (No Internal Box) */}
            <div className="w-full md:w-72 shrink-0 space-y-2.5 pt-4 md:pt-0 border-t md:border-t-0 border-[#E5E3DC]/60 dark:border-zinc-800/60">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-black font-mono text-zinc-950 dark:text-white">4.6</span>
                    <span className="text-xs font-mono text-zinc-400 ml-1">/ 5.0</span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">Ease of Use</div>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline justify-end">
                    <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">4.8</span>
                    <span className="text-xs font-mono text-zinc-400 ml-1">/ 5.0</span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">Likelihood to Use</div>
                </div>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-200/80 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '96%' }} />
              </div>
              <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold text-right">
                Highest Likelihood Rating
              </div>
            </div>
          </div>

        </div>

      </section>


      {/* =========================================================================
          SECTION 07: USER SIGNALS & FRICTIONS OBSERVED
         ========================================================================= */}
      <section id="learnings-section" className="py-16 border-b border-zinc-200 dark:border-zinc-800 relative space-y-10 scroll-mt-28">
        
        {/* Section Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold mb-2">
            <ChatCircleDots size={14} weight="bold" />
            <span>07 · User Signals</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight">
            Frictions observed and user signals for future solving
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg max-w-4xl mt-2 leading-relaxed">
            Observing where renters hesitated during live testing highlighted three friction points.
          </p>
        </div>

        {/* 3 User Insight Cards: Clean Editorial Layout with Soft Off-White Background */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Signal 01 */}
          <div className="rounded-3xl p-6 sm:p-7 bg-[#FAF9F6] dark:bg-[#121215] border border-[#E5E3DC] dark:border-zinc-800/80 shadow-xs flex flex-col justify-between space-y-5 overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">
                  P04 · Daily Commuter
                </span>
              </div>

              <blockquote className="text-base sm:text-lg font-medium text-zinc-950 dark:text-white leading-snug">
                "I like that it says 22 minutes, but is that right now or during Monday 9 AM office traffic?"
              </blockquote>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F4F3EE] dark:bg-zinc-900/60 border border-[#E5E3DC]/70 dark:border-zinc-800/80 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <strong className="text-zinc-900 dark:text-zinc-200 font-semibold block mb-0.5">Friction observed:</strong>
              Renters wondered whether travel times reflected current road traffic or peak Monday morning congestion.
            </div>
          </div>

          {/* Signal 02 */}
          <div className="rounded-3xl p-6 sm:p-7 bg-[#FAF9F6] dark:bg-[#121215] border border-[#E5E3DC] dark:border-zinc-800/80 shadow-xs flex flex-col justify-between space-y-5 overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">
                  P07 · Visiting Tenant
                </span>
              </div>

              <blockquote className="text-base sm:text-lg font-medium text-zinc-950 dark:text-white leading-snug">
                "The owner was walking me down the stairs. Opening my camera right there felt awkward."
              </blockquote>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F4F3EE] dark:bg-zinc-900/60 border border-[#E5E3DC]/70 dark:border-zinc-800/80 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <strong className="text-zinc-900 dark:text-zinc-200 font-semibold block mb-0.5">Friction observed:</strong>
              Photographing someone's home while standing next to the owner felt awkward.
            </div>
          </div>

          {/* Signal 03 */}
          <div className="rounded-3xl p-6 sm:p-7 bg-[#FAF9F6] dark:bg-[#121215] border border-[#E5E3DC] dark:border-zinc-800/80 shadow-xs flex flex-col justify-between space-y-5 overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">
                  P11 · Active Searcher
                </span>
              </div>

              <blockquote className="text-base sm:text-lg font-medium text-zinc-950 dark:text-white leading-snug">
                "I saw another house right below the box, so I just tapped that one instead of setting an alert."
              </blockquote>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F4F3EE] dark:bg-zinc-900/60 border border-[#E5E3DC]/70 dark:border-zinc-800/80 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <strong className="text-zinc-900 dark:text-zinc-200 font-semibold block mb-0.5">Friction observed:</strong>
              Alternative listings placed right under the alert prompt pulled attention away from setting an alert.
            </div>
          </div>

        </div>

      </section>


      {/* =========================================================================
          SECTION 08: LEARNINGS (Unboxed Editorial Reflection)
         ========================================================================= */}
      <section id="next-steps-section" className="py-16 border-b border-zinc-200 dark:border-zinc-800 relative space-y-8 scroll-mt-28">
        
        {/* Section Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold mb-2">
            <Compass size={14} weight="bold" />
            <span>08 · Learnings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight">
            Learnings
          </h2>
        </div>

        {/* Designer's Reflection Copy (Unboxed / Open Editorial Layout) */}
        <div className="max-w-4xl space-y-4 text-zinc-700 dark:text-zinc-300 text-base sm:text-lg leading-relaxed">
          <p>
            I started with a hypothesis, spent time on product thinking and research, and narrowed things down to a clear set of problems. To solve them, I wanted to build this project entirely in code, starting with a lightweight framework and layering wireframe models until they became the final UI. Along the way, the work moved from product research into a working prototype.
          </p>
          <p>
            This project taught me how to design with agentic workflows at scale, combining agents, code generation, styling, and deployment. It took plenty of learning, relearning, prompting, and re-prompting to make the UI feel native to NoBroker while staying true to my ideas and solutions.
          </p>
        </div>

      </section>

    </div>
  );
};

