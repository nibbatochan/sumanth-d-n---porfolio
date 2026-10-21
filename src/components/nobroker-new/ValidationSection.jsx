import React from 'react';
import { Rise, RatingTrack } from './motion-bits';
import { ChatCircleDots, Compass, MapPin, Camera, BellSimple, CheckCircle, CaretRight, Target, Flask, Hourglass, Handshake, ArrowsClockwise } from '@phosphor-icons/react';

const RESULTS = [
  { Icon: MapPin, name: 'Commute Spine', pass: '12/12', ease: 4.7, use: 4.6, tag: 'Commute on every card',
    finding: 'Renters set the place they travel to once and see the commute on every listing card.',
    drives: 'An input to Successful Move-Ins. I have not measured it in a live rollout.',
    benefit: 'Clear commute and neighbourhood details upfront should give renters the confidence to contact owners sooner.' },
  { Icon: Camera, name: 'Reality Verification', pass: '12/12', ease: 4.4, use: 4.3, tag: 'Proof for the next renter',
    finding: "A failed visit becomes a fair exchange: visitors send honest room photos and earn redeem codes for NoBroker's moving and cleaning services.",
    drives: 'Fewer dead-end visits should help renters find and lease a flat sooner. I have not measured it in a live rollout.',
    benefit: 'Visitors earn redeem codes for NoBroker Packers & Movers and Deep Home Cleaning, which brings the partner services new users.' },
  { Icon: BellSimple, name: 'Calm Alerts', pass: '11/12', ease: 4.6, use: 4.8, tag: 'Highest likelihood rating',
    finding: 'One alert, only when a new matching home is posted, with an automatic 14-day expiry.',
    drives: 'Trusted alerts should help renters reach owners of new matches sooner. I have not measured it in a live rollout.',
    benefit: 'A renter who trusts alerts keeps notifications on, so NoBroker keeps a way to reach them.' }
];


const LEARNINGS = [
  { Icon: Target, h: 'A good problem is one the product can actually change.', b: 'Four of my seven clusters sat with owners or agents: budget, deposits, landlord contact and taken flats. Naming what I could not change kept the three I took on focused.' },
  { Icon: Flask, h: 'A prototype people can use beats screens they can look at.', b: 'Testers got a link and used the flows on their own. I saw whether they understood each flow instead of asking if they liked the screens.' },
  { Icon: Hourglass, h: 'Design for the weeks of searching, not for one session.', b: '25 of 37 searchers took two weeks or more, or were still searching, with average stress at 6.6 out of 10. So the flows cut repeat work: set Your Place once, save a filter.' },
  { Icon: Handshake, h: 'A good feature works for the business as well as the renter.', b: "Visitors who send better photos after a failed visit earn redeem codes for packers and movers or cleaning, which also brings NoBroker's partner services new users." },
  { Icon: ArrowsClockwise, h: 'Learning agentic workflows', b: 'I learned to design with agents at scale, prompting and re-prompting through stacked builds until the UI felt native to NoBroker while staying true to my ideas. I coded the prototype in Antigravity and revised it with annotated Agentation feedback on the live UI, moving from a wireframe lab to a high-fidelity lab. Figma held the affinity map.' }
];

