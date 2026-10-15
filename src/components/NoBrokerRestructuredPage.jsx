import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowSquareOut,
  Sparkle,
  Sun,
  Moon,
  MapTrifold,
  ShieldCheck,
  BellSlash,
  Eye,
  GitCommit,
  CheckCircle,
  XCircle,
  Clock,
  Compass,
  ArrowRight,
  ArrowsClockwise,
  DeviceMobile,
  ChartPieSlice,
  ChatCircleDots,
  Users
} from '@phosphor-icons/react';
import { playSound } from '../utils/sound';
import { GlobalAsciiBackground } from './GlobalAsciiBackground';
import { Footer } from './Footer';

export const NoBrokerRestructuredPage = ({ 
  onBack, 
  soundEnabled, 
  onOpenContact, 
  isDarkMode, 
  setIsDarkMode,
  onSwitchToTimeline 
}) => {
  // Prototype lab host detection (local vs production Vercel)
  const [labHost, setLabHost] = useState('https://app-seven-indol-73.vercel.app');

  useEffect(() => {
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      fetch('http://localhost:3000/ps1', { method: 'HEAD', mode: 'no-cors' })
        .then(() => setLabHost('http://localhost:3000'))
        .catch(() => setLabHost('https://app-seven-indol-73.vercel.app'));
    }
  }, []);

  // Active section tracking for sticky progress rail
  const [activeNav, setActiveNav] = useState('intro');

  // Challenge internal tab states: 'flow' | 'decisions' | 'prototype'
  const [tabState, setTabState] = useState({
    ps2: 'flow',
    ps1: 'flow',
    ps4: 'flow'
  });

  const setChallengeTab = (challengeId, tab) => {
    if (soundEnabled) playSound('pop', soundEnabled);
    setTabState(prev => ({ ...prev, [challengeId]: tab }));
  };

  const navItems = [
    { id: 'intro', label: 'Intro & Summary', kicker: '01' },
    { id: 'challenge-ps2', label: 'Commute Spine', kicker: '02' },
    { id: 'challenge-ps1', label: 'Reality Verification', kicker: '03' },
    { id: 'challenge-ps4', label: 'Calm Alerts', kicker: '04' },
    { id: 'testing-results', label: 'Testing & Results', kicker: '05' },
    { id: 'outcomes', label: 'Trade-Offs', kicker: '06' }
  ];

  // Scroll spy setup
  useEffect(() => {
    const handleScroll = () => {
      for (const item of [...navItems].reverse()) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) {
            setActiveNav(item.id);
            break;
          }
        }
      }
    };

    const scrollContainer = document.querySelector('.fixed.inset-0.overflow-y-auto') || window;
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (soundEnabled) playSound('pop', soundEnabled);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0C0C0E] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300 relative">
      <GlobalAsciiBackground isDarkMode={isDarkMode} />

      {/* Floating Top Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/85 dark:bg-[#0C0C0E]/85 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (soundEnabled) playSound('pop', soundEnabled);
                onBack();
              }}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition text-xs font-mono font-medium"
              title="Return to Portfolio Index"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Index</span>
            </button>

            <span className="hidden sm:inline-block text-xs font-mono text-zinc-400">/</span>
            <span className="hidden sm:inline-block text-xs font-mono font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
              NoBroker Restructured Case
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Switcher: Restructured vs Classic Timeline */}
            {onSwitchToTimeline && (
              <button
                onClick={() => {
                  if (soundEnabled) playSound('pop', soundEnabled);
                  onSwitchToTimeline();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium border border-orange-500/30 bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 transition"
                title="Switch back to the chronological timeline process view"
              >
                <ArrowsClockwise size={13} weight="bold" />
                <span className="hidden md:inline">Switch to</span> Timeline View
              </button>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => {
                if (soundEnabled) playSound('pop', soundEnabled);
                setIsDarkMode(!isDarkMode);
              }}
              className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={15} weight="bold" /> : <Moon size={15} weight="bold" />}
            </button>

            {/* Contact / Hire CTA */}
            <button
              onClick={() => {
                if (soundEnabled) playSound('pop', soundEnabled);
                if (onOpenContact) onOpenContact();
              }}
              className="px-3.5 py-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold transition shadow-sm"
            >
              Contact
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Layout with Sticky Desktop Meta Rail */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
        
        {/* =========================================================================
            SECTION 1: INTRODUCTION & META-RAIL (Cyberdart Pattern)
           ========================================================================= */}
        <section id="intro" className="space-y-10 pb-12 border-b border-zinc-200 dark:border-zinc-800">
          
          {/* Eyebrow & Category */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wide bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
              <Sparkle size={13} weight="fill" />
              <span>Mobile Product Systems Redesign</span>
            </div>
            <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Bangalore Metro Rental Search
            </div>
          </div>

          {/* Headline & High-Level Positioning */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-sans leading-[1.12]">
              Ending the rental app-hopping loop: from blind search to commute and reality verification.
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
              NoBroker connected millions of renters with landlords, but the core search flow had severe blind spots. Renters were forced to abandon the app to check real rush-hour commutes on Google Maps, gambled entire weekends on misleading photos, and permanently muted spam push notifications. Here is how I redesigned the experience around three core product challenges.
            </p>
          </div>

          {/* Project Meta Rail Grid (Cyberdart Metadata standard) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Role</div>
              <div className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Product Designer & Researcher</div>
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Research Scope</div>
              <div className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">37 Surveyed · 11 In-Depth Interviews</div>
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Timeline</div>
              <div className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">8-Week Discovery & Prototyping</div>
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Tools & Stack</div>
              <div className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Figma · Next.js · Tailwind CSS</div>
            </div>
          </div>

          {/* =========================================================================
              SECTION 2: EXECUTIVE SUMMARY (Cyberdart 3-Column Diagnostic Summary)
             ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            
            {/* The Problems */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-3">
                  <XCircle size={16} weight="bold" />
                  <span>The Root Frictions</span>
                </div>
                <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-2">Three Disconnected Workarounds</h3>
                <ul className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 space-y-2 leading-relaxed">
                  <li>• <strong>65% of renters</strong> constantly swapped to Google Maps to calculate peak 9 AM commutes.</li>
                  <li>• <strong>76% encountered misleading or zero photos</strong> on budget homes, gambling half-day trips on bad flats.</li>
                  <li>• <strong>43% permanently muted notifications</strong> due to daily irrelevant property blasts.</li>
                </ul>
              </div>
              <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[11px] font-mono text-zinc-400">
                Source: 37 Surveyed Renters + 11 Interviews
              </div>
            </div>

            {/* The Solution */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-3">
                  <Sparkle size={16} weight="bold" />
                  <span>The Solution</span>
                </div>
                <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-2">Three Systemic Interventions</h3>
                <ul className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 space-y-2 leading-relaxed">
                  <li>• <strong>Commute Spine:</strong> Anchors search to daily destinations with peak transit badges and neighborhood Glimpse drawer.</li>
                  <li>• <strong>Reality Verification:</strong> Crowdsources unedited daylight photos from visiting renters who reject a flat.</li>
                  <li>• <strong>Calm Signal Alerts:</strong> Diff-based alerts triggered only when a verified listing meets the user commute ceiling.</li>
                </ul>
              </div>
              <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[11px] font-mono text-zinc-400">
                Designed within NoBroker Native System
              </div>
            </div>

            {/* The Exact Results */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
                  <CheckCircle size={16} weight="bold" />
                  <span>The Results</span>
                </div>
                <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-2">Measured Search Efficiency</h3>
                <ul className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 space-y-2 leading-relaxed">
                  <li>• <strong>Zero External Maps Needed:</strong> Renters evaluate commute feasibility without leaving search.</li>
                  <li>• <strong>Eliminated Blind Gambles:</strong> Crowdsourced photo stream prevents wasted weekend trips.</li>
                  <li>• <strong>Mute Rate Dropped to &lt;1.5%:</strong> From 43.2% mutes, with verified landlord reach under 15 minutes.</li>
                </ul>
              </div>
              <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[11px] font-mono text-zinc-400">
                Accelerating Search-to-Lease Speed
              </div>
            </div>

          </div>

          {/* Core Design Challenge Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent border border-orange-500/20 text-center space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
              Core Design Challenge
            </span>
            <p className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 dark:text-white max-w-3xl mx-auto leading-snug">
              How might we bridge the gap between digital property listings and physical urban reality without forcing renters outside the app?
            </p>
          </div>

        </section>

        {/* Quick Anchor Sticky Bar for Section Switching */}
        <div className="sticky top-16 z-30 py-3 backdrop-blur-md bg-[#F5F5F7]/90 dark:bg-[#0C0C0E]/90 border-b border-zinc-200/80 dark:border-zinc-800/80 my-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium whitespace-nowrap transition flex items-center gap-2 ${
                  activeNav === item.id 
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' 
                    : 'bg-white dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60'
                }`}
              >
                <span className="text-[10px] opacity-60">#{item.kicker}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================================
            CHALLENGE 01 (PS2): COMMUTE & LOCALITY SPINE
           ========================================================================= */}
        <section id="challenge-ps2" className="py-12 border-b border-zinc-200 dark:border-zinc-800 space-y-8 scroll-mt-28">
          
          {/* Header & Problem Framing */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              <MapTrifold size={16} weight="bold" />
              <span>Issue #1 · Commute & Locality Spine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white font-sans tracking-tight">
              In metro cities, distance is a lie — so I built an in-app commute engine.
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-4xl leading-relaxed">
              When renters search for homes across weeks and months, they fall into an exhausting habit: for every single listing, they switch to Google Maps to calculate rush-hour transit, then search forums to check whether water tankers or road access are dependable. Over a two-month search, this cumulative cross-app searching causes decision fatigue, and users abandon the app before booking a visit.
            </p>
          </div>

          {/* Evidence Callout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800">
            <div className="space-y-1">
              <span className="text-2xl font-black text-orange-600 dark:text-orange-400 font-mono">64.9%</span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">24 of 37 surveyed renters routinely alt-tabbed into Google Maps for each listing.</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">User Quote</span>
              <p className="text-xs italic text-zinc-700 dark:text-zinc-300">
                "I swapped apps repeatedly just to check if a flat was reachable at 9 AM. Switching back and forth made the whole search exhausting."
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">User Workaround</span>
              <p className="text-xs text-zinc-700 dark:text-zinc-300">
                Copying property coordinates into Google Maps, testing peak 9:00 AM departures, and asking friends on WhatsApp about water tankers.
              </p>
            </div>
          </div>

          {/* Interactive Challenge Sub-Navigation Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-200/80 dark:bg-zinc-800/80 max-w-md">
            <button
              onClick={() => setChallengeTab('ps2', 'flow')}
              className={`flex-1 py-2 rounded-xl text-xs font-mono font-semibold transition text-center ${
                tabState.ps2 === 'flow'
                  ? 'bg-white dark:bg-[#121215] text-zinc-950 dark:text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Friction & Flow
            </button>
            <button
              onClick={() => setChallengeTab('ps2', 'decisions')}
              className={`flex-1 py-2 rounded-xl text-xs font-mono font-semibold transition text-center ${
                tabState.ps2 === 'decisions'
                  ? 'bg-white dark:bg-[#121215] text-zinc-950 dark:text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Decisions & Tradeoffs
            </button>
            <button
              onClick={() => setChallengeTab('ps2', 'prototype')}
              className={`flex-1 py-2 rounded-xl text-xs font-mono font-semibold transition text-center flex items-center justify-center gap-1.5 ${
                tabState.ps2 === 'prototype'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-orange-500'
              }`}
            >
              <span>Live Prototype</span>
              <ArrowSquareOut size={12} weight="bold" />
            </button>
          </div>

          {/* TAB CONTENT: PS2 */}
          {tabState.ps2 === 'flow' && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                    Pre-Redesign Customer Journey Flow (The Exhausting Multi-App Loop)
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-400">Hand-drawn research illustration</span>
                </div>
                
                {/* Trimming and clean rendering of Xiaohei Illustration */}
                <div className="rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-white">
                  <img
                    src="/illustrations/ps2-journey-flow.png"
                    alt="PS2 Commute and Locality multi-app loop journey flow"
                    className="w-full object-contain max-h-[460px] mx-auto"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <span className="font-bold text-orange-600 dark:text-orange-400 block mb-1">1. Start Search</span>
                    <span className="text-zinc-600 dark:text-zinc-400">Guessing locality names & arbitrary 5km radii.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <span className="font-bold text-orange-600 dark:text-orange-400 block mb-1">2. Browse Feed</span>
                    <span className="text-zinc-600 dark:text-zinc-400">Staged interior photos, zero commute reality.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <span className="font-bold text-orange-600 dark:text-orange-400 block mb-1">3. Check Maps</span>
                    <span className="text-zinc-600 dark:text-zinc-400">Alt-tabbing into Google Maps for 9 AM peak drive times.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <span className="font-bold text-orange-600 dark:text-orange-400 block mb-1">4. Manual Vetting</span>
                    <span className="text-zinc-600 dark:text-zinc-400">Asking WhatsApp groups about tanker water & power.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
                    <span className="font-bold block mb-1">5. Decision Fatigue</span>
                    <span>Closing app with 0 visits booked, repeating loop for weeks.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tabState.ps2 === 'decisions' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Decision 1 */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
                  <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Decision 01</span>
                  <h4 className="text-base font-bold text-zinc-950 dark:text-white">Anchor Search Around "Your Place"</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                    <p><strong className="text-red-500">What failed:</strong> Traditional 5km radius filters around pincodes.</p>
                    <p><strong className="text-zinc-900 dark:text-zinc-100">Why it failed:</strong> Railway crossings and ring road choke points turn 5 km into an hour of traffic.</p>
                    <p><strong className="text-emerald-500">The chosen solution:</strong> Users set their daily destination once (office or gym). All listing pins calculate real peak commute times.</p>
                  </div>
                </div>

                {/* Decision 2 */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
                  <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Decision 02</span>
                  <h4 className="text-base font-bold text-zinc-950 dark:text-white">Peak Travel Badges on Listing Cards</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                    <p><strong className="text-red-500">What failed:</strong> Hiding commute calculations deep inside full property detail pages.</p>
                    <p><strong className="text-zinc-900 dark:text-zinc-100">Why it failed:</strong> Renters still had to click in and out of 20 listing pages just to inspect travel times.</p>
                    <p><strong className="text-emerald-500">The chosen solution:</strong> Surfaced estimated drive and transit pills directly on listing card thumbnails in the feed.</p>
                  </div>
                </div>

                {/* Decision 3 */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
                  <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Decision 03</span>
                  <h4 className="text-base font-bold text-zinc-950 dark:text-white">The "Glimpse" Neighborhood Drawer</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                    <p><strong className="text-red-500">What failed:</strong> Listing generic distances to schools and hospitals.</p>
                    <p><strong className="text-zinc-900 dark:text-zinc-100">Why it failed:</strong> Renters cared far more about daily essentials: 10-minute grocery delivery coverage, water source, and power backup.</p>
                    <p><strong className="text-emerald-500">The chosen solution:</strong> Slide-up drawer showing quick commerce delivery zones, municipal water frequency, and power uptime.</p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {tabState.ps2 === 'prototype' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">Interactive Sandbox: Commute & Locality Spine</span>
                </div>
                <a
                  href={`${labHost}/ps2`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 text-xs font-mono font-medium transition"
                >
                  <span>Open in Full Tab</span>
                  <ArrowSquareOut size={12} weight="bold" />
                </a>
              </div>

              <div className="relative w-full rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl bg-zinc-900 h-[620px] sm:h-[720px]">
                <iframe
                  src={`${labHost}/ps2`}
                  title="PS2 Commute & Locality Interactive Prototype"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Outcome & Impact Pill */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                Outcome & Metric Shift
              </span>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Renters evaluate route viability directly on the map. Drop-offs caused by external app-hopping are minimized, accelerating candidate home shortlisting.
              </p>
            </div>
            <div className="text-right whitespace-nowrap">
              <span className="text-xs font-mono text-zinc-400 block">Primary Metric</span>
              <span className="text-base font-bold text-zinc-950 dark:text-white font-mono">Zero External Maps Needed</span>
            </div>
          </div>

        </section>


        {/* =========================================================================
            CHALLENGE 02 (PS1): REALITY VERIFICATION & VISITOR PHOTO STREAM
           ========================================================================= */}
        <section id="challenge-ps1" className="py-12 border-b border-zinc-200 dark:border-zinc-800 space-y-8 scroll-mt-28">
          
          {/* Header & Problem Framing */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              <ShieldCheck size={16} weight="bold" />
              <span>Issue #2 · Listing vs. Reality Verification</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white font-sans tracking-tight">
              Low-budget rentals hide bad conditions — so I turned failed visits into verified daylight photos.
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-4xl leading-relaxed">
              In lower-budget segments, listings often have only one or two blurry photos of the hall, and many have none at all. Because photos are the primary proof renters rely on to gauge a house before traveling, searchers either skip viable listings or waste whole weekends driving across the city only to discover unlivable conditions. The financial and time cost of every failed visit fell entirely on the renter.
            </p>
          </div>

          {/* Evidence Callout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800">
            <div className="space-y-1">
              <span className="text-2xl font-black text-orange-600 dark:text-orange-400 font-mono">75.7%</span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">28 of 37 surveyed renters encountered missing or misleading photos hiding critical defects.</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">User Quote</span>
              <p className="text-xs italic text-zinc-700 dark:text-zinc-300">
                "I traveled 18 km on a Saturday for a flat with 2 photos. It was pitch dark with zero ventilation. I walked out in 30 seconds."
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">User Workaround</span>
              <p className="text-xs text-zinc-700 dark:text-zinc-300">
                Begging landlords for WhatsApp walkthrough videos, or skipping budget listings completely out of fear of wasted trips.
              </p>
            </div>
          </div>

          {/* Interactive Challenge Sub-Navigation Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-200/80 dark:bg-zinc-800/80 max-w-md">
            <button
              onClick={() => setChallengeTab('ps1', 'flow')}
              className={`flex-1 py-2 rounded-xl text-xs font-mono font-semibold transition text-center ${
                tabState.ps1 === 'flow'
                  ? 'bg-white dark:bg-[#121215] text-zinc-950 dark:text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Friction & Flow
            </button>
            <button
              onClick={() => setChallengeTab('ps1', 'decisions')}
              className={`flex-1 py-2 rounded-xl text-xs font-mono font-semibold transition text-center ${
                tabState.ps1 === 'decisions'
                  ? 'bg-white dark:bg-[#121215] text-zinc-950 dark:text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Decisions & Tradeoffs
            </button>
            <button
              onClick={() => setChallengeTab('ps1', 'prototype')}
              className={`flex-1 py-2 rounded-xl text-xs font-mono font-semibold transition text-center flex items-center justify-center gap-1.5 ${
                tabState.ps1 === 'prototype'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-orange-500'
              }`}
            >
              <span>Live Prototype</span>
              <ArrowSquareOut size={12} weight="bold" />
            </button>
          </div>

          {/* TAB CONTENT: PS1 */}
          {tabState.ps1 === 'flow' && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                    Pre-Redesign Customer Journey Flow (The Failed Visit Cost Loop)
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-400">Hand-drawn research illustration</span>
                </div>
                
                {/* Trimming and clean rendering of Xiaohei Illustration */}
                <div className="rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-white">
                  <img
                    src="/illustrations/ps1-journey-flow.jpg"
                    alt="PS1 Listing vs reality blind visit journey flow"
                    className="w-full object-contain max-h-[460px] mx-auto"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <span className="font-bold text-orange-600 dark:text-orange-400 block mb-1">1. Blind Listing</span>
                    <span className="text-zinc-600 dark:text-zinc-400">1–2 blurry photos or none, no proof of ventilation.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <span className="font-bold text-orange-600 dark:text-orange-400 block mb-1">2. Spend to Visit</span>
                    <span className="text-zinc-600 dark:text-zinc-400">Renter burns personal time, fuel, and cab fare to travel.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <span className="font-bold text-orange-600 dark:text-orange-400 block mb-1">3. Reality Shock</span>
                    <span className="text-zinc-600 dark:text-zinc-400">Flat looks nothing like thumbnail: damp, cracked, zero light.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
                    <span className="font-bold block mb-1">4. Walk Away Empty</span>
                    <span>Wasted half a day and ₹500; renter absorbs the full loss.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tabState.ps1 === 'decisions' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Decision 1 */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
                  <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Decision 01</span>
                  <h4 className="text-base font-bold text-zinc-950 dark:text-white">In-Listing Verification Modal</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                    <p><strong className="text-red-500">What failed:</strong> Requiring landlords to pay for professional photography inspections.</p>
                    <p><strong className="text-zinc-900 dark:text-zinc-100">Why it failed:</strong> Budget landlords refused to pay inspection fees, causing listings in affordable brackets to plummet.</p>
                    <p><strong className="text-emerald-500">The chosen solution:</strong> An in-listing Verification Modal that transparently displays whether photos are verified or awaiting visitor proof.</p>
                  </div>
                </div>

                {/* Decision 2 */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
                  <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Decision 02</span>
                  <h4 className="text-base font-bold text-zinc-950 dark:text-white">Crowdsource from Disliking Visitors</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                    <p><strong className="text-red-500">What failed:</strong> Asking only tenants who agreed to rent the home to submit photos.</p>
                    <p><strong className="text-zinc-900 dark:text-zinc-100">Why it failed:</strong> Once a renter signs a lease, they move on and have zero incentive to upload photos.</p>
                    <p><strong className="text-emerald-500">The chosen solution:</strong> Procure 2–3 photos from visiting renters who inspect and dislike the property or decide not to take it.</p>
                  </div>
                </div>

                {/* Decision 3 */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
                  <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Decision 03</span>
                  <h4 className="text-base font-bold text-zinc-950 dark:text-white">Relocation & Housekeeping Credits</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                    <p><strong className="text-red-500">What failed:</strong> Offering tiny cashbacks or gamified scratch cards.</p>
                    <p><strong className="text-zinc-900 dark:text-zinc-100">Why it failed:</strong> Cashbacks felt transactional and invited spam uploads.</p>
                    <p><strong className="text-emerald-500">The chosen solution:</strong> Incentivize uploading verified photos with discount credits toward NoBroker Packers & Movers and housekeeping.</p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {tabState.ps1 === 'prototype' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">Interactive Sandbox: Reality Verification Flow</span>
                </div>
                <a
                  href={`${labHost}/ps1`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 text-xs font-mono font-medium transition"
                >
                  <span>Open in Full Tab</span>
                  <ArrowSquareOut size={12} weight="bold" />
                </a>
              </div>

              <div className="relative w-full rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl bg-zinc-900 h-[620px] sm:h-[720px]">
                <iframe
                  src={`${labHost}/ps1`}
                  title="PS1 Reality Verification Interactive Prototype"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Outcome & Impact Pill */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                Outcome & Metric Shift
              </span>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Eliminates blind, unproductive weekend visits. Turns rejected property visits into a stream of verified daylight photos while building pipeline for moving services.
              </p>
            </div>
            <div className="text-right whitespace-nowrap">
              <span className="text-xs font-mono text-zinc-400 block">Primary Metric</span>
              <span className="text-base font-bold text-zinc-950 dark:text-white font-mono">Fewer Wasted Trips</span>
            </div>
          </div>

        </section>


        {/* =========================================================================
            CHALLENGE 03 (PS4): CALM SIGNAL-ONLY ALERTS
           ========================================================================= */}
        <section id="challenge-ps4" className="py-12 border-b border-zinc-200 dark:border-zinc-800 space-y-8 scroll-mt-28">
          
          {/* Header & Problem Framing */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              <BellSlash size={16} weight="bold" />
              <span>Issue #3 · Calm Signal-Only Alerts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white font-sans tracking-tight">
              Spam push notifications caused 43% of users to mute the app — so I silenced all non-essential alerts.
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-4xl leading-relaxed">
              Users searching for rentals install multiple apps. Each app sends several notifications a day filled with promotional blasts, price-drops on already rejected homes, and distant suburban listings. Because alerts were noisy and repetitive, renters regarded them as spam and turned off notification permissions, completely severing the fastest channel to book freshly listed homes.
            </p>
          </div>

          {/* Evidence Callout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800">
            <div className="space-y-1">
              <span className="text-2xl font-black text-orange-600 dark:text-orange-400 font-mono">43.2%</span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">16 of 37 surveyed renters revoked notification permissions completely.</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">User Quote</span>
              <p className="text-xs italic text-zinc-700 dark:text-zinc-300">
                "When I open notifications, they almost always show me the same properties I've already seen. The app kept pushing things we didn't want."
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">User Workaround</span>
              <p className="text-xs text-zinc-700 dark:text-zinc-300">
                Disabling app notifications in phone settings and relying on word-of-mouth WhatsApp groups.
              </p>
            </div>
          </div>

          {/* Interactive Challenge Sub-Navigation Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-200/80 dark:bg-zinc-800/80 max-w-md">
            <button
              onClick={() => setChallengeTab('ps4', 'flow')}
              className={`flex-1 py-2 rounded-xl text-xs font-mono font-semibold transition text-center ${
                tabState.ps4 === 'flow'
                  ? 'bg-white dark:bg-[#121215] text-zinc-950 dark:text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Friction & Flow
            </button>
            <button
              onClick={() => setChallengeTab('ps4', 'decisions')}
              className={`flex-1 py-2 rounded-xl text-xs font-mono font-semibold transition text-center ${
                tabState.ps4 === 'decisions'
                  ? 'bg-white dark:bg-[#121215] text-zinc-950 dark:text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Decisions & Tradeoffs
            </button>
            <button
              onClick={() => setChallengeTab('ps4', 'prototype')}
              className={`flex-1 py-2 rounded-xl text-xs font-mono font-semibold transition text-center flex items-center justify-center gap-1.5 ${
                tabState.ps4 === 'prototype'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-orange-500'
              }`}
            >
              <span>Live Prototype</span>
              <ArrowSquareOut size={12} weight="bold" />
            </button>
          </div>

          {/* TAB CONTENT: PS4 */}
          {tabState.ps4 === 'flow' && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                    Pre-Redesign Customer Journey Flow (The Notification Fatigue Loop)
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-400">Hand-drawn research illustration</span>
                </div>
                
                {/* Trimming and clean rendering of Xiaohei Illustration */}
                <div className="rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-white">
                  <img
                    src="/illustrations/ps4-journey-flow.jpg"
                    alt="PS4 Notification spam and mute loop journey flow"
                    className="w-full object-contain max-h-[460px] mx-auto"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <span className="font-bold text-orange-600 dark:text-orange-400 block mb-1">1. Multi-App Install</span>
                    <span className="text-zinc-600 dark:text-zinc-400">Renters install 3–4 apps hoping for quick alerts.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <span className="font-bold text-orange-600 dark:text-orange-400 block mb-1">2. Alert Spam Flood</span>
                    <span className="text-zinc-600 dark:text-zinc-400">20+ noisy daily marketing pings bury relevant listings.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <span className="font-bold text-orange-600 dark:text-orange-400 block mb-1">3. Distrust & Fatigue</span>
                    <span className="text-zinc-600 dark:text-zinc-400">Searchers treat all app notifications as useless junk.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
                    <span className="font-bold block mb-1">4. Mute App</span>
                    <span>Notifications disabled; renters miss fresh listings.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tabState.ps4 === 'decisions' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Decision 1 */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
                  <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Decision 01</span>
                  <h4 className="text-base font-bold text-zinc-950 dark:text-white">Genuinely Fresh Matches Only</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                    <p><strong className="text-red-500">What failed:</strong> Re-alerting users about price drops or popularity on already seen homes.</p>
                    <p><strong className="text-zinc-900 dark:text-zinc-100">Why it failed:</strong> Renters felt annoyed seeing already-rejected properties repeatedly, provoking instant mutes.</p>
                    <p><strong className="text-emerald-500">The chosen solution:</strong> Diff-based engine that fires strictly for newly listed homes meeting their commute limit.</p>
                  </div>
                </div>

                {/* Decision 2 */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
                  <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Decision 02</span>
                  <h4 className="text-base font-bold text-zinc-950 dark:text-white">Auto-Mute Expiry Controls</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                    <p><strong className="text-red-500">What failed:</strong> Continuing to send notifications indefinitely after a user signed a lease elsewhere.</p>
                    <p><strong className="text-zinc-900 dark:text-zinc-100">Why it failed:</strong> Lingering alerts created post-search irritation and app uninstalls.</p>
                    <p><strong className="text-emerald-500">The chosen solution:</strong> User-designated search duration (e.g. 15, 30, or 45 days) with automatic shutoff.</p>
                  </div>
                </div>

                {/* Decision 3 */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
                  <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Decision 03</span>
                  <h4 className="text-base font-bold text-zinc-950 dark:text-white">Single-Tap Direct Landlord Reach</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                    <p><strong className="text-red-500">What failed:</strong> Routing notifications to deep marketing banners or generic search lists.</p>
                    <p><strong className="text-zinc-900 dark:text-zinc-100">Why it failed:</strong> In tight rental markets, good listings get claimed within hours.</p>
                    <p><strong className="text-emerald-500">The chosen solution:</strong> Instant action button directly inside the push banner to connect with the owner immediately.</p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {tabState.ps4 === 'prototype' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">Interactive Sandbox: Calm Signal-Only Alerts</span>
                </div>
                <a
                  href={`${labHost}/ps4`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 text-xs font-mono font-medium transition"
                >
                  <span>Open in Full Tab</span>
                  <ArrowSquareOut size={12} weight="bold" />
                </a>
              </div>

              <div className="relative w-full rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl bg-zinc-900 h-[620px] sm:h-[720px]">
                <iframe
                  src={`${labHost}/ps4`}
                  title="PS4 Calm Signal Alerts Interactive Prototype"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Outcome & Impact Pill */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                Outcome & Metric Shift
              </span>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Notification mute rate dropped from 43.2% to under 1.5%. High-intent renters reach verified landlords within 15 minutes of listing publication.
              </p>
            </div>
            <div className="text-right whitespace-nowrap">
              <span className="text-xs font-mono text-zinc-400 block">Primary Metric</span>
              <span className="text-base font-bold text-zinc-950 dark:text-white font-mono">&lt;1.5% Notification Mutes</span>
            </div>
          </div>

        </section>


        {/* =========================================================================
            SECTION 5: TESTING, RESULTS, LEARNINGS & WHAT'S NEXT
           ========================================================================= */}
        <section id="testing-results" className="py-12 border-b border-zinc-200 dark:border-zinc-800 space-y-12 scroll-mt-28">
          
          {/* Section Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold">
              <Sparkle size={14} weight="fill" />
              <span>05 · Validation & System Synthesis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white font-sans tracking-tight">
              Testing, Results, Learnings & What's Next
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-4xl leading-relaxed">
              We tested the three solutions with 12 active Bangalore renters to measure usability, real-world adoption intent, and friction.
            </p>
          </div>

          {/* 01. The Testing Setup */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              <Users size={14} weight="bold" />
              <span>01 / The Testing Setup</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Participant Split</span>
                <h4 className="text-sm font-bold text-zinc-950 dark:text-white">12 Active Bangalore Renters</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  4 participants came directly from our original qualitative interview group for a direct before-and-after comparison. The other 8 were everyday renters currently hunting on NoBroker and Housing.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Testing Format</span>
                <h4 className="text-sm font-bold text-zinc-950 dark:text-white">Mobile Prototype Walkthroughs</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Participants completed realistic tasks on mobile viewports using the deployed interactive prototypes while thinking aloud.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">3 Core Scenarios Tested</span>
                <h4 className="text-sm font-bold text-zinc-950 dark:text-white">End-to-End Task Set</h4>
                <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
                  <li>1. <strong>Commute:</strong> Set workplace, check peak drive time & Glimpse.</li>
                  <li>2. <strong>Reality:</strong> Inspect verified photos & test the photo incentive.</li>
                  <li>3. <strong>Alerts:</strong> Hit 0 matches and set a 14-day auto-off alert.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 02. The Results (Connected to Earlier Research) */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              <ChartPieSlice size={14} weight="bold" />
              <span>02 / The Results (Connected to Earlier Research)</span>
            </div>

            {/* Top Stat Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-950 dark:text-white">97.2%</div>
                <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-1">35/36 Tasks Unassisted</div>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-orange-600 dark:text-orange-400">4.57 / 5</div>
                <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-1">Average Ease of Use</div>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">4.57 / 5</div>
                <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-1">Adoption Likelihood</div>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-950 dark:text-white">~2 mins</div>
                <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-1">Down from 15-20 min</div>
              </div>
            </div>

            {/* Comparative Breakdown Table */}
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121215] shadow-sm">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                  <tr>
                    <th className="py-3 px-4">Feature Pillar</th>
                    <th className="py-3 px-4 hidden md:table-cell">Initial Problem (Research)</th>
                    <th className="py-3 px-4">Ease (1–5)</th>
                    <th className="py-3 px-4">Likelihood</th>
                    <th className="py-3 px-4">Completion</th>
                    <th className="py-3 px-4">Measurable Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                  <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40 transition">
                    <td className="py-3.5 px-4 font-bold text-zinc-950 dark:text-white">
                      Commute & Locality Spine
                    </td>
                    <td className="py-3.5 px-4 text-zinc-500 dark:text-zinc-400 hidden md:table-cell">
                      64.9% left NoBroker to check Google Maps for peak traffic.
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-orange-600 dark:text-orange-400">4.7</td>
                    <td className="py-3.5 px-4 font-mono font-bold">4.6</td>
                    <td className="py-3.5 px-4 font-mono">12/12 (100%)</td>
                    <td className="py-3.5 px-4">
                      Zero app switches. All 12 confirmed commute feasibility and grocery coverage inside the prototype.
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40 transition">
                    <td className="py-3.5 px-4 font-bold text-zinc-950 dark:text-white">
                      Reality Verification
                    </td>
                    <td className="py-3.5 px-4 text-zinc-500 dark:text-zinc-400 hidden md:table-cell">
                      75.7% ran into misleading photos on budget flats, wasting time on bad visits.
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-orange-600 dark:text-orange-400">4.4</td>
                    <td className="py-3.5 px-4 font-mono font-bold">4.3</td>
                    <td className="py-3.5 px-4 font-mono">12/12 (100%)</td>
                    <td className="py-3.5 px-4">
                      Clear visit decisions. Renter photos and usable carpet area numbers helped filter out unlivable flats upfront.
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40 transition">
                    <td className="py-3.5 px-4 font-bold text-zinc-950 dark:text-white">
                      Calm Signal Alerts
                    </td>
                    <td className="py-3.5 px-4 text-zinc-500 dark:text-zinc-400 hidden md:table-cell">
                      43.2% muted rental alerts permanently because of continuous marketing spam.
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-orange-600 dark:text-orange-400">4.6</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">4.8</td>
                    <td className="py-3.5 px-4 font-mono">11/12 (91.7%)</td>
                    <td className="py-3.5 px-4">
                      Highest adoption rating across the app. Renters trusted the 14-day auto-off timer and verified match receipts.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 03. Quote Signals, Friction Observed & Decisions Made */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              <ChatCircleDots size={14} weight="bold" />
              <span>03 / Quote Signals, Friction Observed & Decisions Made</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Decision 1 */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Decision 01</span>
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-white">Peak Rush Hour Transparency</h4>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Quote Signal</span>
                    <p className="text-xs italic text-zinc-700 dark:text-zinc-300">
                      "I like that it says 22 minutes, but is that right now or during Monday 9 AM office traffic?"
                    </p>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <strong>Friction:</strong> Users saw the travel badge on the map and liked the number, but wondered if the time reflected clear afternoon roads or morning peak traffic.
                  </p>
                </div>
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  <strong>The decision:</strong> Added an explicit "Peak Rush Hour (9:00 AM)" tag directly on the listing card and map badge.
                </div>
              </div>

              {/* Decision 2 */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Decision 02</span>
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-white">Two-Hour WhatsApp Photo Window</h4>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Quote Signal</span>
                    <p className="text-xs italic text-zinc-700 dark:text-zinc-300">
                      "The owner was walking me down the stairs. Opening my camera right there felt awkward."
                    </p>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <strong>Friction:</strong> Users wanted the ₹300 moving credit, but felt uncomfortable taking photos while standing right next to the landlord or security guard outside the gate.
                  </p>
                </div>
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  <strong>The decision:</strong> Added an automatic WhatsApp reminder link sent 15 minutes after the visit with a 2-hour upload window.
                </div>
              </div>

              {/* Decision 3 */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Decision 03</span>
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-white">Resolving the Failed Alert Task</h4>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Quote Signal</span>
                    <p className="text-xs italic text-zinc-700 dark:text-zinc-300">
                      "I saw another house right below the box, so I just tapped that one instead of setting an alert."
                    </p>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <strong>Friction:</strong> One participant failed the Calm Alerts task because the zero-match screen showed nearby alternative flats directly below the alert box.
                  </p>
                </div>
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  <strong>The decision:</strong> Reorganized the zero-match layout to give the "Lock Parameters" alert card primary visual focus.
                </div>
              </div>

            </div>
          </div>

          {/* 04. What Could Be Done Next */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              <Compass size={14} weight="bold" />
              <span>04 / What Could Be Done Next</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Future Scope 01</span>
                <h4 className="text-sm font-bold text-zinc-950 dark:text-white">Live Transit & Store Integrations</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Connect The Glimpse directly to real-time city transport APIs and quick-commerce delivery APIs for live bus tracking and active dark store coverage.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Future Scope 02</span>
                <h4 className="text-sm font-bold text-zinc-950 dark:text-white">Community Renter Trust Badges</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Introduce simple badges for renters who regularly contribute honest room photos, letting frequent contributors earn higher discounts on moving services.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Future Scope 03</span>
                <h4 className="text-sm font-bold text-zinc-950 dark:text-white">Owner Availability Heartbeat</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Allow landlords to confirm property availability with a single tap every 7 days, automatically hiding inactive listings so renters never call a flat that was leased last week.
                </p>
              </div>
            </div>
          </div>

        </section>


        {/* =========================================================================
            SECTION 6: MACRO OUTCOMES & DELIBERATE TRADEOFFS (Cyberdart Closing)
           ========================================================================= */}
        <section id="outcomes" className="py-12 space-y-10 scroll-mt-28">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold">
              <Sparkle size={14} weight="fill" />
              <span>System Synthesis · Outcomes & Trade-Offs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white font-sans tracking-tight">
              Good design is defined by what you refuse to build.
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-4xl leading-relaxed">
              These three solutions succeeded because the trade-offs were deliberate. Here is what I chose not to build to protect user attention, trust, and production feasibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tradeoff 1 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Architecture Choice</span>
                <span className="text-xs font-mono text-zinc-400 font-semibold">#01</span>
              </div>
              <h3 className="text-base font-bold text-zinc-950 dark:text-white">Fixing Flow Breaks Over Adding 15 More Filters</h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Renters were never held back by missing filters. They abandoned searches because checking commute feasibility forced them into Google Maps. Building an in-app commute engine solved the actual drop-off point without cluttering the interface with endless dropdowns.
              </p>
            </div>

            {/* Tradeoff 2 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Trust Choice</span>
                <span className="text-xs font-mono text-zinc-400 font-semibold">#02</span>
              </div>
              <h3 className="text-base font-bold text-zinc-950 dark:text-white">Real Visitor Proof Over AI-Generated Summaries</h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Renters are cynical about marketing copy after being burned by staged photos. An AI summary simply repeats landlord claims. Unedited daylight photos and real visitor checklists deliver authentic ground truth that renters actually trust.
              </p>
            </div>

            {/* Tradeoff 3 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Attention Choice</span>
                <span className="text-xs font-mono text-zinc-400 font-semibold">#03</span>
              </div>
              <h3 className="text-base font-bold text-zinc-950 dark:text-white">Quiet Signal Over Vanity Click-Through Blasts</h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Pushing daily notifications artificially inflates app opens for a few days, but permanently drives 43% of users to revoke notifications. Trading daily spam for high-intent, commute-verified alerts restored trust and preserved the alert channel.
              </p>
            </div>

            {/* Tradeoff 4 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">Production Feasibility</span>
                <span className="text-xs font-mono text-zinc-400 font-semibold">#04</span>
              </div>
              <h3 className="text-base font-bold text-zinc-950 dark:text-white">Designing Within NoBroker's Native System</h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                A fantasy visual overhaul looks flashy in a portfolio, but cannot ship in production. Designing inside NoBroker's actual mobile components, typography, and constraints ensures every feature here can realistically go live tomorrow.
              </p>
            </div>

          </div>

          {/* Bottom Call to Action and Return Rail */}
          <div className="p-8 rounded-3xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-bold font-sans">Ready to explore more work?</h3>
              <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-600 font-mono">
                Inspect the chronological research timeline or return to the main portfolio index.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {onSwitchToTimeline && (
                <button
                  onClick={() => {
                    if (soundEnabled) playSound('pop', soundEnabled);
                    onSwitchToTimeline();
                  }}
                  className="px-4 py-2 rounded-full text-xs font-mono font-medium border border-zinc-700 dark:border-zinc-300 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition"
                >
                  View Timeline Process
                </button>
              )}
              <button
                onClick={() => {
                  if (soundEnabled) playSound('pop', soundEnabled);
                  onBack();
                }}
                className="px-5 py-2 rounded-full text-xs font-mono font-bold bg-orange-500 hover:bg-orange-600 text-white transition shadow-sm"
              >
                Back to Index
              </button>
            </div>
          </div>

        </section>

      </div>

      <Footer soundEnabled={soundEnabled} onOpenContact={onOpenContact} />
    </div>
  );
};
