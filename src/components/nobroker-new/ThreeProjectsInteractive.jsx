import React, { useState, useEffect, useRef } from 'react';
import { ArrowSquareOut, User, Clock, CheckCircle, XCircle, ChartPieSlice, ChatCircleDots, NavigationArrow, ArrowRight, ShieldCheck, BellSlash, Eye, ArrowsDownUp, ArrowUp, GitCommit, CaretRight, MapPin, Car, Train, Compass, Path, Buildings, Storefront, Camera, House, Images, Key, Door, BellRinging, EnvelopeSimple, Timer, Lightning, Funnel } from '@phosphor-icons/react';
import { RevealImage, EASE_OUT, useInView } from './motion-bits';
import { TextScramble } from './ui/text-scramble';
import { DotWave } from './ui/dot-wave';
import { getLenis } from './lenisStore';
import { animate, stagger } from 'animejs';
import { playSound } from '../../utils/sound';
import { KineticHeading } from '../../utils/motion';

// **bold** markers become bold text; the same markers colour the How-Might-We highlights
const rich = (str) => str.split('**').map((t, i) => (i % 2 ? <strong key={i} className="font-semibold text-zinc-900 dark:text-white">{t}</strong> : t));
const hmwRich = (str) => str.split('**').map((t, i) => (i % 2 ? <span key={i} className="text-orange-600 dark:text-orange-400">{t}</span> : t));

// How Might We: a dot wave rolls out from the centre, then the statement decodes left to right.
const HmwStatement = ({ hmw }) => {
  const [ref, seen] = useInView(0.4);
  const parts = hmw.split('**').map((text, i) => ({ text, className: i % 2 ? 'text-orange-600 dark:text-orange-400' : '' }));
  return (
    <div ref={ref} className="anime-text relative my-8 sm:my-14 w-full overflow-hidden rounded-3xl bg-orange-500/[0.04] dark:bg-orange-500/[0.05] px-6 py-24 sm:px-12 sm:py-32 text-center">
      <DotWave active={seen} />
      <span className="relative text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold block mb-5">How Might We</span>
      <p className="relative mx-auto max-w-[34ch] text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-white [text-wrap:balance]">
        <TextScramble parts={parts} active={seen} />
      </p>
    </div>
  );
};

