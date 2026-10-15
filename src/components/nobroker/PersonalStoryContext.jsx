import React from 'react';
import { 
  Sparkle, 
  LightbulbFilament, 
  Users, 
  NavigationArrow, 
  DeviceMobileCamera, 
  Compass, 
  ChatCircleDots,
  XCircle,
  HouseSimple,
  BellSlash
} from '@phosphor-icons/react';
import { KineticHeading } from '../../utils/motion';

export const PersonalStoryContext = () => {
  return (
    <section className="py-16 border-b border-zinc-200 dark:border-zinc-800 relative space-y-14">
      {/* Section Tag */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold mb-2">
          <Sparkle size={14} weight="fill" />
          <span>01 · Context & The Starting Assumption</span>
        </div>
        <KineticHeading 
          as="h2"
          text="I started with an assumption, and the research refined it."
          className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight"
        />
      </div>

      {/* Story Narrative on Left + Hypothesis Box on Right */}
      <div data-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="lg:col-span-7 space-y-4 text-zinc-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed">
          <p>
            When I moved from a smaller town to Bengaluru, I spent evenings after work searching for a flat so I could avoid paying two months of rent in broker fees. NoBroker was supposed to make that easy, but in a new city, distances are deceptive. Choke-point traffic, tanker water schedules, and misleading commute times meant hours spent bouncing across open tabs with zero actual visits scheduled.
          </p>
          <p>
            I initially assumed renters struggled because comparing amenities and pricing was overwhelming, and that adding travel-time tags would fix it. That hypothesis turned out to be wrong. Research showed that people were dropping out not because comparing listings was difficult, but because the listings hid everyday offline realities, forcing renters to manually vet every single property on other apps before taking a step.
          </p>
        </div>

        {/* Narrative Sidebox: The Initial Statement */}
        <div className="lg:col-span-5 bg-[#FAF9F6] dark:bg-[#121215] border border-[#E5E3DC] dark:border-zinc-800/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs relative overflow-hidden">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold mb-3">
              <LightbulbFilament size={16} weight="bold" />
              Starting Assumption (Hypothesis v1)
            </div>
            <blockquote className="text-zinc-800 dark:text-zinc-200 text-sm sm:text-base italic border-l-2 border-orange-500 pl-4 py-1 mb-4 leading-relaxed">
              "Renters struggle to choose between listings because comparing amenities and pricing causes fatigue. If we add travel-time tags, renters will pick flats faster."
            </blockquote>
          </div>

          <div className="pt-4 border-t border-[#E5E3DC]/70 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <span>Hypothesis v1 · August 2026</span>
            <span className="text-orange-600 dark:text-orange-400 font-bold">Turned out to be wrong</span>
          </div>
        </div>
      </div>

      {/* Research Methodology Bridge */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold">
          <Sparkle size={14} weight="fill" />
          <span>02 · Research Discovery & Real Behaviors</span>
        </div>
        <KineticHeading 
          as="h3"
          text="What 52 surveys and 7 interviews revealed"
          className="text-xl sm:text-2xl md:text-3xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight"
        />
        <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg max-w-4xl leading-relaxed">
          I surveyed <strong>52 renters</strong> (filtering to 37 actively searching across Bengaluru, Mumbai, Pune, and Hyderabad) and conducted <strong>7 in-depth interviews</strong> with migrating professionals. Instead of asking what features people wanted, I watched them search. Over 45-to-90-minute sessions, I noted where they got stuck, why they left the app, and how they scrambled to verify listing details on their own.
        </p>
      </div>

      {/* 4 Observed Coping Tactics */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-orange-500" weight="bold" />
          <h4 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-900 dark:text-zinc-200 font-bold">
            Four Coping Tactics Observed Across 7 Qualitative Interviews
          </h4>
        </div>

        <div data-reveal-group className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tactic 01 */}
          <div data-reveal-child className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800/90 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <NavigationArrow size={20} weight="bold" />
              </span>
              <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full">
                Tactic 01
              </span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 dark:text-white">
                Split-Screen Hopping
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                Renters kept <strong>NoBroker on one side and Google Maps on the other</strong>, testing <strong>9:00 AM rush hour delays</strong> for every single listing.
              </p>
            </div>
          </div>

          {/* Tactic 02 */}
          <div data-reveal-child className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800/90 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <DeviceMobileCamera size={20} weight="bold" />
              </span>
              <span className="text-xs font-mono font-bold text-orange-700 dark:text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full">
                Tactic 02
              </span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 dark:text-white">
                WhatsApp Videos
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                Burned by wide-angle photos, renters begged landlords for <strong>unedited video walkthroughs</strong> before traveling across town.
              </p>
            </div>
          </div>

          {/* Tactic 03 */}
          <div data-reveal-child className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800/90 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Compass size={20} weight="bold" />
              </span>
              <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full">
                Tactic 03
              </span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 dark:text-white">
                Street View Checks
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                Users scrutinized <strong>street lighting, water tanker traffic, and footpath conditions</strong> via Google Street View.
              </p>
            </div>
          </div>

          {/* Tactic 04 */}
          <div data-reveal-child className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800/90 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <ChatCircleDots size={20} weight="bold" />
              </span>
              <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                Tactic 04
              </span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 dark:text-white">
                Backchannel Checks
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                Asking friends and local Telegram groups about <strong>water supply, power cuts, and neighborhood safety</strong> instead of trusting listing claims.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Survey Insights Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkle size={16} className="text-orange-500" weight="fill" />
          <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-900 dark:text-zinc-200 font-bold">
            Survey Insights · 37 Active Searchers
          </h3>
        </div>

        <div data-reveal-group className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: 64.9% */}
          <div data-reveal-child className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800/90 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <NavigationArrow size={20} weight="bold" />
              </span>
              <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full">
                64.9% (24/37)
              </span>
            </div>
            <div>
              <div className="text-2xl font-bold font-sans text-zinc-900 dark:text-white">
                Left for Maps
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                Regularly switched into <strong>Google Maps</strong> to calculate realistic rush-hour travel times before continuing.
              </p>
            </div>
          </div>

          {/* Card 2: 89.2% */}
          <div data-reveal-child className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800/90 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <XCircle size={20} weight="bold" />
              </span>
              <span className="text-xs font-mono font-bold text-orange-700 dark:text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full">
                89.2% (33/37)
              </span>
            </div>
            <div>
              <div className="text-2xl font-bold font-sans text-zinc-900 dark:text-white">
                Search Abandonment
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                Closed NoBroker mid-search and <strong>never came back</strong> after switching to other apps.
              </p>
            </div>
          </div>

          {/* Card 3: 75.7% */}
          <div data-reveal-child className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800/90 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <HouseSimple size={20} weight="bold" />
              </span>
              <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full">
                75.7% (28/37)
              </span>
            </div>
            <div>
              <div className="text-2xl font-bold font-sans text-zinc-900 dark:text-white">
                Phantom Listings
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                Contacted owners only to find the home was <strong>already rented out</strong> days or weeks earlier.
              </p>
            </div>
          </div>

          {/* Card 4: 43.2% */}
          <div data-reveal-child className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800/90 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
                <BellSlash size={20} weight="bold" />
              </span>
              <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-500/10 px-2.5 py-0.5 rounded-full">
                43.2% (16/37)
              </span>
            </div>
            <div>
              <div className="text-2xl font-bold font-sans text-zinc-900 dark:text-white">
                Notification Mutes
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                <strong>Muted notifications completely</strong> because alerts repeatedly pushed irrelevant or already-seen homes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
