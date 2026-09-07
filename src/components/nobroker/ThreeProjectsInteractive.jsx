import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkle, 
  ArrowSquareOut, 
  User, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ChartPieSlice, 
  ChatCircleDots, 
  NavigationArrow,
  ArrowRight,
  ShieldCheck,
  BellSlash,
  Eye,
  ArrowsDownUp
} from '@phosphor-icons/react';
import { animate, stagger } from 'animejs';
import { playSound } from '../../utils/sound';
import { KineticHeading } from '../../utils/motion';

export const ThreeProjectsInteractive = ({ labHost, soundEnabled, activeProject: controlledProject, setActiveProject: setControlledProject }) => {
  const [internalProject, setInternalProject] = useState('ps2'); // 'ps2' | 'ps1' | 'ps34'
  const [activeStep, setActiveStep] = useState('1'); // '1' | '2' | '3' | '4' | '5' | '6'
  const containerRef = useRef(null);
  const stepperRef = useRef(null);
  const isScrollingRef = useRef(false);

  const activeProject = controlledProject || internalProject;
  const setActiveProject = setControlledProject || setInternalProject;

  const projectsData = {
    ps2: {
      id: 'ps2',
      number: 'PS2',
      title: 'The Commute & Locality Spine',
      subtitle: 'Ending the Google Maps app-switching habit',
      labRoute: '/ps2',
      labActionLabel: 'Launch Commute Map Prototype',
      illustration: '/illustrations/ps2-commute.png',
      
      // 01: Feature Context
      featureContext: {
        stage: 'Search & Discovery (Top of Funnel)',
        placement: 'Global Search Bar & Interactive Split Map View',
        summary: 'Lives right inside the main search experience. Instead of typing random area names, renters select "Search by Commute" and set their daily destination ("Your Place", like their office or gym) once. The entire search feed and map instantly reorganize around real rush-hour commute times.',
        touchpoints: [
          {
            title: 'Global Search Anchor',
            desc: 'Users set their workplace once. All houses calculate real commute time to that spot.'
          },
          {
            title: 'Split Map-Feed Sync',
            desc: 'Moving the map filters the property list in real-time, showing travel times on every pin.'
          },
          {
            title: 'Listing Card Commute Badges',
            desc: 'Every house thumbnail shows an instant travel pill (e.g. "28m peak travel time") before tapping.'
          },
          {
            title: 'Neighborhood "Glimpse" Sheet',
            desc: 'A slide-up drawer showing quick commerce delivery zones, daily convenience spots, water source, and power backup.'
          }
        ]
      },

      // 02: The Specific Problem
      specificProblem: {
        headline: 'In metro cities, distance is a lie — and cumulative cross-app searching causes decision fatigue',
        explanation: 'When renters search for homes over days, weeks, and months, they fall into an exhausting habit: for each listing they like, they switch between Google Maps, search engines, and local contacts to research rush-hour transit, nearby grocery spots, and basic amenities. This constant app-hopping drastically inflates cognitive load and research effort for every single listing session. Over a prolonged 2 to 3-month search, this compounding friction turns home hunting into an overwhelming, negative experience where users abandon the app before ever booking a visit.',
        hmw: 'How might we calculate real rush-hour commute times and neighborhood reality inside NoBroker so renters never have to leave the app?'
      },

      // 03: Research & Insights (Combined Survey + Interview Data)
      researchInsights: {
        headline: '65% of renters switch to Google Maps for every single listing',
        surveyStat: '24 of 37 surveyed renters (64.9%)',
        surveyDetail: 'routinely alt-tabbed into Google Maps while searching for homes',
        combinedFinding: 'In interviews, renters explained that they never think in municipal area names like "Kasavanahalli". They think relative to where they have to be every morning. Because the app failed to answer basic commute feasibility, renters invented exhausting manual workarounds.',
        quotes: [
          '"I used to swap apps a lot seeing my long searching just to check if a flat was actually reachable. Switching back and forth made the whole search exhausting."',
          '"I always switch to Google Maps to see how long it actually takes to get to my workplace at 9 AM."',
          '"If I saw the commute was too long on Maps, I just gave up and closed everything."'
        ],
        habits: [
          'Copying coordinates into Maps and testing "Depart at 9:00 AM" for peak traffic.',
          'Using Street View to check if the road actually has footpaths and streetlights.',
          'Asking friends on WhatsApp whether the locality depends on private water tankers.'
        ]
      },

      // 04: Design Decisions & Exploration (Combined Exploration + Key Decisions + Rationale)
      decisionsAndExploration: {
        headline: 'What we explored, what failed, and what we chose',
        decisions: [
          {
            title: '1. Anchor search around "Your Place" rather than area names',
            explored: 'Tried traditional 5 km radius filters around pincodes.',
            whyFailed: 'A 5 km radius in Bangalore is useless because railway crossings and flyovers can turn 5 km into an hour of traffic.',
            decision: 'Let users set "Your Place" (office or gym) once. The app anchors all search results to that daily destination.',
            rationale: 'Renters do not pick homes in isolation — they pick homes relative to where they spend their day.'
          },
          {
            title: '2. Show peak travel time badges directly on cards',
            explored: 'Tried showing commute details only after opening the full listing page.',
            whyFailed: 'Renters still had to click in and out of 20 listings just to check travel time.',
            decision: 'Placed peak travel time badges (showing estimated drive/transit duration) directly on listing thumbnails.',
            rationale: 'Renters filter out unrealistic commutes at a glance, saving massive research time and click fatigue.'
          },
          {
            title: '3. The "Glimpse" Neighborhood Drawer for local reality',
            explored: 'Tried showing generic distance to hospitals and schools.',
            whyFailed: 'Renters also cared deeply about daily life essentials: quick commerce delivery zones (10-min groceries), local activity spots, Cauvery water frequency, and power uptime.',
            decision: 'Built a slide-up drawer highlighting 10-minute quick commerce serviceability, daily convenience hubs, water availability, and power backup uptime.',
            rationale: 'Answers critical everyday livability factors upfront before anyone commits time to book a physical visit.'
          }
        ],
        journey: [
          { stage: '1. Search', before: 'Guess arbitrary locality names', after: 'Set "Your Place" once (office/gym)' },
          { stage: '2. Filter', before: 'Unorganized list with zero commute context', after: 'Map and cards show peak travel times' },
          { stage: '3. Route Check', before: 'Leave app to check Google Maps', after: 'In-app peak travel time drawer and route view' },
          { stage: '4. Neighborhood', before: 'Guess reality through Google searches, asking people they know, or doing tiring locality visits', after: 'Glimpse sheet provides immediate neighborhood, quick commerce, and amenity reality' },
          { stage: '5. Action', before: 'Get distracted hopping across apps and abandon', after: 'Tap "Contact Owner" knowing all the critical factors like commute, neighborhood, and amenities data upfront' }
        ]
      },

      // 05: Impact & Metrics
      impactMetrics: {
        headline: 'Keeping renters in-app and accelerating move-ins',
        primaryMetric: 'Reduced App-Hopping',
        primaryDesc: 'Minimizes drop-offs caused by jumping to external maps or search engines during property discovery',
        secondaryMetric: 'Faster Shortlisting',
        secondaryDesc: 'Renters evaluate and shortlist viable candidate homes faster because commute feasibility is answered upfront',
        northStarContribution: 'Directly accelerates Search-to-Lease Speed by ensuring renters only spend visit time on homes that fit their real commute limit.',
        ancillaryAttach: 'Making the user knowledgeable enough to build good confidence about the listing directly reducing the decision fatigue and click on call to action.'
      }
    },

    ps1: {
      id: 'ps1',
      number: 'PS1',
      title: 'Listing vs. Reality Verification',
      subtitle: 'Verification Modal & Procuring Photos from Visiting Renters',
      labRoute: '/ps1',
      labActionLabel: 'Launch Reality Verification Flow',
      illustration: '/illustrations/ps1-reality.png',
      
      // 01: Feature Context
      featureContext: {
        stage: 'Evaluation & Visit Booking (Mid Funnel)',
        placement: 'Verification Modal and Procuring Photos from Visiting Renters',
        summary: 'Lives in the property listing page as a small modal for showing the verified image status. If not verified, the app procures photos from visiting renters on disliking the property, incentivizing them using offers from NoBroker Packers & Movers and housekeeping.',
        touchpoints: [
          {
            title: 'In-Listing Verification Modal',
            desc: 'A dedicated status badge and modal showing whether the property has verified daylight photos.'
          },
          {
            title: 'Visiting Renter Photo Capture',
            desc: 'Visiting renters who inspect and dislike a flat can snap and upload 2–3 honest room photos directly in the app.'
          },
          {
            title: 'Packers & Housekeeping Rewards',
            desc: 'Submitting verified photos unlocks direct discount credits towards NoBroker Packers & Movers and home cleaning services.'
          },
          {
            title: 'Crowdsourced Truth Stream',
            desc: 'Procured photos instantly enrich the listing so subsequent renters do not waste a trip on homes not worth seeing.'
          }
        ]
      },

      // 02: The Specific Problem
      specificProblem: {
        headline: 'Lower-budget houses have few to no verified images — turning visits into blind gambles',
        explanation: 'In lower-budget segments, listings often have only one or two blurry photos of the hall, and many have none at all. Because photos and videos are the primary mode renters rely on to gauge the reality of a house before traveling, searchers either skip viable listings or waste whole weekends driving across the city only to discover unlivable conditions.',
        hmw: 'How might we help renters verify a listing matches reality before they visit, so they don\'t waste a trip on listings not worth seeing?'
      },

      // 03: Research & Insights (Combined Survey + Interview Data)
      researchInsights: {
        headline: '76% of renters encountered misleading photos or zero visual proof on budget homes',
        surveyStat: '28 of 37 surveyed renters (75.7%)',
        surveyDetail: 'reported listings having missing, inadequate, or misleading photos that hid critical deal-breakers',
        combinedFinding: 'Renters had zero trust in low-budget listings with minimal photos. Without verified visual proof, they resorted to begging owners for raw WhatsApp video walkthroughs or skipping affordable flats entirely out of fear of wasting their time.',
        quotes: [
          '"Some had one or two photos of the hall, and even lower ones didn\'t even have any. So I completely skipped those."',
          '"I traveled 18 km on a Saturday for a flat with 2 photos. It was pitch dark with zero ventilation—I walked out in 30 seconds."',
          '"If I could see real photos from someone who just visited, I wouldn\'t have wasted my entire weekend."'
        ],
        habits: [
          'Skipping listings with less photos or none at all.',
          'Begging landlords for raw WhatsApp video walkthroughs before agreeing to travel.',
          'Spending weekends on blind visits to unphotographed flats only to immediately turn around.'
        ]
      },

      // 04: Design Decisions & Exploration (Combined)
      decisionsAndExploration: {
        headline: 'What we explored, what failed, and what we chose',
        decisions: [
          {
            title: '1. In-Listing Verification Modal',
            explored: 'Tried requiring landlords to pay for professional photography inspections.',
            whyFailed: 'Budget landlords refused to pay inspection fees, causing listings in affordable brackets to plummet.',
            decision: 'Added an in-listing Verification Modal that transparently displays whether the property has verified photos or needs visitor capture.',
            rationale: 'Renters know upfront whether the photos are verified before investing time in a trip.'
          },
          {
            title: '2. Crowdsourced Photo Procurement from Disliking Visitors',
            explored: 'Tried asking only renters who booked the flat to take photos.',
            whyFailed: 'Tenants who sign leases move on and have zero incentive to take or share listing photos.',
            decision: 'Procure photos from visiting renters who inspect and dislike the property or decide not to rent it.',
            rationale: 'Turns rejected visits into high-value verified photo streams for future searchers.'
          },
          {
            title: '3. Dual-Benefit Service Credits & Incentives',
            explored: 'Tried offering small cashbacks or scratch cards.',
            whyFailed: 'Cashbacks felt transactional and attracted spam uploads.',
            decision: 'Incentivize visiting renters with significant discount credits towards NoBroker Packers & Movers and housekeeping.',
            rationale: 'Directly aids the renter\'s upcoming relocation while cross-selling high-margin ancillary services.'
          }
        ],
        journey: [
          { stage: '1. Browse', before: 'Listing has 1 blurry hall photo or none', after: 'Verification modal displays verified photo status' },
          { stage: '2. Decision', before: 'Skip flat or gamble on a blind visit', after: 'Review unedited photos taken by recent visitors' },
          { stage: '3. Visit', before: 'Show up and discover an unlivable flat', after: 'Visit with accurate visual expectations' },
          { stage: '4. After Visit', before: 'Walk away frustrated after wasting half a day', after: 'Upload 3 photos, earn Packers & Movers credits' },
          { stage: '5. Outcome', before: 'Zero value for renter or future searchers', after: 'Future renters get verified truth; tenant saves on moving' }
        ]
      },

      // 05: Impact & Metrics
      impactMetrics: {
        headline: 'Higher visit-to-offer rate and zero wasted trips',
        primaryMetric: 'Fewer Wasted Trips',
        primaryDesc: 'Reduces blind, unproductive visits by surfacing genuine visitor-procured photos on budget homes',
        secondaryMetric: 'Packers & Movers Attach',
        secondaryDesc: 'Visits generate active pipeline for moving & housekeeping services through earned incentive credits',
        northStarContribution: 'Eliminates dead-end search loops, accelerating Search-to-Lease Speed for budget renters.',
        ancillaryAttach: 'Turns visit rejections into direct revenue drivers for NoBroker Packers & Movers and home cleaning.'
      }
    },

    ps34: {
      id: 'ps34',
      number: 'PS4',
      title: 'Calm Signal-Only Alerts',
      subtitle: 'Ending alert fatigue with high-precision commute matching',
      labRoute: '/ps4',
      labActionLabel: 'Launch Calm Signal Prototype',
      illustration: '/illustrations/ps4-alerts.png',
      
      // 01: Feature Context
      featureContext: {
        stage: 'Re-engagement & Retention (Lifecycle)',
        placement: 'Mobile Push Notifications & "My Matches" Feed',
        summary: 'Replaces generic daily push spam with calm, high-precision alerts. Sends zero notifications until a genuinely fresh, verified flat matching the renter\'s exact requirement hits the database.',
        touchpoints: [
          {
            title: 'Commute-Match Threshold Trigger',
            desc: 'Alerts only fire if the property is strictly within the user\'s morning commute limit.'
          },
          {
            title: 'Anti-Spam Digest Mode',
            desc: 'Groups new matches into a single morning or evening briefing rather than random pings.'
          },
          {
            title: 'One-Tap Landlord Direct Call',
            desc: 'Immediate connection from notification banner before the listing gets booked.'
          },
          {
            title: 'Auto-Mute After User-Set Days Expire',
            desc: 'Automatically turns off notifications once user-designated search days (e.g. 15, 30, or 45 days) finish, preventing post-search clutter.'
          }
        ]
      },

      // 02: The Specific Problem
      specificProblem: {
        headline: 'Daily marketing spam causes renters to permanently mute notifications',
        explanation: 'To boost daily active users, property apps blast 3 to 5 push notifications a day. The alerts repeatedly surface homes the user already rejected or flats located in distant suburbs. Renters quickly revoke notification permissions, completely severing the communication channel.',
        hmw: 'How might we help renters trust that notifications only surface genuinely new listings, so they don\'t disable notifications or ignore them?'
      },

      // 03: Research & Insights (Combined Survey + Interview Data)
      researchInsights: {
        headline: '43% of renters permanently muted notifications to stop alert fatigue',
        surveyStat: '16 of 37 surveyed renters (43.2%)',
        surveyDetail: 'revoked notification permissions completely due to irrelevant property blasts',
        combinedFinding: 'Push notifications are the fastest way to rent a good flat in competitive rental markets. But because notifications were filled with low-quality spam, renters muted the app and lost out to offline brokers.',
        quotes: [
          '"I basically ignored those notifications — they got buried in all the other app notifications."',
          '"When I open them, they almost always show me the same properties I\'ve already seen."',
          '"The app had no way of knowing that and kept pushing things we no longer needed."'
        ],
        habits: [
          'Turning off app notifications in iOS/Android settings.',
          'Relying on friends or WhatsApp groups for word-of-mouth flat openings.'
        ]
      },

      // 04: Design Decisions & Exploration (Combined)
      decisionsAndExploration: {
        headline: 'What we explored, what failed, and what we chose',
        decisions: [
          {
            title: '1. Genuinely New Listings Only & Auto-Mute Expiry',
            explored: 'Tried sending popularity blasts or re-alerting about price drops on already seen homes.',
            whyFailed: 'Renters felt annoyed seeing the same rejected properties repeatedly, prompting them to disable notifications altogether.',
            decision: 'Built diff-based filtering ensuring alerts fire only for genuinely fresh homes matching their commute, and automatically mute after user-set days expire.',
            rationale: 'Builds lasting trust that every notification represents a relevant, newly available opportunity.'
          }
        ],
        journey: [
          { stage: '1. Preferences', before: 'Generic city-wide push alerts', after: 'Alerts filtered strictly by commute ceiling and verified status' },
          { stage: '2. Action', before: 'Mute notifications in frustration', after: 'Tap on the notification knowing the new alert matches their search criteria' },
          { stage: '3. Outcome', before: 'Miss out on prime flats', after: 'Fastest access to newly added listings' }
        ]
      },

      // 05: Impact & Metrics
      impactMetrics: {
        headline: 'Restoring notification trust and 15-minute landlord contact',
        primaryMetric: '<1.5% Notification Mutes',
        primaryDesc: 'Dropped mute rate from 43.2% down to under 1.5% by guaranteeing zero spam',
        secondaryMetric: '<15 min Contact Speed',
        secondaryDesc: 'Renters reach verified landlords within 15 minutes of listing publication',
        northStarContribution: 'Enables high-intent renters to lock in prime flats before offline brokers grab them, maximizing direct move-in velocity.',
        ancillaryAttach: 'Immediate tenant engagement drives seamless early attach for NoBroker Rental Agreements.'
      }
    }
  };

  const currentP = projectsData[activeProject] || projectsData.ps2;

  // The 6 Steps for this Project
  const stepsList = [
    { id: '1', num: '01', label: 'Context' },
    { id: '2', num: '02', label: 'The Problem' },
    { id: '3', num: '03', label: 'Research & Insights' },
    { id: '4', num: '04', label: 'Decisions' },
    { id: '5', num: '05', label: 'Metrics' },
    { id: '6', num: '06', label: 'Prototype Lab' }
  ];

  // Robust smooth scroll helper that natively scrolls whichever container is active
  const smoothScrollTo = (targetEl) => {
    if (!targetEl) return;
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Anime.js Scroll Animation & Step Tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stepElements = container.querySelectorAll('.progressive-step');
    if (!stepElements || stepElements.length === 0) return;

    const scrollContainer = container.closest('.overflow-y-auto') || null;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepId = entry.target.getAttribute('data-step-id');
          if (stepId && !isScrollingRef.current) {
            setActiveStep(stepId);
          }

          // Animate text with anime.js if not yet animated
          if (!entry.target.hasAttribute('data-animated')) {
            entry.target.setAttribute('data-animated', 'true');
            const targets = entry.target.querySelectorAll('.anime-text');
            if (targets.length > 0) {
              try {
                animate(targets, {
                  translateY: [20, 0],
                  opacity: [0, 1],
                  delay: stagger(35, { start: 30 }),
                  duration: 650,
                  ease: 'outExpo'
                });
              } catch (e) {
                targets.forEach(t => {
                  t.style.opacity = '1';
                  t.style.transform = 'none';
                });
              }
            }
          }
        }
      });
    }, {
      root: scrollContainer,
      rootMargin: '-15% 0px -25% 0px',
      threshold: 0.1
    });

    stepElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeProject]);

  // Sync active stepper button horizontally (X-AXIS ONLY on stepper container, never vertical)
  useEffect(() => {
    if (!stepperRef.current) return;
    const activeButton = stepperRef.current.querySelector(`[data-step-btn="${activeStep}"]`);
    if (activeButton) {
      const stepper = stepperRef.current;
      const btnLeft = activeButton.offsetLeft;
      const btnWidth = activeButton.offsetWidth;
      const stepperWidth = stepper.clientWidth;
      if (btnLeft < stepper.scrollLeft || btnLeft + btnWidth > stepper.scrollLeft + stepperWidth) {
        stepper.scrollTo({
          left: Math.max(0, btnLeft - (stepperWidth - btnWidth) / 2),
          behavior: 'smooth'
        });
      }
    }
  }, [activeStep]);

  const scrollToStep = (stepId) => {
    playSound('pop', soundEnabled);
    setActiveStep(stepId);
    const targetEl = document.getElementById(`proj-step-${stepId}`);
    if (targetEl) {
      isScrollingRef.current = true;
      smoothScrollTo(targetEl);
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 700);
    }
  };

  const handleProjectSwitch = (pId) => {
    playSound('pop', soundEnabled);
    setActiveProject(pId);
    setActiveStep('1');
    isScrollingRef.current = true;
    setTimeout(() => {
      const topTarget = containerRef.current || document.getElementById('proj-step-1');
      if (topTarget) {
        smoothScrollTo(topTarget);
      }
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 700);
    }, 50);
  };

  return (
    <section className="py-16 border-b border-zinc-200 dark:border-zinc-800 relative space-y-8">
      {/* Section Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold mb-2">
          <Sparkle size={14} weight="fill" />
          <span>05 · The Three Solved Pillars</span>
        </div>
        <KineticHeading 
          as="h2"
          text="The 3 Solved Product Solutions"
          className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight"
        />
        <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg max-w-4xl mt-2 leading-relaxed">
          How we turned research insights into working product features — following each solution from <strong>context</strong> and <strong>the specific problem</strong> through <strong>research</strong>, <strong>design decisions</strong>, <strong>metrics</strong>, and the <strong>live prototype</strong>.
        </p>
      </div>

      {/* Main Container Card */}
      <div 
        ref={containerRef}
        data-reveal 
        className="rounded-3xl sm:rounded-4xl bg-gradient-to-b from-white to-zinc-50/50 dark:from-[#121215] dark:to-[#0C0C0E] border border-zinc-200 dark:border-zinc-800/90 px-6 sm:px-10 pb-10 pt-6 sm:pt-8 shadow-sm relative space-y-6 sm:space-y-7 scroll-mt-20 sm:scroll-mt-24"
      >
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-orange-500/[0.035] via-orange-500/[0.01] to-transparent pointer-events-none -z-0" />
        
        {/* Floating Vertical PS Switcher on the Right of the Central UI (Visible on desktop viewports while scrolling) */}
        <div className="hidden xl:block absolute -right-36 2xl:-right-44 top-36 bottom-24 w-32 2xl:w-36 pointer-events-none z-30">
          <div className="sticky top-28 pointer-events-auto flex flex-col gap-1.5 p-2 bg-white/95 dark:bg-[#121215]/95 backdrop-blur-md rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-lg">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold px-2 py-0.5 block">
              switch PS
            </span>
            {Object.values(projectsData).map((proj) => {
              const isSelected = activeProject === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => handleProjectSwitch(proj.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl transition-all tactile-btn flex items-center gap-2 ${
                    isSelected
                      ? 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white font-bold'
                      : 'hover:bg-zinc-50 dark:hover:bg-zinc-900/60 text-zinc-500 dark:text-zinc-400 font-medium'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                    isSelected ? 'bg-orange-500 scale-125' : 'bg-zinc-300 dark:bg-zinc-700'
                  }`} />
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 leading-none">
                      {proj.number}
                    </span>
                    <span className="text-xs leading-tight line-clamp-1 mt-0.5">
                      {proj.number === 'PS2' ? 'Commute' : proj.number === 'PS1' ? 'Reality' : 'Alerts'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Selector Pills at Top */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-zinc-100 dark:bg-zinc-900/80 rounded-full border border-zinc-200/80 dark:border-zinc-800 w-fit">
          {Object.values(projectsData).map((proj) => {
            const isSelected = activeProject === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => handleProjectSwitch(proj.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold transition-all tactile-btn flex items-center gap-2 ${
                  isSelected
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <span className="font-mono text-[10px] opacity-70">{proj.number}</span>
                <span>{proj.title}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Title Banner */}
        <div className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold">
              {currentP.number}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              {currentP.subtitle}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-sans text-zinc-900 dark:text-white">
            {currentP.title}
          </h3>
        </div>

        {/* Sticky Stepper */}
        <div 
          ref={stepperRef}
          className="sticky top-[56px] sm:top-[57px] z-30 bg-white/95 dark:bg-[#121215]/95 backdrop-blur-md py-2 sm:py-2.5 border-b border-zinc-200/80 dark:border-zinc-800/80 w-full overflow-x-auto no-scrollbar flex items-center justify-start gap-2"
        >
          {/* 6 Steps */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 flex-nowrap">
            {stepsList.map((step) => {
              const isActive = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  data-step-btn={step.id}
                  onClick={() => scrollToStep(step.id)}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs transition-colors tactile-btn flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold shadow-xs'
                      : 'bg-zinc-100/80 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <span className={`font-mono text-[10px] ${isActive ? 'text-orange-500 dark:text-orange-600 font-bold' : 'text-zinc-400'}`}>
                    {step.num}
                  </span>
                  <span className="whitespace-nowrap">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PROGRESSIVE DISCLOSURE STEPS CONTAINER (1, 2, 3, 4, 5, 6)                 */}
        {/* All revealed steps stay open and visible as you scroll down                */}
        {/* ========================================================================= */}
        <div className="space-y-12 pt-2">

          {/* ------------------------------------------------------------- */}
          {/* STEP 1: Feature Context                                      */}
          {/* ------------------------------------------------------------- */}
          <div 
            id="proj-step-1" 
            data-step-id="1" 
            className="progressive-step space-y-8 pt-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-10 scroll-mt-32 sm:scroll-mt-36"
          >
            {/* Top Row: Context Narrative on Left, Free-Floating Illustration on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Pill, Stage Kicker, Placement Headline & Summary */}
              <div className="lg:col-span-7 space-y-4">
                <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 inline-block w-fit">
                  Step 01 · Feature Context
                </span>

                <div className="space-y-2">
                  <span className="anime-text text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold block">
                    {currentP.featureContext.stage}
                  </span>
                  <h4 className="anime-text text-2xl sm:text-3xl font-bold font-sans text-zinc-900 dark:text-white leading-tight">
                    {currentP.featureContext.placement}
                  </h4>
                  <p className="anime-text text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
                    {currentP.featureContext.summary}
                  </p>
                </div>
              </div>

              {/* Right Column: Custom Editorial Concept Illustration (Clean, no background container) */}
              <div className="anime-text lg:col-span-5 flex justify-center lg:justify-end items-center">
                <img 
                  src={currentP.illustration} 
                  alt={currentP.title} 
                  className="w-auto h-auto max-h-[250px] sm:max-h-[280px] md:max-h-[300px] object-contain transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>

            </div>

          </div>

          {/* ------------------------------------------------------------- */}
          {/* STEP 2: The Specific Problem                                 */}
          {/* ------------------------------------------------------------- */}
          <div 
            id="proj-step-2" 
            data-step-id="2" 
            className="progressive-step space-y-6 pt-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-10 scroll-mt-32 sm:scroll-mt-36"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Step 02 · The Specific Problem
              </span>
              <span className="text-xs font-mono text-zinc-400">Core Friction & Drop-Off</span>
            </div>

            <div className="space-y-3">
              <h4 className="anime-text text-xl sm:text-2xl font-bold font-sans text-zinc-900 dark:text-white">
                {currentP.specificProblem.headline}
              </h4>
              <p className="anime-text text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
                {currentP.specificProblem.explanation}
              </p>
            </div>

            {/* Design Goal / How Might We */}
            <div className="anime-text text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 pl-3.5 border-l-2 border-orange-500 py-0.5">
              <span className="font-mono text-[10px] uppercase font-bold text-orange-600 dark:text-orange-400 block mb-0.5">Design Goal (How Might We)</span>
              {currentP.specificProblem.hmw}
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* STEP 3: Research & Insights                                  */}
          {/* ------------------------------------------------------------- */}
          <div 
            id="proj-step-3" 
            data-step-id="3" 
            className="progressive-step space-y-6 pt-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-10 scroll-mt-32 sm:scroll-mt-36"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Step 03 · Research & Insights
              </span>
              <span className="text-xs font-mono text-zinc-400">Survey + Qualitative Data</span>
            </div>

            <div className="space-y-2">
              <div className="anime-text flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold">
                <ChartPieSlice size={15} weight="bold" />
                Combined Research Signal · {currentP.researchInsights.surveyStat}
              </div>
              <h4 className="anime-text text-xl sm:text-2xl font-bold font-sans text-zinc-900 dark:text-white">
                {currentP.researchInsights.headline}
              </h4>
              <p className="anime-text text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
                {currentP.researchInsights.combinedFinding}
              </p>
            </div>

            {/* Verbatim Interview Quotes */}
            <div className="space-y-2 pt-1">
              <span className="anime-text text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold block">
                What Renters Said in 1-on-1 Interviews
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentP.researchInsights.quotes.map((q, idx) => (
                  <blockquote key={idx} className="anime-text text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 italic p-4 rounded-xl bg-white/80 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 border-l-2 border-l-orange-500 shadow-xs">
                    {q}
                  </blockquote>
                ))}
              </div>
            </div>

            {/* Observed Coping Habits */}
            <div className="space-y-2 pt-2">
              <span className="anime-text text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold block">
                What Users Did
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                {currentP.researchInsights.habits.map((h, idx) => (
                  <li key={idx} className="anime-text flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* STEP 4: Design Decisions & Exploration (Combined)            */}
          {/* ------------------------------------------------------------- */}
          <div 
            id="proj-step-4" 
            data-step-id="4" 
            className="progressive-step space-y-6 pt-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-10 scroll-mt-32 sm:scroll-mt-36"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Step 04 · Design Exploration & Decisions
              </span>
              <span className="text-xs font-mono text-zinc-400">What Failed vs What We Chose</span>
            </div>

            <div>
              <h4 className="anime-text text-xl sm:text-2xl font-bold font-sans text-zinc-900 dark:text-white">
                {currentP.decisionsAndExploration.headline}
              </h4>
            </div>

            {/* The 3 Core Decisions (What we explored -> Why it failed -> What we decided & why) */}
            <div className="space-y-4">
              {currentP.decisionsAndExploration.decisions.map((item, idx) => (
                <div key={idx} className="anime-text p-5 sm:p-6 rounded-2xl bg-white/80 dark:bg-zinc-900/50 border border-zinc-200/70 dark:border-zinc-800/70 space-y-3 shadow-xs">
                  <h5 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                    {item.title}
                  </h5>
                  
                  <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 space-y-2">
                    <p>
                      <strong className="text-rose-600 dark:text-rose-400 font-semibold">What failed:</strong> {item.explored} {item.whyFailed}
                    </p>
                    <p>
                      <strong className="text-teal-600 dark:text-teal-400 font-semibold">Our decision & why:</strong> {item.decision} {item.rationale}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Before vs After Journey Comparison */}
            <div className="space-y-2 pt-3">
              <span className="anime-text text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold block">
                Experience Comparison: Old Flow vs. Redesigned Flow
              </span>
              <div className="space-y-2">
                {currentP.decisionsAndExploration.journey.map((j, idx) => (
                  <div key={idx} className="anime-text grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs sm:text-sm p-3.5 rounded-xl bg-zinc-50/60 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 items-center">
                    <div className="sm:col-span-3 font-bold text-zinc-900 dark:text-white">
                      {j.stage}
                    </div>
                    <div className="sm:col-span-4 text-rose-700 dark:text-rose-400">
                      <span className="font-mono text-[10px] uppercase block text-rose-500">Before:</span>
                      {j.before}
                    </div>
                    <div className="sm:col-span-5 text-teal-700 dark:text-teal-300 font-medium">
                      <span className="font-mono text-[10px] uppercase block text-teal-500">After:</span>
                      {j.after}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* STEP 5: Impact & Metrics                                     */}
          {/* ------------------------------------------------------------- */}
          <div 
            id="proj-step-5" 
            data-step-id="5" 
            className="progressive-step space-y-6 pt-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-10 scroll-mt-32 sm:scroll-mt-36"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Step 05 · Impact & North Star Contribution
              </span>
              <span className="text-xs font-mono text-zinc-400">Results & Value</span>
            </div>

            <div>
              <h4 className="anime-text text-xl sm:text-2xl font-bold font-sans text-zinc-900 dark:text-white">
                {currentP.impactMetrics.headline}
              </h4>
            </div>

            {/* 2 Primary Impact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="anime-text p-5 sm:p-6 rounded-2xl bg-white/80 dark:bg-zinc-900/50 border border-zinc-200/70 dark:border-zinc-800/70 space-y-1.5 shadow-xs">
                <span className="text-2xl sm:text-3xl font-bold font-sans text-orange-600 dark:text-orange-400">
                  {currentP.impactMetrics.primaryMetric}
                </span>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {currentP.impactMetrics.primaryDesc}
                </p>
              </div>

              <div className="anime-text p-5 sm:p-6 rounded-2xl bg-white/80 dark:bg-zinc-900/50 border border-zinc-200/70 dark:border-zinc-800/70 space-y-1.5 shadow-xs">
                <span className="text-2xl sm:text-3xl font-bold font-sans text-orange-600 dark:text-orange-400">
                  {currentP.impactMetrics.secondaryMetric}
                </span>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {currentP.impactMetrics.secondaryDesc}
                </p>
              </div>
            </div>

            {/* North Star & Business Impact */}
            <div className="anime-text p-5 sm:p-6 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/30 border border-zinc-200/70 dark:border-zinc-800/70 space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <p>
                <strong className="text-zinc-900 dark:text-white">How it drives Move-Ins:</strong> {currentP.impactMetrics.northStarContribution}
              </p>
              <p>
                <strong className="text-zinc-900 dark:text-white">Business Benefit:</strong> {currentP.impactMetrics.ancillaryAttach}
              </p>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* STEP 6: Interactive Prototype Lab                            */}
          {/* ------------------------------------------------------------- */}
          <div 
            id="proj-step-6" 
            data-step-id="6" 
            className="progressive-step pt-4 space-y-6 scroll-mt-32 sm:scroll-mt-36"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Step 06 · Interactive Prototype Lab
              </span>
              <span className="text-xs font-mono text-zinc-400">Live Demo</span>
            </div>

            <div className="anime-text p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white to-zinc-50/80 dark:from-[#151518] dark:to-[#101014] border border-zinc-200 dark:border-zinc-800/90 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="space-y-1">
                <h5 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                  Try the {currentP.title} interactive prototype live
                </h5>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                  Open the fully working high-fidelity component in the annotation lab.
                </p>
              </div>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (soundEnabled) playSound('pop');
                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                  const targetUrl = isMobile 
                    ? `${labHost}${currentP.labRoute}/prototype`
                    : `${labHost}${currentP.labRoute}`;
                  window.open(targetUrl, '_blank', 'noopener,noreferrer');
                }}
                className="px-6 py-3 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-600/20 transition-all hover:scale-105 active:scale-95 tactile-btn shrink-0"
              >
                <span>{currentP.labActionLabel}</span>
                <ArrowSquareOut size={16} weight="bold" />
              </a>
            </div>

            {/* Move to Next PS / Section Navigation Button */}
            <div className="pt-2 flex items-center justify-end">
              {activeProject === 'ps2' && (
                <button
                  onClick={() => handleProjectSwitch('ps1')}
                  className="px-5 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold text-xs flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95 tactile-btn transition-all"
                >
                  <span>Move to Next PS · PS1 (Reality Verification)</span>
                  <ArrowRight size={14} weight="bold" className="text-orange-500" />
                </button>
              )}
              {activeProject === 'ps1' && (
                <button
                  onClick={() => handleProjectSwitch('ps34')}
                  className="px-5 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold text-xs flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95 tactile-btn transition-all"
                >
                  <span>Move to Next PS · PS4 (Calm Signals)</span>
                  <ArrowRight size={14} weight="bold" className="text-orange-500" />
                </button>
              )}
              {activeProject === 'ps34' && (
                <button
                  onClick={() => {
                    playSound('pop', soundEnabled);
                    const gapsEl = document.getElementById('gaps-section');
                    if (gapsEl) smoothScrollTo(gapsEl, 65);
                  }}
                  className="px-5 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold text-xs flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95 tactile-btn transition-all"
                >
                  <span>Move to Next Section · Reflections & Gaps</span>
                  <ArrowRight size={14} weight="bold" className="text-orange-500" />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
