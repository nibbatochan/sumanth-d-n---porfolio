import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Sparkle, 
  UsersThree, 
  ArrowRight
} from '@phosphor-icons/react';
import { playSound } from '../../utils/sound';
import { KineticHeading } from '../../utils/motion';

gsap.registerPlugin(ScrollTrigger);

export const InterviewDeductions = ({ soundEnabled, onSelectSolvedPillar }) => {
  const scrollSectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = scrollSectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Detect the real scroll container (.overflow-y-auto in App.jsx or window)
    const scroller = section.closest('.overflow-y-auto') || window;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const containerWidth = track.parentElement?.clientWidth || window.innerWidth;
        return Math.max(0, trackWidth - containerWidth + 40);
      };

      gsap.fromTo(track, 
        { x: 0 },
        {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            scroller: scroller,
            start: 'top top+=70',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
          }
        }
      );
    }, section);

    // Refresh ScrollTrigger after elements mount and layout settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  // The 7 Simplified Behavioral Affinity Clusters from Interviews
  const clusters = [
    {
      id: 3,
      clusterNumber: '01',
      targetPillar: 'ps2',
      name: 'Leaving the app for commute & traffic',
      tension: 'Checking rush-hour travel times on Google Maps breaks the search flow and kills momentum.',
      status: 'picked',
      isPrimary: true,
      pillarTag: 'Solved in Redesign · PS2',
      quote: '"I always switch to Google Maps to check how long it actually takes to get to my office at 9 AM."'
    },
    {
      id: 2,
      clusterNumber: '02',
      targetPillar: 'ps1',
      name: 'Photos vs. reality discrepancy',
      tension: 'Wide-angle lenses and filtered photos hide small rooms, low natural light, and poor water pressure.',
      status: 'picked',
      pillarTag: 'Solved in Redesign · PS1',
      quote: '"Most listings only show 4 or 5 bright photos that make the room look twice as big as it actually is."'
    },
    {
      id: 5,
      clusterNumber: '03',
      targetPillar: 'ps34',
      name: 'Notification spam & alert fatigue',
      tension: 'Daily push alerts for already-seen or irrelevant flats push users to turn off notifications entirely.',
      status: 'picked',
      pillarTag: 'Solved in Redesign · PS4',
      quote: '"I muted all notifications because it kept pinging me about places I had already seen or rejected."'
    },
    {
      id: 1,
      clusterNumber: '04',
      targetPillar: null,
      name: 'Unrealistic budget expectations',
      tension: 'Expecting prime tech corridor locations at low rents (a market reality, not a UX issue).',
      status: 'parked',
      pillarTag: 'Parked · Market Reality',
      quote: '"I expected a 2BHK in Indiranagar for 25k and thought the filters were hiding the good deals."'
    },
    {
      id: 4,
      clusterNumber: '05',
      targetPillar: null,
      name: 'Landlord & broker contact anxiety',
      tension: 'Fear of aggressive calls from third-party agents after entering a phone number.',
      status: 'parked',
      pillarTag: 'Parked · Offline Brokers',
      quote: '"Whenever I enter my number, three different brokers call me within ten minutes asking for requirements."'
    },
    {
      id: 6,
      clusterNumber: '06',
      targetPillar: null,
      name: 'High security deposit worries',
      tension: 'Fear of losing 10-month rental deposits upon move-out (a legal & contract issue).',
      status: 'parked',
      pillarTag: 'Parked · Tenancy Law',
      quote: '"My biggest fear isn\'t finding the flat, it\'s whether I will get my two-lakh deposit back when I leave."'
    },
    {
      id: 7,
      clusterNumber: '07',
      targetPillar: null,
      name: 'Already-rented flats left live',
      tension: 'Landlords leave listings up for weeks after leasing them out, creating ghost ads.',
      status: 'parked',
      pillarTag: 'Parked · Post-Move Delisting',
      quote: '"Out of every five owners I call, two or three have already rented the place out weeks ago."'
    }
  ];

  const handleClusterClick = (cluster) => {
    playSound('pop', soundEnabled);
    if (cluster.targetPillar && onSelectSolvedPillar) {
      onSelectSolvedPillar(cluster.targetPillar);
    }
  };

  return (
    <section className="py-16 border-b border-zinc-200 dark:border-zinc-800 relative space-y-12">
      {/* Section 03 Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold mb-2">
          <Sparkle size={14} weight="fill" />
          <span>03 · Synthesis & Affinity Mapping</span>
        </div>
        <KineticHeading 
          as="h2"
          text="Sorting Research into 7 Behavioral Patterns"
          className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight"
        />
        <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg max-w-4xl mt-2 leading-relaxed">
          From 52 surveys and 7 interviews, tenant frustrations fell into <strong>7 distinct patterns</strong>. To create real impact rather than shallow tweaks, I focused on <strong>three core product failures</strong> and parked external market and legal issues.
        </p>
      </div>

      {/* Kicker Header - Positioned OUTSIDE the image container */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-500 font-bold">
          <UsersThree size={18} weight="bold" />
          <span>The 7 Behavioral Patterns</span>
        </div>

        {/* Scroll-Driven Progressive Disclosure Container */}
        <div ref={scrollSectionRef} className="relative h-[240vh]">
          <div className="sticky top-20 sm:top-24 w-full">
            {/* Background Image Frame: Full Image Seen Clear without Dark Overlay */}
            <div className="rounded-3xl sm:rounded-4xl overflow-hidden relative border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl min-h-[460px] sm:min-h-[540px] flex items-end pb-8 sm:pb-10 pt-36 sm:pt-48">
              <img 
                src="/illustrations/fdgdfgdfg.jpg" 
                alt="Behavioral Patterns Synthesis Background" 
                className="absolute inset-0 w-full h-full object-cover object-top"
              />

              {/* Progressive Disclosure Cards Track - Clipped cleanly at the rounded image container edge */}
              <div className="relative z-10 w-full overflow-hidden">
                <div 
                  ref={trackRef} 
                  className="flex items-stretch gap-6 sm:gap-8 w-max will-change-transform py-2 pl-8 sm:pl-14 pr-8 sm:pr-14"
                >
                  {clusters.map((cluster) => {
                    const isPicked = cluster.status === 'picked';

                    return (
                      <div
                        key={cluster.id}
                        onClick={() => isPicked && handleClusterClick(cluster)}
                        className={`w-[340px] sm:w-[420px] md:w-[460px] shrink-0 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-2xl relative ${
                          isPicked ? 'cursor-pointer hover:border-orange-500/50' : ''
                        } ${
                          /* Darker black background with 95% opacity and added layer blur */
                          'bg-black/[0.95] backdrop-blur-2xl border border-white/10'
                        }`}
                      >
                        <div className="space-y-4">
                          {/* Top Tag & Optional Solution Link */}
                          <div className="flex items-center justify-between gap-2">
                            <span className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full font-bold ${
                              isPicked 
                                ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                                : 'bg-white/10 text-zinc-300 border border-white/15'
                            }`}>
                              {cluster.pillarTag}
                            </span>

                            {isPicked && (
                              <span className="text-xs font-mono text-orange-400 font-bold flex items-center gap-1 hover:text-orange-300 transition-colors">
                                View Solution <ArrowRight size={12} weight="bold" />
                              </span>
                            )}
                          </div>

                          {/* Pattern Name */}
                          <h4 className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight leading-snug">
                            {cluster.name}
                          </h4>

                          {/* Tension / Problem Summary */}
                          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                            {cluster.tension}
                          </p>

                          {/* Real Tenant Quote */}
                          <blockquote className="text-xs sm:text-sm text-zinc-400 italic pt-3 border-t border-white/10 leading-relaxed">
                            {cluster.quote}
                          </blockquote>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 04: Deriving the Problem Statements & North Star Alignment */}
      <div className="space-y-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/80">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold mb-2">
            <Sparkle size={14} weight="fill" />
            <span>04 · Goals & Metric Framework</span>
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
                  Successful Move-Ins (Search-to-Lease Velocity)
                </h4>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  The speed and ease with which a renter finds, visits, and leases a verified flat without broker fees—compressing Bangalore's grueling <strong>24-day fragmented search down to under 7 days</strong>.
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
                  01 · Commute Checks (PS2)
                </span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Renters check rush-hour travel times <strong>directly inside search</strong> (0% Google Maps exit rate).
                </p>
              </div>

              {/* Lever 2 */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 block">
                  02 · Visit-to-Lease Rate (PS1)
                </span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Physical visits that lead to a rental offer, eliminating <strong>wasted trips to misleading flats</strong>.
                </p>
              </div>

              {/* Lever 3 */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 block">
                  03 · Alert-to-Contact Speed (PS4)
                </span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Renters reaching landlords within <strong>15 minutes</strong> of a verified listing going live.
                </p>
              </div>

              {/* Lever 4 */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 block">
                  04 · Move-In Services
                </span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Renters booking <strong>rental agreements, packers & movers, and deep cleaning</strong>.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