// Small card: the icon and the lesson up front, the detail opens on tap. Height animates through grid rows.
const LearningCard = ({ Icon, title, body }) => {
  const [open, setOpen] = React.useState(false);
  const canOpen = Boolean(body);
  return (
    <button
      type="button"
      onClick={() => canOpen && setOpen((o) => !o)}
      aria-expanded={canOpen ? open : undefined}
      className="group w-full text-left border-t border-zinc-300 dark:border-zinc-700 pt-5 transition-transform duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 rounded-sm"
    >
      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
        <Icon size={20} weight="bold" aria-hidden="true" />
      </span>
      <span className="block text-base font-semibold leading-snug text-zinc-900 dark:text-white">{title}</span>
      {canOpen && (
        <>
          <span className="grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]" style={{ gridTemplateRows: open ? '1fr' : '0fr', opacity: open ? 1 : 0 }}>
            <span className="overflow-hidden">
              <span className="block pt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{body}</span>
            </span>
          </span>
          <span className="mt-2 block text-[11px] font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400">{open ? 'Less' : 'Read more'}</span>
        </>
      )}
    </button>
  );
};

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
            <CaretRight size={14} weight="bold" />
            <span>06 · Validation & Results</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight">
            Testing & Results
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg max-w-4xl mt-2 leading-relaxed">
            I tested whether people could use the three redesigns on their own, and whether they would use them. These are the results of the testing, not of a live rollout. Testers were people I know, the sessions gave them context first, and there was no comparison against the current NoBroker flow.
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
                  12 Renters
                </div>
                <div className="text-zinc-500 dark:text-zinc-400 text-xs">
                  4 interviewees, plus 8 who live in the city and had rented without a broker for about a year
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center shrink-0 text-xs">
                02
              </span>
              <div className="space-y-0.5">
                <div className="text-zinc-950 dark:text-white font-bold text-sm">
                  Remote, over Google Meet
                </div>
                <div className="text-zinc-500 dark:text-zinc-400 text-xs">
                  Each tester got the lab link, with annotations off
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
                  One scenario for each redesign: commute, listing vs reality, alerts
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Master results image, open on the page */}
        <Rise>
          <img
            src="/illustrations/xiaohei-results-summary.png"
            alt="Xiaohei UX Testing Master Results: 97.2% Task Success Rate across Commute, Reality Verification and Calm Alerts"
            className="w-full h-auto rounded-2xl"
            loading="lazy"
          />
        </Rise>

        {/* Results ledger: one open row per problem statement, split by hairlines */}
        <div className="relative ml-1.5 border-l border-zinc-300 dark:border-zinc-700">
          {RESULTS.map((r, i) => (
            <Rise key={r.name} delay={i * 60}>
              <article className="relative grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-6 pl-8 py-8">
                <span className="absolute -left-[6px] top-10 h-3 w-3 rounded-full bg-orange-500 ring-4 ring-[#F5F5F7] dark:ring-[#0C0C0E]" />
                <header className="md:col-span-3 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold">
                    <r.Icon size={16} weight="bold" aria-hidden="true" />
                    Problem Statement {i + 1}
                  </div>
                  <h3 className="text-xl font-bold font-sans tracking-tight text-zinc-900 dark:text-white">{r.name}</h3>
                  <div className="font-mono tabular-nums text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
                    {r.pass}<span className="ml-1.5 text-xs font-normal text-zinc-500">passed</span>
                  </div>
                </header>

                <div className="md:col-span-5 space-y-5">
                  <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">{r.finding}</p>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    <div>
                      <dt className="mb-0.5 text-[11px] font-mono uppercase tracking-wider text-zinc-900 dark:text-zinc-200 font-bold">How it drives move-ins</dt>
                      <dd>{r.drives}</dd>
                    </div>
                    <div>
                      <dt className="mb-0.5 text-[11px] font-mono uppercase tracking-wider text-zinc-900 dark:text-zinc-200 font-bold">Business benefit</dt>
                      <dd>{r.benefit}</dd>
                    </div>
                  </dl>
                </div>

                <div className="md:col-span-4 space-y-5 md:pt-1">
                  <RatingTrack label="Ease of use" value={r.ease} delay={100} />
                  <RatingTrack label="Likelihood to use" value={r.use} delay={200} />
                  <p className="text-[11px] font-mono text-orange-600 dark:text-orange-400 font-semibold">{r.tag}</p>
                </div>
              </article>
            </Rise>
          ))}
        </div>

      </section>


      {/* =========================================================================
          SECTION 08: LEARNINGS (Unboxed Editorial Reflection)
         ========================================================================= */}
      <section id="next-steps-section" className="py-16 border-b border-zinc-200 dark:border-zinc-800 relative space-y-8 scroll-mt-28">
        
        {/* Section Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold mb-2">
            <CaretRight size={14} weight="bold" />
            <span>07 · Learnings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight">
            Learnings
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {LEARNINGS.map(({ Icon, h, b }, i) => (
            <Rise key={h} delay={i * 50}>
              <LearningCard Icon={Icon} title={h} body={b} />
            </Rise>
          ))}
        </div>

      </section>

    </div>
  );
};

