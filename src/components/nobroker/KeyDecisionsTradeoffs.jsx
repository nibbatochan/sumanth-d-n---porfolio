import React from 'react';
import { 
  Sparkle, 
  MapTrifold, 
  ShieldCheck, 
  BellSlash, 
  Browsers 
} from '@phosphor-icons/react';

export const KeyDecisionsTradeoffs = () => {
  const decisions = [
    {
      index: '01',
      tag: 'Journey Architecture',
      icon: MapTrifold,
      title: 'Fixing the Flow Break instead of adding 15 more filters',
      choice: 'Resisted adding endless granular dropdowns (balcony direction, pet policy, modular kitchen).',
      why: (
        <>
          Renters were not struggling with filter count. They abandoned the app because checking commute times forced them into <strong>Google Maps</strong>. Building an <strong>in-app commute engine</strong> preserves search momentum without cluttering the UI with endless filters.
        </>
      )
    },
    {
      index: '02',
      tag: 'Trust & Ground Truth',
      icon: ShieldCheck,
      title: 'Real visitor proof over AI-generated summaries',
      choice: 'Focused on unedited daylight photos and GPS-verified check-ins rather than AI text summaries.',
      why: (
        <>
          Renters are skeptical of marketing prose after being burned by wide-angle staging. An AI summary only repeats landlord claims. <strong>Unedited daylight photos</strong>, <strong>water pressure checks</strong>, and <strong>real room measurements</strong> give renters honest ground truth.
        </>
      )
    },
    {
      index: '03',
      tag: 'Attention Economics',
      icon: BellSlash,
      title: 'Quiet, high-signal alerts over daily push blasts',
      choice: 'Send zero push notifications until a fresh, verified flat matches the renter's exact commute threshold.',
      why: (
        <>
          <strong>43.2% of renters muted notifications</strong> because property apps blast repetitive marketing spam. Trading vanity daily click-throughs for <strong>high-intent, verified alerts</strong> restored trust and stopped users from turning off notifications.
        </>
      )
    },
    {
      index: '04',
      tag: 'Production Reality',
      icon: Browsers,
      title: 'Designing inside NoBroker's system instead of a fantasy redesign',
      choice: 'Designed strictly using NoBroker's native mobile components, colors, and layout patterns.',
      why: (
        <>
          A complete visual redesign looks pretty in a portfolio but <strong>can never be shipped in production</strong>. Designing within real-world constraints ensures these three features can <strong>actually launch to users tomorrow</strong>.
        </>
      )
    }
  ];

  return (
    <section className="py-16 border-b border-zinc-200 dark:border-zinc-800 relative space-y-10">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold mb-2">
          <Sparkle size={14} weight="fill" />
          <span>06 · Deliberate Trade-Offs & Key Decisions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight">
          The system worked because the trade-offs were deliberate.
        </h2>
        <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg max-w-4xl mt-2 leading-relaxed">
          Good product design is defined as much by <strong>what you refuse to build</strong>. To keep the experience realistic and trustworthy, I made four intentional design choices balancing user cognitive load, trust, and engineering feasibility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {decisions.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.index}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800/90 shadow-sm flex flex-col justify-between space-y-5 hover:border-orange-500/40 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                    <Icon size={20} weight="bold" />
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-orange-700 dark:text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 font-bold">
                      #{item.index}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-sans text-zinc-900 dark:text-white leading-snug">
                    {item.title}
                  </h3>
                  <div className="mt-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 py-0.5">
                    {item.choice}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pt-1">
                  {item.why}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Deliberate Trade-Off</span>
                <span className="text-orange-600 dark:text-orange-400 font-bold">Engineered Choice ✓</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