const WIREFRAME_IMG = '/nobroker-new/wireframe-lab.png';
const CLUSTER_IMG = '/nobroker-new/affinity-map.png';

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
      number: 'Problem Statement 1',
      psShort: 'PS1',
      psName: 'Commute',
      title: 'Know the commute before you click',
      subtitle: 'Ending the Google Maps app-switching habit',
      labRoute: '/ps2',
      overview: {
        challenges: [
          { t: 'Search fatigue builds up', d: 'Every flat needs its own Maps check. 25 of 37 searches ran two weeks or more, with average stress at 6.6 out of 10.' },
          { t: 'Renters lose their place', d: 'Leaving the app breaks the flow. Of the 31 who left, only 10 came back and decided, and 6 never returned to the listing.' },
          { t: 'Neighborhood context & reality check', d: 'Renters check the surroundings on other sites, listing after listing, to judge what daily life near the flat is like.' }
        ],
        need: 'I need to know how long it takes to get from the house to my office, and which basic amenities and services are near it.',
        hmw: 'How might we show **real rush-hour commute times** and neighbourhood reality **inside NoBroker**, so renters never have to leave the app?',
        goals: [
          'Renters who leave for Maps and never return are lost before they contact an owner.',
          'Searches that drag past two weeks slow down successful move-ins.',
          'Solved, more renters stay in the app from first search to first visit.',
          'Solved, NoBroker answers the commute question it now hands to Google.'
        ],
        protoShot: '/nobroker-new/proto-commute-map.png',
        protoCaption: 'Map view, with the places around you and a commute on every card'
      },
      labActionLabel: 'Launch Commute Map Prototype',
      illustration: '/illustrations/ps2-commute.png',
      problemFlowIllustration: '/illustrations/ps2-journey-flow.png',
      problemFlowAlt: 'Problem 1 Commute Pre-Redesign Multi-App Journey Flow',
      
      // 01: Feature Context
      featureContext: {
        stage: 'Search & Discovery (Top of Funnel)',
        placement: 'Global Search Bar & Interactive Split Map View',
        summary: 'Renters choose Commute as the search type and set the place they travel to, such as an office or a gym, once. Results, the map and every card then work from that place.',
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
        headline: 'Distance in metro cities is deceptive, and bouncing between apps exhausts searchers',
        explanation: 'For every listing they like, renters switch between Google Maps, search engines, and messaging groups to check commute times and the surroundings. Doing this for dozens of flats takes hours and wears people down. Of the 31 who left for Maps, only 10 came back and decided.',
        hmw: 'How might we calculate real rush-hour commute times and neighborhood reality inside NoBroker so renters never have to leave the app?'
      },

      // 03: Research & Insights (Combined Survey + Interview Data)
      researchInsights: {
        headline: '24 of 37 renters constantly switched to Google Maps',
        surveyStat: '24 of 37 surveyed renters',
        surveyDetail: 'constantly switched to Google Maps to check a commute. 31 did at least sometimes, and only 10 of those 31 came back and decided',
        combinedFinding: 'In interviews, renters explained that they never think in municipal area names like "Kasavanahalli". They think relative to where they have to be every morning. Because the app failed to answer basic commute questions, renters created tedious manual workarounds.',
        quotes: [
          '"I used to swap apps a lot just to check if a flat was actually reachable. Switching back and forth made the whole search exhausting."',
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
            title: '1. Anchor the search to "Your place"',
            explored: '',
            whyFailed: 'Search starts from area names, while renters think in terms of where they travel to every day.',
            decision: 'Renters set the place they travel to once, and search, map and cards work from it.',
            rationale: 'Commute ranks almost level with rent, so it should shape the whole search, not sit in a filter.'
          },
          {
            title: '2. Put the commute on the card',
            explored: '',
            whyFailed: 'Today the commute can only be found by leaving the app, one listing at a time.',
            decision: 'Travel time and distance show on every listing card, before the tap.',
            rationale: 'It answers the question that was sending 24 of 37 renters to Maps.'
          },
          {
            title: '3. Bring the neighbourhood into the listing',
            explored: '',
            whyFailed: 'Renters checked the surroundings on other sites, listing after listing.',
            decision: 'A sheet shows door-to-door time at peak hour, plus metro, bus and autos with walking times.',
            rationale: 'The interviews showed renters checking the surroundings on other sites, listing after listing.'
          }
        ],
        journey: [
          { stage: '1. Search', before: 'Guess arbitrary locality names', after: 'Set "Your Place" once (office/gym)' },
          { stage: '2. Filter', before: 'Unorganized list with zero commute context', after: 'Every card shows travel time and distance' },
          { stage: '3. Route Check', before: 'Leave app to check Google Maps', after: 'Door-to-door time at peak hour, inside the listing' },
          { stage: '4. Neighborhood', before: 'Guess reality through Google searches, asking people they know, or doing tiring locality visits', after: 'A sheet shows metro, bus and autos with walking times' },
          { stage: '5. Action', before: 'Get distracted hopping across apps and abandon', after: 'Tap "Contact Owner" after checking the commute and surroundings inside the app' }
        ]
      },

      // 05: Impact & Metrics
      impactMetrics: {
        headline: 'What I would track, and how it tested',
        primaryMetric: 'Commute checks in the app',
        primaryDesc: 'Input metric. Baseline: 24 of 37 left for Maps constantly.',
        secondaryMetric: 'Ease 4.7 · Would use 4.6',
        secondaryDesc: 'Average rating out of 5 from the 12 testers.',
        northStarContribution: 'An input to Successful Move-Ins. I have not measured it in a live rollout.',
        ancillaryAttach: 'Clear commute and neighbourhood details upfront should give renters the confidence to contact owners sooner.'
      }
    },

    ps1: {
      id: 'ps1',
      number: 'Problem Statement 2',
      psShort: 'PS2',
      psName: 'Listing vs Reality',
      title: 'A failed visit becomes proof for the next renter',
      subtitle: 'Turning a failed visit into photos for the next renter',
      labRoute: '/ps1',
      overview: {
        challenges: [
          { t: 'Wasted trips pile up', d: 'Two interviews described trips across the city to flats that looked nothing like their listings, and each failed visit costs a whole outing.' },
          { t: 'Renters stop trusting photos', d: '11 of 15 people who had not searched yet wanted real photos upfront. Fake listings were their top fear.' },
          { t: 'A failed visit helps no one', d: 'With one or two photos, renters skip the flat or gamble on a visit, and today nothing from a failed visit reaches the next renter.' }
        ],
        need: 'I want to be sure the listing images match real life, and I want as many images as possible so I have enough content to review.',
        hmw: 'How might we help renters **verify that a listing matches reality** before they visit, so they **do not waste a trip** on a flat not worth seeing?',
        goals: [
          'A failed visit costs the renter a trip and NoBroker their trust in listings.',
          'Renters who skip thin listings never contact those owners.',
          'Solved, every failed visit leaves photos that help the next renter.',
          'Solved, more renters use NoBroker services such as Packers & Movers at move-in.'
        ],
        protoShot: '/nobroker-new/proto-reality.png',
        protoCaption: 'Listing with photos from a verified visitor'
      },
      labActionLabel: 'Launch Reality Verification Flow',
      illustration: '/illustrations/ps1-reality.png',
      problemFlowIllustration: '/illustrations/ps1-journey-flow.jpg',
      problemFlowAlt: 'Problem 2 Listing vs Reality Pre-Redesign Blind Visit Journey Flow',
      
      // 01: Feature Context
      featureContext: {
        stage: 'Evaluation & Visit Booking (Mid Funnel)',
        placement: 'Verification Modal and Procuring Photos from Visiting Renters',
        summary: 'When a visit goes wrong on a listing with few photos, the visitor is offered a reward for sending better ones. They snap three rooms and earn redeem codes for NoBroker Packers & Movers and Deep Home Cleaning, and the listing shows their photos to the next renter.',
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
        headline: 'Listings with few photos turn visits into blind gambles',
        explanation: 'In lower-budget segments, listings often have only one or two photos of the hall, and some have none at all. Because photos and videos are the main way renters judge a house before travelling, searchers either skip viable listings or travel across the city to a flat that looks nothing like its listing.',
        hmw: 'How might we help renters verify a listing matches reality before they visit, so they don\'t waste a trip on listings not worth seeing?'
      },

      // 03: Research & Insights (Combined Survey + Interview Data)
      researchInsights: {
        headline: '11 of 15 people who had not searched yet wanted real photos upfront',
        surveyStat: '11 of 15 people who had not searched yet',
        surveyDetail: 'wanted real photos upfront. Fake listings were their top fear',
        combinedFinding: 'Two interviews described trips to flats that looked nothing like their listings. Without real photos, renters asked owners for raw WhatsApp video walkthroughs or skipped affordable flats entirely.',
        quotes: [
          '"Some had one or two photos of the hall, and even lower ones didn\'t even have any. So I completely skipped those."',
          '"I traveled 18 km on a Saturday for a flat with 2 photos. It was pitch dark with zero ventilation. I walked out in 30 seconds."',
          '"If I could see real photos from someone who just visited, I wouldn\'t have wasted my entire weekend."'
        ],
        habits: [
          'Skipping listings with few photos or none at all.',
          'Begging landlords for raw WhatsApp video walkthroughs before agreeing to travel.',
          'Spending weekends on blind visits to unphotographed flats only to immediately turn around.'
        ]
      },

      // 04: Design Decisions & Exploration (Combined)
      decisionsAndExploration: {
        headline: 'What we explored, what failed, and what we chose',
        decisions: [
          {
            title: '1. Ask at the moment of the failed visit',
            explored: '',
            whyFailed: 'On a listing with few photos, a visit is a gamble, and the visitor leaves with nothing to show for it.',
            decision: 'After a visit on a listing with few photos, the visitor is offered a reward for sending better ones.',
            rationale: 'The visitor has just seen the flat as it is, and has the most useful photos to give.'
          },
          {
            title: '2. Pay in services, not cash',
            explored: '',
            whyFailed: "Nothing in today's flow gives a visitor a reason to send photos.",
            decision: 'The reward is redeem codes for NoBroker Packers & Movers and Deep Home Cleaning.',
            rationale: "A visitor who is about to move can use them, and NoBroker's own services gain new users."
          },
          {
            title: '3. Show who took the photos',
            explored: '',
            whyFailed: 'Today a photo carries no name, so renters cannot judge where it came from.',
            decision: "Photos carry the visitor's name and that they visited.",
            rationale: 'Renters judge a photo by who took it.'
          }
        ],
        journey: [
          { stage: '1. Browse', before: 'Listing has one or two photos, or none', after: 'Visitor photos are added to the listing over time' },
          { stage: '2. Decision', before: 'Skip flat or gamble on a blind visit', after: "Judge by photos with the visitor's name on them" },
          { stage: '3. Visit', before: 'Show up and discover an unlivable flat', after: 'Visit with accurate visual expectations' },
          { stage: '4. After Visit', before: 'Walk away frustrated after wasting half a day', after: 'Offered a reward for photos of three rooms' },
          { stage: '5. Outcome', before: 'Zero value for renter or future searchers', after: 'Redeem codes for the visitor, proof for the next renter' }
        ]
      },

      // 05: Impact & Metrics
      impactMetrics: {
        headline: 'What I would track, and how it tested',
        primaryMetric: 'Visit-to-offer rate',
        primaryDesc: 'Input metric. No baseline, because the survey did not ask.',
        secondaryMetric: 'Ease 4.4 · Would use 4.3',
        secondaryDesc: 'Average rating out of 5 from the 12 testers.',
        northStarContribution: 'Fewer dead-end visits should help renters find and lease a flat sooner. I have not measured it in a live rollout.',
        ancillaryAttach: 'Visitors earn redeem codes for NoBroker Packers & Movers and Deep Home Cleaning, which brings the partner services new users.'
      }
    },

    ps34: {
      id: 'ps34',
      number: 'Problem Statement 3',
      psShort: 'PS3',
      psName: 'Calm Alerts',
      title: 'One alert, only for a new match',
      subtitle: 'Saved filters and a single alert instead of notification spam',
      labRoute: '/ps4',
      overview: {
        challenges: [
          { t: 'Alerts arrive too late', d: '8 of 37 searchers said alerts came too late, after the flat was already gone.' },
          { t: 'Alerts become noise', d: 'Renters install several apps and get alerts for weeks. 8 of 37 turned alerts off.' },
          { t: 'Renters go back to refreshing', d: '8 of 37 refreshed by hand. Only 9 found alerts helpful, and 4 did not know about them.' }
        ],
        need: 'I need focused, directed notifications that actually have value, not unnecessary ones that I\'ll treat as spam.',
        hmw: 'How might we help renters **trust that an alert is a genuinely new match**, so they **keep notifications on**?',
        goals: [
          'Alerts switched off mean NoBroker loses its fastest way to reach a renter.',
          'Late alerts mean renters reach owners after the flat is gone.',
          'Solved, renters keep notifications on and contact owners sooner.',
          'Solved, more matches turn into visits and successful move-ins.'
        ],
        protoShot: '/nobroker-new/proto-alerts.png',
        protoCaption: 'Search with Save Filters beside Search'
      },
      labActionLabel: 'Launch Calm Signal Prototype',
      illustration: '/illustrations/ps4-alerts.png',
      problemFlowIllustration: '/illustrations/ps4-journey-flow.jpg',
      problemFlowAlt: 'Problem 3 Calm Alerts Pre-Redesign Spam Loop Journey Flow',
      
      // 01: Feature Context
      featureContext: {
        stage: 'Re-engagement & Retention (Lifecycle)',
        placement: 'Mobile Push Notifications & "My Matches" Feed',
        summary: 'Renters save a search. NoBroker alerts them once when a genuinely new matching home is posted, names the saved filter in the alert, and the alert switches itself off after 14 days.',
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
        headline: 'Alerts that turn into noise get switched off',
        explanation: 'Renters installed several rental apps and were bombarded with notifications. Alerts came too late or surfaced homes they did not want. Of 37 searchers, 8 said alerts came too late and 8 turned them off, so the channel stops working when a good flat appears.',
        hmw: 'How might we help renters trust that notifications only surface genuinely new listings, so they don\'t disable notifications or ignore them?'
      },

      // 03: Research & Insights (Combined Survey + Interview Data)
      researchInsights: {
        headline: 'Of 37 searchers, only 9 found alerts helpful',
        surveyStat: '8 of 37 surveyed renters turned alerts off',
        surveyDetail: 'and another 8 said alerts came too late',
        combinedFinding: 'Alerts only work if renters trust them. This redesign addresses the spam half. The "too late" half is still open.',
        quotes: [
          '"I ignored those notifications because they got buried under everything else."',
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
            title: '1. Alert only on a genuinely new match',
            explored: '',
            whyFailed: 'Alerts that fire on irrelevant homes get switched off. 8 of 37 turned them off.',
            decision: 'An alert fires only when a new matching home is posted.',
            rationale: 'Irrelevant alerts were why 8 of 37 turned them off.'
          },
          {
            title: '2. Let alerts expire',
            explored: '',
            whyFailed: 'A leftover alert becomes clutter once the search is over.',
            decision: 'The alert switches itself off after 14 days.',
            rationale: 'The search ends once a renter moves in, and a leftover alert becomes clutter.'
          },
          {
            title: '3. Explain why it matched',
            explored: '',
            whyFailed: 'An alert with no reason attached is easy to ignore.',
            decision: 'The listing shows how it matched the saved criteria.',
            rationale: 'Renters can trust an alert once they can see why they got it.'
          }
        ],
        journey: [
          { stage: '1. Preferences', before: 'Search is the only action', after: 'Save Filters sits beside Search' },
          { stage: '2. Action', before: 'Mute notifications in frustration', after: 'One alert, only for a new match, naming the saved filter' },
          { stage: '3. Outcome', before: 'Alerts pile up after the search ends', after: 'The alert switches itself off after 14 days' }
        ]
      },

      // 05: Impact & Metrics
      impactMetrics: {
        headline: 'What I would track, and how it tested',
        primaryMetric: 'Alert-to-contact speed and opt-outs',
        primaryDesc: 'Input metrics. Baseline: 8 of 37 turned alerts off.',
        secondaryMetric: 'Ease 4.6 · Would use 4.8',
        secondaryDesc: 'Average rating out of 5 from the 12 testers.',
        northStarContribution: 'Trusted alerts should help renters reach owners of new matches sooner. I have not measured it in a live rollout.',
        ancillaryAttach: 'A renter who trusts alerts keeps notifications on, so NoBroker keeps a way to reach them.'
      }
    }
  };

  const currentP = projectsData[activeProject] || projectsData.ps2;

  // The 5 Steps for this Project
  const stepsList = [
    { id: '1', num: '01', label: 'Context' },
    { id: '2', num: '02', label: 'Research & Insights' },
    { id: '3', num: '03', label: 'Problem Overview' },
    { id: '4', num: '04', label: 'Process + Ideation' },
    { id: '5', num: '05', label: 'Prototype' }
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
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(targetEl, { offset: -150 });
      else smoothScrollTo(targetEl);
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
    <section className="py-16 border-b border-zinc-200 dark:border-zinc-800 relative space-y-14">
      {/* Section Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold mb-2">
          <CaretRight size={14} weight="bold" />
          <span>04 · The Three Problem Statements</span>
        </div>
        <KineticHeading 
          as="h2"
          text="The 3 Solved Product Solutions"
          className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight"
        />
        <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg max-w-4xl mt-2 leading-relaxed">
          How we turned research insights into working product features — following each solution from <strong>context</strong> and <strong>research</strong> through the <strong>problem overview</strong> and <strong>ideation</strong> to the <strong>live prototype</strong>.
        </p>
      </div>

      {/* Problem statement side nav: sits outside the content column, on the right, and follows the scroll */}
      <div className="hidden min-[1500px]:block absolute !mt-0 top-0 bottom-0 left-full ml-4 w-[148px] pointer-events-none">
        <nav aria-label="Problem statement" className="sticky top-[120px] pointer-events-auto pt-2">
          <span className="mb-3 block text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Switch</span>
          <ul className="relative border-l border-zinc-300 dark:border-zinc-700">
            {Object.values(projectsData).map((proj) => {
              const isSelected = activeProject === proj.id;
              return (
                <li key={proj.id}>
                  <button
                    type="button"
                    onClick={() => handleProjectSwitch(proj.id)}
                    aria-current={isSelected ? 'true' : undefined}
                    className={`relative -ml-px block w-full py-2 pl-4 pr-1 text-left text-xs leading-snug transition-[color,transform] duration-150 ease-out active:scale-[0.97] ${
                      isSelected ? 'font-bold text-zinc-900 dark:text-white' : 'font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 h-full w-0.5 origin-top bg-orange-500"
                      style={{ transform: `scaleY(${isSelected ? 1 : 0})`, transition: `transform 280ms ${EASE_OUT}` }}
                    />
                    {proj.psShort}: {proj.psName}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Container Card */}
      <div 
        ref={containerRef}
        data-reveal 
        className="relative space-y-6 sm:space-y-7 scroll-mt-20 sm:scroll-mt-24"
      >
        
        {/* Problem statement switcher: open tabs with a drawn underline */}
        <div role="tablist" aria-label="Problem statement" className="sticky top-[56px] sm:top-[57px] z-40 min-[1500px]:hidden flex gap-6 sm:gap-8 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto no-scrollbar bg-[#F5F5F7]/95 dark:bg-[#0C0C0E]/95 backdrop-blur-md pt-2">
          {Object.values(projectsData).map((proj) => {
            const isSelected = activeProject === proj.id;
            return (
              <button
                key={proj.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleProjectSwitch(proj.id)}
                className={`relative pb-3 text-sm font-bold whitespace-nowrap transition-[color,transform] duration-150 ease-out active:scale-[0.97] ${
                  isSelected ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                {proj.number}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-px left-0 h-0.5 w-full origin-left bg-orange-500"
                  style={{ transform: `scaleX(${isSelected ? 1 : 0})`, transition: `transform 280ms ${EASE_OUT}` }}
                />
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
          className="sticky top-[97px] sm:top-[98px] min-[1500px]:top-[57px] z-30 bg-[#F5F5F7]/95 dark:bg-[#0C0C0E]/95 backdrop-blur-md py-2 sm:py-2.5 border-b border-zinc-200/80 dark:border-zinc-800/80 w-full overflow-x-auto no-scrollbar flex items-center justify-start gap-2"
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
        <div key={activeProject} className="space-y-16 -mt-1" style={{ animation: `ps-in 380ms ${EASE_OUT} both` }}>
          <style>{`@keyframes ps-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){[style*="ps-in"]{animation:none!important}}`}</style>

          {/* ------------------------------------------------------------- */}
          {/* STEP 1: Feature Context                                      */}
          {/* ------------------------------------------------------------- */}
          <div 
            id="proj-step-1" 
            data-step-id="1" 
            className="progressive-step space-y-8 pt-0 border-b border-zinc-100 dark:border-zinc-800/80 pb-14 scroll-mt-32 sm:scroll-mt-36"
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
          {/* STEP 2: Research & Insights                                  */}
          {/* ------------------------------------------------------------- */}
          <div
            id="proj-step-2"
            data-step-id="2"
            className="progressive-step space-y-10 pt-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-14 scroll-mt-32 sm:scroll-mt-36"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Step 02 · Research & Insights
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
            <div className="space-y-3 pt-2">
              <span className="anime-text text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold block">
                What Renters Said in 1-on-1 Interviews
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {currentP.researchInsights.quotes.map((q, idx) => (
                  <blockquote key={idx} className="anime-text text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 italic pl-4 border-l-2 border-orange-500">
                    {q}
                  </blockquote>
                ))}
              </div>
            </div>

            {/* Pre-Redesign Customer Journey Flow */}
            {currentP.problemFlowIllustration && (
              <div className="anime-text w-full mt-6 flex flex-col items-center">
                <div className="w-full flex items-center gap-1.5 mb-2.5 text-xs font-mono text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider">
                  <GitCommit className="w-3.5 h-3.5" />
                  <span>Pre-Redesign Customer Journey Flow</span>
                </div>
                <img
                  src={currentP.problemFlowIllustration}
                  alt={currentP.problemFlowAlt || currentP.title}
                  className="w-full max-h-[380px] sm:max-h-[460px] object-contain"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          {/* ------------------------------------------------------------- */}
          {/* STEP 3: Problem Overview                                      */}
          {/* ------------------------------------------------------------- */}
          <div
            id="proj-step-3"
            data-step-id="3"
            className="progressive-step space-y-12 pt-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-14 scroll-mt-32 sm:scroll-mt-36"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Step 03 · Problem Overview
              </span>
              <span className="text-xs font-mono text-zinc-400">Challenges, Need & Business Goals</span>
            </div>

            {/* Challenges beside the user need: open columns, hairline rows */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8">
              <div className="lg:col-span-7">
                <span className="anime-text text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold block mb-1">The Challenges</span>
                <ol>
                  {currentP.overview.challenges.map((c, i) => (
                    <li key={c.t} className="anime-text grid grid-cols-[2.25rem_1fr] gap-x-3 py-4 border-t border-zinc-200 dark:border-zinc-800">
                      <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400 pt-1">0{i + 1}</span>
                      <div>
                        <div className="text-base font-semibold leading-snug text-zinc-900 dark:text-white">{c.t}</div>
                        <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 max-w-[56ch]">{c.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-zinc-200 lg:dark:border-zinc-800">
                <span className="anime-text text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold block mb-3">User Need</span>
                <p className="anime-text text-xl sm:text-2xl font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white max-w-[26ch]">{currentP.overview.need}</p>
              </div>
            </div>

            {/* How Might We: one wide statement across the full container */}
            <HmwStatement hmw={currentP.overview.hmw} />

            {/* Business goals: one line each */}
            <div>
              <span className="anime-text text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold block mb-1">How It Impacts Business</span>
              <ul>
                {currentP.overview.goals.map((g) => (
                  <li key={g} className="anime-text flex items-start gap-3 py-3 border-t border-zinc-200 dark:border-zinc-800 text-sm sm:text-base text-zinc-800 dark:text-zinc-200">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* STEP 4: Ideation: clusters, then the initial wireframe        */}
          {/* ------------------------------------------------------------- */}
          <div
            id="proj-step-4"
            data-step-id="4"
            className="progressive-step space-y-10 pt-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-14 scroll-mt-32 sm:scroll-mt-36"
          >
            <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 inline-block">
              Step 04 · Process + Ideation
            </span>
            <p className="anime-text max-w-[60ch] text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              The wireframes were built using iteration-based prompting, then taken into a full-fledged prototype with multiple versions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <RevealImage src={CLUSTER_IMG} alt="The affinity map in Figma, with the clusters of sticky notes" />
              <RevealImage src={WIREFRAME_IMG} alt="The wireframe lab, with a phone-frame wireframe and the list of screens" />
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* STEP 5: Interactive Prototype                                */}
          {/* ------------------------------------------------------------- */}
          <div
            id="proj-step-5"
            data-step-id="5"
            className="progressive-step pt-4 space-y-6 scroll-mt-32 sm:scroll-mt-36"
          >
            <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 inline-block">
              Step 05 · Interactive Prototype
            </span>

            {/* Link and device side by side, in one open row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 items-center">
              <div className="anime-text lg:col-span-7 space-y-5">
                <h5 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white max-w-[24ch]">
                  Try the prototype live
                </h5>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-[46ch] leading-relaxed">
                  Open the fully working high-fidelity component in the annotation lab.
                </p>
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
                  className="group px-6 py-3 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-md shadow-orange-600/20 transition-[background-color,transform] duration-150 ease-out active:scale-[0.97] tactile-btn"
                >
                  <span>{currentP.labActionLabel}</span>
                  <ArrowSquareOut size={16} weight="bold" className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Half-screen device: the exact screen in the prototype */}
              <figure className="anime-text lg:col-span-5 flex flex-col items-center gap-2">
                <div className="relative w-[230px] h-[300px] overflow-hidden rounded-t-[2.2rem] border-[7px] border-b-0 border-zinc-900 dark:border-zinc-700 bg-white">
                  <img src={currentP.overview.protoShot} alt={currentP.overview.protoCaption} className="block w-full h-auto" loading="lazy" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 dark:from-[#09090B]/90 to-transparent" />
                </div>
                <figcaption className="text-xs text-zinc-500 dark:text-zinc-400 text-center">{currentP.overview.protoCaption}</figcaption>
              </figure>
            </div>

            {/* Move to Next PS / Section Navigation Button */}
            <div className="mt-14 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">End of this problem statement</span>
              {activeProject === 'ps2' && (
                <button
                  onClick={() => handleProjectSwitch('ps1')}
                  className="px-5 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold text-xs flex items-center gap-2 shadow-sm active:scale-[0.97] tactile-btn transition-[transform] duration-150 ease-out"
                >
                  <span>Next Problem Statement · Problem Statement 2</span>
                  <ArrowRight size={14} weight="bold" className="text-orange-500" />
                </button>
              )}
              {activeProject === 'ps1' && (
                <button
                  onClick={() => handleProjectSwitch('ps34')}
                  className="px-5 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold text-xs flex items-center gap-2 shadow-sm active:scale-[0.97] tactile-btn transition-[transform] duration-150 ease-out"
                >
                  <span>Next Problem Statement · Problem Statement 3</span>
                  <ArrowRight size={14} weight="bold" className="text-orange-500" />
                </button>
              )}
              {activeProject === 'ps34' && (
                <button
                  onClick={() => {
                    playSound('pop', soundEnabled);
                    const protoEl = document.getElementById('prototype-section');
                    if (protoEl) smoothScrollTo(protoEl, 65);
                  }}
                  className="px-5 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold text-xs flex items-center gap-2 shadow-sm active:scale-[0.97] tactile-btn transition-[transform] duration-150 ease-out"
                >
                  <span>Explore Interactive Prototypes</span>
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
