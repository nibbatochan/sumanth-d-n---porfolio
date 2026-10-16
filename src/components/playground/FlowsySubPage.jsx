import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowSquareOut, 
  Sparkle, 
  ChatCircleDots, 
  Microphone, 
  SpeakerHigh, 
  SpeakerSlash, 
  Sun, 
  Moon, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  Cpu, 
  Lightning, 
  Smiley, 
  ArrowsClockwise,
  Browsers
} from '@phosphor-icons/react';
import { playSound } from '../../utils/sound';
import { GlobalAsciiBackground } from '../GlobalAsciiBackground';
import { Footer } from '../Footer';

export const FlowsySubPage = ({ 
  onBack, 
  soundEnabled, 
  setSoundEnabled, 
  isDarkMode, 
  setIsDarkMode, 
  onOpenContact 
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    playSound('pop', soundEnabled);
  };

  const liveUrl = "https://talkflow-mvp.vercel.app";

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0C0C0E] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300 relative overflow-x-hidden">
      
      {/* Ambient Spotlight Background */}
      <GlobalAsciiBackground isDarkMode={isDarkMode} />

      {/* Top Floating Navigation */}
      <header className="sticky top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 bg-white/85 dark:bg-[#0C0C0E]/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 transition-all">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          
          {/* Breadcrumbs & Back */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                playSound('pop', soundEnabled);
                onBack();
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 transition-all group"
            >
              <ArrowLeft size={14} weight="bold" className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Playground</span>
            </button>

            <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">/</span>

            <span className="text-xs font-mono font-semibold text-zinc-500 hidden sm:inline">
              Flowsy System Spec
            </span>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            <button 
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200 transition-colors"
            >
              {isDarkMode ? <Sun size={15} weight="bold" className="text-amber-400" /> : <Moon size={15} weight="bold" className="text-zinc-700" />}
            </button>

            {setSoundEnabled && (
              <button 
                onClick={() => {
                  const next = !soundEnabled;
                  setSoundEnabled(next);
                  playSound('toggle', next);
                }}
                aria-label="Toggle audio"
                className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200 transition-colors"
              >
                {soundEnabled ? <SpeakerHigh size={15} weight="bold" className="text-orange-500" /> : <SpeakerSlash size={15} weight="bold" className="text-zinc-400" />}
              </button>
            )}

            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('success', soundEnabled)}
              className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
            >
              <span>Launch Flowsy</span>
              <ArrowSquareOut size={13} weight="bold" />
            </a>
          </div>

        </div>
      </header>

      {/* Main Content Article */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-16 relative z-20">
        
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-mono font-bold">
            <Sparkle size={13} weight="fill" />
            <span>AGENTIC CONVERSATIONAL LAB // HARNESS BUILT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Flowsy
          </h1>

          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
            Make better small talk. Rehearse the awkward moments you usually skip.
          </p>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Built entirely in this harness, Flowsy is a conversational rehearsal app designed to conquer everyday social paralysis. Instead of clinical chat prompts, it simulates real-world low-stakes encounters (coffee shop counters, elevator rides, laundromats) with streamed voice synthesis, an ASCII reactive emotional companion, and a warm post-session debrief.
          </p>
        </div>

        {/* Live Mockup Presentation Card */}
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121215] shadow-xl overflow-hidden space-y-0">
          
          {/* Window Chrome Header */}
          <div className="px-4 py-3 bg-zinc-100 dark:bg-[#0E0E11] border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
            </div>

            <div className="px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>talkflow-mvp.vercel.app</span>
            </div>

            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
            >
              <span>Visit</span>
              <ArrowSquareOut size={12} weight="bold" />
            </a>
          </div>

          {/* High-Res Interactive Thumbnail Frame */}
          <div className="relative group overflow-hidden">
            <img 
              src="/flowsy-thumbnail.png" 
              alt="Flowsy conversational AI application screen"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('success', soundEnabled)}
                className="px-5 py-2.5 rounded-full bg-white text-zinc-900 text-xs font-bold shadow-xl flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <span>Launch Live Web Application</span>
                <ArrowSquareOut size={14} weight="bold" />
              </a>
            </div>
          </div>
        </div>

        {/* Section 1: The Problem Framing */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
            <span>01 // The Friction</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Why small talk freezes us — and why chatbots failed it
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Most people do not struggle with social conversation because they lack intelligence; they struggle with <strong>situational latency</strong> and <strong>high perceived stakes</strong>. When someone asks "How's your coffee?", our minds calculate twenty responses before the window of opportunity snaps shut.
          </p>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Standard conversational chatbots fail as rehearsal tools because they generate essay-length paragraphs, never interrupt, and have no concept of turn-taking cadence. Flowsy limits persona responses to 1–2 crisp spoken sentences and forces natural conversation rhythm.
          </p>
        </section>

        {/* Section 2: Core Engineering Pillars */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
            <span>02 // The System Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Engineered for zero latency and emotional resonance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <ChatCircleDots size={20} weight="bold" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                4 Realistic Scene Moments
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Coffee shop counters, rainy bus stops, laundromat folding tables, and grocery lines. Each scenario introduces its own ambient context and realistic background distraction.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <Lightning size={20} weight="bold" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Silence-Based Coaching
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                A background timer detects pauses. If the user hesitates longer than 4 seconds, Flowsy quietly reveals 3 adaptive contextual reply chips to unblock flow.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <Smiley size={20} weight="bold" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Clipsy ASCII Character
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                A charming retro ASCII companion with 5 reactive visual states (Speaking jitter, Blink cycle, Thinking, Delighted, Puzzled) parsed directly from LLM sentiment tags.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <CheckCircle size={20} weight="bold" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Empathetic 3-Part Debrief
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Zero clinical judgment. Evaluates warmth, question open-endedness, and conversational momentum, giving actionable observations rather than a cold numerical grade.
              </p>
            </div>

          </div>
        </section>

        {/* Section 3: Tech Stack & Privacy */}
        <section className="p-6 sm:p-8 rounded-3xl bg-zinc-100 dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} weight="bold" className="text-emerald-500" />
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
              Lean, Zero-Database Architecture
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Flowsy stores rehearsal state strictly in browser <code>localStorage</code>. No audio recordings or transcripts are logged to remote servers. By combining Groq's high-throughput LLaMA 3.3 inference with native browser speech synthesis, the entire application operates at <strong>$0 server overhead</strong> on Vercel Edge.
          </p>
        </section>

        {/* Final Launch Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-500/10 via-zinc-900 to-black text-white border border-orange-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold">Try Flowsy in your browser</h4>
            <p className="text-xs text-zinc-300">Experience the speech synthesis and Clipsy ASCII emotion engine live.</p>
          </div>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('success', soundEnabled)}
            className="px-6 py-3 rounded-full bg-white text-zinc-950 font-bold text-xs hover:bg-zinc-200 transition-all flex items-center gap-2 shrink-0 shadow-lg"
          >
            <span>Launch Live App</span>
            <ArrowSquareOut size={14} weight="bold" />
          </a>
        </div>

      </main>

      {/* Footer */}
      <Footer 
        soundEnabled={soundEnabled}
        onOpenContact={onOpenContact}
      />

    </div>
  );
};
