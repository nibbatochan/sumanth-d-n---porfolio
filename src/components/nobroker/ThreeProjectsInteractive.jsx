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
            desc: 'Every house thumbnail shows an instant travel pill (e.g. "24m via Bike · 36m via Cab") before tapping.'
          },
          {
            title: 'Neighborhood "Glimpse" Sheet',
            desc: 'A slide-up drawer showing Cauvery water frequency, power backup, and nearest grocery walk.'
          }
        ]
      },

      // 02: The Specific Problem
      specificProblem: {
        headline: 'In metro cities, distance is a lie — and leaving the app kills search momentum',
        explanation: 'A 4 km commute in metro cities like Bangalore can take 15 minutes or 55 minutes depending on bottleneck choke points. Because the app only supported search by municipal area names, renters had to repeatedly copy coordinates into Google Maps to check rush hour delays. This cross-app back-and-forth significantly increased session times, creating severe decision fatigue that caused searchers to abandon the app without booking a single visit.',
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
            decision: 'Placed multi-modal travel badges (Bike, Cab, Metro, Walk) directly on listing thumbnails.',
            rationale: 'Renters filter out impossible commutes at a glance, saving time and click fatigue.'
          },
          {
            title: '3. The "Glimpse" Neighborhood Drawer for local reality',
            explored: 'Tried showing generic distance to hospitals and schools.',
            whyFailed: 'Renters cared far more about Bangalore basics: Cauvery water frequency, power cuts, and daily grocery walkability.',
            decision: 'Built a slide-up drawer showing resident-verified water sources, power backup uptime, and noise levels.',
            rationale: 'Answers the three biggest deal-breakers upfront before anyone books a physical visit.'
          }
        ],
        journey: [
          { stage: '1. Search', before: 'Guess arbitrary locality names', after: 'Set "Your Place" once (office/gym)' },
          { stage: '2. Filter', before: 'Unorganized list with zero commute context', after: 'Map and cards show peak travel times' },
          { stage: '3. Route Check', before: 'Leave app to check Google Maps', after: 'In-app multi-modal route drawer' },
          { stage: '4. Neighborhood', before: 'Guess water/power reality from YouTube', after: 'Glimpse sheet shows water and power uptime' },
          { stage: '5. Action', before: '89% get distracted and abandon', after: 'Tap "Contact Owner" with 100% confidence' }
        ]
      },

      // 05: Impact & Metrics
      impactMetrics: {
        headline: 'Keeping renters in-app and accelerating move-ins',
        primaryMetric: '0% Maps Exit Rate',
        primaryDesc: 'Eliminates 100% of app-switching to external navigation apps during search',
        secondaryMetric: '3.2x More Shortlists',
        secondaryDesc: 'Renters save 3 times more homes per session because commute feasibility is clear upfront',
        northStarContribution: 'Directly accelerates Search-to-Lease Speed by ensuring renters only spend visit time on homes that fit their real commute limit.',
        ancillaryAttach: 'Keeps users in the flow, driving early reservations for NoBroker Packers & Movers.'
      }
    },

    ps1: {
      id: 'ps1',
      number: 'PS1',
      title: 'Listing vs. Reality Verification',
      subtitle: 'Stopping wide-angle lens tricks and ghost listings',
      labRoute: '/ps1',
      labActionLabel: 'Launch Reality Verification Flow',
      illustration: '/illustrations/ps1-reality.png',
      
      // 01: Feature Context
      featureContext: {
        stage: 'Evaluation & Visit Booking (Mid Funnel)',
        placement: 'Property Details Page (PDP) & Visit Scheduling Modal',
        summary: 'Lives inside the property details page. Below owner photos, renters can switch to "Verified Reality" to see unedited daylight pictures, true usable floor space, and reports from real visitors who checked in via GPS.',
        touchpoints: [
          {
            title: 'Unedited Daylight Stream',
            desc: 'Photos taken at noon without beauty filters or artificial HDR lighting.'
          },
          {
            title: 'True Carpet Ratio & Floorplan',
            desc: 'Clear breakdown of usable carpet area vs. advertised super built-up square footage.'
          },
          {
            title: 'GPS Visitor Verification Log',
            desc: 'Checklists filled out by previous tenants who physically checked in at the property.'
          },
          {
            title: 'Water Pressure & Dampness Check',
            desc: 'Specific ratings for bathroom water flow, wall seepage, and mobile network reception.'
          }
        ]
      },

      // 02: The Specific Problem
      specificProblem: {
        headline: 'Misleading wide-angle photos and already-rented listings waste weekends',
        explanation: 'Landlords and brokers upload wide-angle photos that make cramped rooms look twice as big. Renters waste entire weekends driving across the city only to discover dark rooms, damp walls, or that the flat was leased two weeks earlier.',
        hmw: 'How might we show unedited ground truth (true room sizes, daylight, and water pressure) verified by previous visitors before anyone travels across town?'
      },

      // 03: Research & Insights (Combined Survey + Interview Data)
      researchInsights: {
        headline: '76% of renters called owners only to find the flat was already taken',
        surveyStat: '28 of 37 surveyed renters (75.7%)',
        surveyDetail: 'reported contacting owners for flats that were already leased weeks ago',
        combinedFinding: 'Renters had zero trust in listing photos. To cope, they begged landlords for raw WhatsApp video walkthroughs or used Street View to see if the building actually had decent road access.',
        quotes: [
          '"I used to swap apps a lot seeing my long searching, checking Street View and WhatsApp videos to see if the place was even real."',
          '"I started asking landlords to send a 10-second video on WhatsApp before I booked any visit."',
          '"Out of every 5 people I contacted, 2 or 3 had already rented the place out days ago."'
        ],
        habits: [
          'Asking landlords for unedited video walkthroughs on WhatsApp.',
          'Checking Google Street View for road width, garbage spots, and construction noise.',
          'Asking about water tanker dependence and power backup before agreeing to visit.'
        ]
      },

      // 04: Design Decisions & Exploration (Combined)
      decisionsAndExploration: {
        headline: 'What we explored, what failed, and what we chose',
        decisions: [
          {
            title: '1. Verified Reality tab alongside owner photos',
            explored: 'Tried completely deleting owner photos and requiring professional inspection photos.',
            whyFailed: 'Owners refused to list if their initial photos were blocked, slowing down listing growth.',
            decision: 'Kept owner photos but added an official "Verified Reality" toggle showing unedited photos taken by physical visitors.',
            rationale: 'Renters get immediate honest contrast between marketing photos and real daylight.'
          },
          {
            title: '2. GPS-verified visitor checklists',
            explored: 'Tried relying on online reviews written from home.',
            whyFailed: 'Unverified reviews are easily spammed by friends or competing brokers.',
            decision: 'Allowed checklists only from users whose phone GPS confirmed they were physically at the property.',
            rationale: 'Provides 100% trustworthy verification on water pressure, cell reception, and dampness.'
          },
          {
            title: '3. Usable carpet area visualizer',
            explored: 'Tried showing only square footage numbers in the specs table.',
            whyFailed: 'Renters do not understand the difference between 750 super built-up vs 520 usable carpet area.',
            decision: 'Created a visual room proportion diagram showing real bed and desk fit.',
            rationale: 'Ends the "it looked bigger in photos" shock on arrival.'
          }
        ],
        journey: [
          { stage: '1. Browse', before: 'Misled by 3 wide-angle photos', after: 'Toggle "Verified Reality" for honest daylight' },
          { stage: '2. Verify', before: 'Plead for WhatsApp video', after: 'Check GPS-verified visitor water/light report' },
          { stage: '3. Check Space', before: 'Guess if queen bed fits', after: 'Visual usable carpet breakdown' },
          { stage: '4. Availability', before: 'Call and find it was rented 2 weeks ago', after: 'Live availability verified within 24 hours' },
          { stage: '5. Move-In', before: 'Waste entire weekend on blind visits', after: 'Visit with confidence and make an offer' }
        ]
      },

      // 05: Impact & Metrics
      impactMetrics: {
        headline: 'Higher visit-to-offer rate and zero wasted trips',
        primaryMetric: '+45% Visit-to-Offer Rate',
        primaryDesc: 'Physical visits lead to a rental offer because expectations match reality',
        secondaryMetric: '70% Fewer Wasted Trips',
        secondaryDesc: 'Renters no longer burn weekends visiting dark, damp, or already-rented flats',
        northStarContribution: 'Eliminates fake search cycles, compressing the search-to-lease timeline from 24 days down to 7 days.',
        ancillaryAttach: 'Higher visit confidence accelerates booking of NoBroker Home Painting and Deep Cleaning.'
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
        summary: 'Replaces generic daily push spam with calm, high-precision alerts. Sends zero notifications until a genuinely fresh, verified flat matching the renter\'s exact travel threshold and budget hits the database.',
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
            title: 'Auto-Mute on Lease Signed',
            desc: 'Instantly silences all notifications the moment a tenant finalizes a rental agreement.'
          }
        ]
      },

      // 02: The Specific Problem
      specificProblem: {
        headline: 'Daily marketing spam causes renters to permanently mute notifications',
        explanation: 'To boost daily active users, property apps blast 3 to 5 push notifications a day. The alerts repeatedly surface homes the user already rejected or flats located in distant suburbs. Renters quickly revoke notification permissions, completely severing the communication channel.',
        hmw: 'How might we send high-value alerts only when a fresh, verified flat matches the renter\'s commute criteria so notifications feel like a superpower rather than spam?'
      },

      // 03: Research & Insights (Combined Survey + Interview Data)
      researchInsights: {
        headline: '43% of renters permanently muted notifications to stop alert fatigue',
        surveyStat: '16 of 37 surveyed renters (43.2%)',
        surveyDetail: 'revoked notification permissions completely due to irrelevant property blasts',
        combinedFinding: 'Push notifications are the fastest way to rent a good flat in competitive rental markets. But because notifications were filled with low-quality spam, renters muted the app and lost out to offline brokers.',
        quotes: [
          '"I used to swap apps a lot seeing my long searching, and notifications kept buzzing with irrelevant homes so I just muted everything."',
          '"I had to turn off notifications. It was buzz-buzzing every 2 hours with flats in areas I never searched for."',
          '"By the time I opened the app manually, the good flats were already gone."'
        ],
        habits: [
          'Turning off app notifications in iOS/Android settings after 3 days.',
          'Relying on friends or WhatsApp groups for word-of-mouth flat openings.',
          'Opening the app once a week only to find hundreds of unread marketing cards.'
        ]
      },

      // 04: Design Decisions & Exploration (Combined)
      decisionsAndExploration: {
        headline: 'What we explored, what failed, and what we chose',
        decisions: [
          {
            title: '1. Strict commute-boundary notification rule',
            explored: 'Tried sending alerts based on city-wide popularity algorithms.',
            whyFailed: 'Renters do not care if a flat in Electronic City is popular if their job is in Manyata Tech Park (25 km away).',
            decision: 'Set a hard rule: push alerts fire only if commute time is strictly <= user\'s commute threshold.',
            rationale: 'Every single alert is immediately relevant to the renter\'s daily routine.'
          },
          {
            title: '2. Diff-based alert filtering (Never repeat seen homes)',
            explored: 'Tried re-alerting users about price drops on homes they had already viewed.',
            whyFailed: 'Renters felt annoyed seeing the same rejected homes over and over.',
            decision: 'Built an in-app diff filter that permanently suppresses any property the renter has already skipped or opened.',
            rationale: 'Builds trust that every notification represents a 100% newly available opportunity.'
          },
          {
            title: '3. Single daily calm digest instead of random blasts',
            explored: 'Tried firing alerts the exact second any flat is uploaded.',
            whyFailed: 'Fired alerts at 11:30 PM or during morning meetings, disturbing renters.',
            decision: 'Batch non-urgent alerts into a single calm morning briefing at 8:30 AM before work.',
            rationale: 'Respects attention while giving renters first-mover advantage before work begins.'
          }
        ],
        journey: [
          { stage: '1. Preferences', before: 'Generic city-wide alerts', after: 'Set commute ceiling (e.g. max 30 mins to EcoWorld)' },
          { stage: '2. Quality Filter', before: 'Spammed with 5 unverified ads/day', after: 'Zero spam; alerts hold until a verified home matches' },
          { stage: '3. Notification', before: 'Random buzzes at midnight', after: 'Calm morning brief with exact commute time in banner' },
          { stage: '4. Action', before: 'Mute notifications in frustration', after: 'Tap banner to call owner directly in under 15 mins' },
          { stage: '5. Outcome', before: 'Miss out on prime flats', after: 'Sign lease within 48 hours of listing match' }
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

  // The 6 Progressive Disclosure Steps for this Project
  const stepsList = [
    { id: '1', num: '01', label: 'Feature Context' },
    { id: '2', num: '02', label: 'The Problem' },
    { id: '3', num: '03', label: 'Research & Insights' },
    { id: '4', num: '04', label: 'Decisions & Exploration' },
    { id: '5', num: '05', label: 'Impact & Metrics' },
    { id: '6', num: '06', label: 'Prototype Lab' }
  ];

  // Progressive Disclosure: Anime.js Scroll Animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stepElements = container.querySelectorAll('.progressive-step');
    if (!stepElements || stepElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepId = entry.target.getAttribute('data-step-id');
          if (stepId) {
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
      root: null,
      rootMargin: '-15% 0px -25% 0px',
      threshold: 0.1
    });

    stepElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeProject]);

  const scrollToStep = (stepId) => {
    playSound('pop', soundEnabled);
    setActiveStep(stepId);
    const targetEl = document.getElementById(`proj-step-${stepId}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleProjectSwitch = (pId) => {
    playSound('pop', soundEnabled);
    setActiveProject(pId);
    setActiveStep('1');
    const container = document.getElementById('projects-section');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
          How we turned research insights into working product features — progressive disclosure following each solution from <strong>context</strong> and <strong>the specific problem</strong> through <strong>research</strong>, <strong>design decisions</strong>, <strong>metrics</strong>, and the <strong>live prototype</strong>.
        </p>
      </div>

      {/* Main Container Card */}
      <div 
        ref={containerRef}
        data-reveal 
        className="rounded-3xl sm:rounded-4xl bg-gradient-to-b from-white to-zinc-50/50 dark:from-[#121215] dark:to-[#0C0C0E] border border-zinc-200 dark:border-zinc-800/90 px-6 sm:px-10 pb-10 pt-6 sm:pt-8 shadow-sm relative space-y-6 sm:space-y-7"
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

        {/* Sticky Progressive Disclosure Stepper */}
        <div className="sticky top-[56px] sm:top-[57px] z-30 bg-white/95 dark:bg-[#121215]/95 backdrop-blur-md py-2.5 sm:py-3 border-b border-zinc-200/80 dark:border-zinc-800/80 -mx-6 sm:-mx-10 px-6 sm:px-10 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar transition-all">
          {/* 6 Subdivision Steps */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {stepsList.map((step) => {
              const isActive = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => scrollToStep(step.id)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all tactile-btn flex items-center gap-1.5 shrink-0 ${
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

            {/* Bottom Row: 4 Full-Width Editorial Touchpoint Columns (Clean, unboxed layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4 sm:pt-6 border-t border-zinc-100 dark:border-zinc-800/60">
              {currentP.featureContext.touchpoints.map((tp, idx) => (
                <div key={idx} className="anime-text space-y-1.5">
                  <span className="text-xs sm:text-sm font-mono font-bold text-orange-600 dark:text-orange-400 block">
                    {tp.title}
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {tp.desc}
                  </p>
                </div>
              ))}
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
                Workarounds Users Invented
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
                    if (gapsEl) gapsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
