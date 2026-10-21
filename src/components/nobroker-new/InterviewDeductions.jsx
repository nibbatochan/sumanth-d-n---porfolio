import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UsersThree, ArrowRight, CaretRight } from '@phosphor-icons/react';
import { playSound } from '../../utils/sound';
import { KineticHeading } from '../../utils/motion';

gsap.registerPlugin(ScrollTrigger);

export const InterviewDeductions = ({ soundEnabled, onSelectSolvedPillar }) => {
  const scrollSectionRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = scrollSectionRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!section || !sticky || !track) return;

    // Detect the real scroll container (.overflow-y-auto in App.jsx or window)
    const scroller = section.closest('.overflow-y-auto') || window;

    let rafId = null;

    const updateTrackPosition = () => {
      const sectionRect = section.getBoundingClientRect();
      const stickyRect = sticky.getBoundingClientRect();
      const vh = window.innerHeight;
      const cardHeight = stickyRect.height || sticky.offsetHeight;

      // The exact Y position in the viewport where the card centers and locks:
      const centerLockY = Math.max(72, (vh - cardHeight) / 2);

      // Calculate total horizontal travel
      const trackWidth = track.scrollWidth;
      const containerWidth = track.parentElement?.clientWidth || window.innerWidth;
      const maxTravel = Math.max(0, trackWidth - containerWidth + 40);

      // If the section top is still below the center lock point (i.e. entering from below)
      if (sectionRect.top >= centerLockY) {
        // Firmly clamp at 0 so Card 1 & Card 2 are 100% visible and undisturbed
        gsap.set(track, { x: 0 });
        return;
      }

      // Total distance the card remains locked in the center
      const totalStuckDist = Math.max(1, sectionRect.height - cardHeight);
      const scrolledPastLock = centerLockY - sectionRect.top;
      const rawProgress = Math.min(1, Math.max(0, scrolledPastLock / totalStuckDist));

      // 6% entry cushion so cards 1 & 2 rest calmly when the section locks,
      // and 6% exit cushion so the final cards rest before scrolling away
      let progress = 0;
      if (rawProgress <= 0.06) {
        progress = 0;
      } else if (rawProgress >= 0.94) {
        progress = 1;
      } else {
        progress = (rawProgress - 0.06) / 0.88;
      }

      const targetX = -progress * maxTravel;
      
      if (progress === 0) {
        gsap.set(track, { x: 0 });
      } else {
        gsap.to(track, {
          x: targetX,
          duration: 0.15,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      }
    };

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateTrackPosition);
    };

    scroller.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial positioning check
    handleScroll();

    // Re-check after images/fonts settle
    const t1 = setTimeout(handleScroll, 100);
    const t2 = setTimeout(handleScroll, 400);
    const t3 = setTimeout(handleScroll, 1000);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      scroller.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // The 7 Simplified Behavioral Affinity Clusters from Interviews
  const clusters = [
    {
      id: 3,
      clusterNumber: '01',
      targetPillar: 'ps2',
      name: 'Leaving the app for commute & traffic',
      tension: '24 of 37 searchers constantly left for Maps. Only 10 of the 31 who left came back and decided.',
      status: 'picked',
      isPrimary: true,
      pillarTag: 'Solved in Redesign · Problem 1',
      quote: '"I always switch to Google Maps to check how long it actually takes to get to my office at 9 AM."'
    },
    {
      id: 2,
      clusterNumber: '02',
      targetPillar: 'ps1',
      name: 'Photos vs. reality discrepancy',
      tension: '11 of 15 people who had not searched yet wanted real photos upfront. Two interviews described trips to flats that looked nothing like their listings.',
      status: 'picked',
      pillarTag: 'Solved in Redesign · Problem 2',
      quote: '"Some had one or two photos of the hall, and even lower ones didn\'t even have any. So I completely skipped those."'
    },
    {
      id: 5,
      clusterNumber: '03',
      targetPillar: 'ps34',
      name: 'Notification spam & alert fatigue',
      tension: 'Of 37 searchers, 8 said alerts came too late and 8 turned them off.',
      status: 'picked',
      pillarTag: 'Solved in Redesign · Problem 3',
      quote: '"I muted all notifications because it kept pinging me about places I had already seen or rejected."'
    },
    {
      id: 1,
      clusterNumber: '04',
      targetPillar: null,
      name: 'Unrealistic budget expectations',
      tension: 'Budgets are set by agents and owners, so the product cannot change this.',
      status: 'parked',
      pillarTag: 'Parked · Not the product’s call',
      quote: '"I expected a 2BHK in Indiranagar for 25k and thought the filters were hiding the good deals."'
    },
    {
      id: 4,
      clusterNumber: '05',
      targetPillar: null,
      name: 'Landlord & broker contact anxiety',
      tension: 'This only arises once you contact them, so the product cannot change it.',
      status: 'parked',
      pillarTag: 'Parked · Not the product’s call',
      quote: '"Whenever I enter my number, three different brokers call me within ten minutes asking for requirements."'
    },
    {
      id: 6,
      clusterNumber: '06',
      targetPillar: null,
      name: 'High security deposit worries',
      tension: 'The deposit is the owner’s to set.',
      status: 'parked',
      pillarTag: 'Parked · Not the product’s call',
      quote: '"My biggest fear isn\'t finding the flat, it\'s whether I will get my two-lakh deposit back when I leave."'
    },
    {
      id: 7,
      clusterNumber: '07',
      targetPillar: null,
      name: 'Already-rented flats left live',
      tension: 'A data gap. Listings do not update in real time, and only an agent can close one. First thing I would tackle next.',
      status: 'parked',
      pillarTag: 'Parked · A data gap',
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
    <section className="py-12 border-b border-zinc-200 dark:border-zinc-800 relative space-y-12">
      {/* Scroll-Driven Progressive Disclosure Container */}
      <div ref={scrollSectionRef} className="relative h-[280vh]">
        <div 
          ref={stickyRef} 
          style={{ top: 'max(72px, calc(50vh - 270px))' }}
          className="sticky w-full space-y-4 sm:space-y-6"
        >
          {/* Section 03 Header - Locked with the container */}
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold mb-2">
              <CaretRight size={14} weight="bold" />
              <span>03 · Synthesis & Affinity Mapping</span>
            </div>
            <KineticHeading 
              as="h2"
              text="Sorting Research into 7 Behavioral Patterns"
              className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight"
            />
            <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base max-w-4xl mt-2 leading-relaxed">
              Across 52 surveys and 7 interviews, tenant frustrations grouped into <strong>7 distinct patterns</strong>. I focused on <strong>three problems</strong> I could solve directly in the product and parked the market and legal issues outside our control.
            </p>
          </div>

          {/* Background Image Frame: Full Image Seen Clear without Dark Overlay */}
          <div className="rounded-3xl sm:rounded-4xl overflow-hidden relative border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl min-h-[420px] sm:min-h-[480px] flex items-end pb-6 sm:pb-8 pt-24 sm:pt-32">
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
    </section>
  );
};
