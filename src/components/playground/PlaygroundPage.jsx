import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowSquareOut, 
  Sparkle, 
  Terminal, 
  Cpu, 
  Lightning, 
  ChatCircleDots, 
  Globe, 
  Browsers, 
  ArrowRight, 
  Play, 
  Code, 
  SlidersHorizontal,
  Sun,
  Moon,
  SpeakerHigh,
  SpeakerSlash
} from '@phosphor-icons/react';
import { playSound } from '../../utils/sound';
import { GlobalAsciiBackground } from '../GlobalAsciiBackground';
import { Footer } from '../Footer';

export const PlaygroundPage = ({ 
  onBack, 
  soundEnabled, 
  setSoundEnabled, 
  isDarkMode, 
  setIsDarkMode, 
  onOpenContact,
  onNavigateToProject
}) => {
  const [filter, setFilter] = useState('all'); // 'all' | 'conversational' | 'tactile'

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    playSound('pop', soundEnabled);
  };

  const projects = [
    {
      id: 'flowsy',
      title: 'Flowsy',
      role: 'AI Conversation Coach',
      tagline: 'Make better small talk. Rehearse the awkward moments you usually skip.',
      category: 'conversational',
      badge: 'Conversational Agent',
      liveUrl: 'https://talkflow-mvp.vercel.app',
      thumbnail: '/flowsy-thumbnail.png',
      tech: ['Groq Llama 3.3 70B', 'Web Speech API', 'Clipsy ASCII States', 'Next.js 16', 'Vercel Edge'],
      stats: [
        { label: 'Streaming Latency', val: '< 450ms' },
        { label: 'Scene Depth', val: '4 Moments' },
        { label: 'Emotion Engine', val: 'Clipsy ASCII' },
        { label: 'API Cost', val: '$0 Edge' }
      ],
      description: 'A dark-mode conversational rehearsal playground powered by Groq Llama 3.3 70B. Practice casual small talk in 4 high-friction everyday scenarios with real-time speech synthesis and reactive ASCII emotion states.',
      highlight: 'Silence-Based Coach: Suggests adaptive conversational prompts if hesitation exceeds 4 seconds.'
    },
    {
      id: 'namegenius',
      title: 'NameGenius',
      role: 'Tactile Domain Generator',
      tagline: 'Brand names you can actually own — verified live at the registry before you see them.',
      category: 'tactile',
      badge: 'Tactile Web Engine',
      liveUrl: 'https://namegenius-lilac.vercel.app',
      thumbnail: '/namegenius-thumbnail.png',
      tech: ['IANA RDAP Discovery', 'Avakahada Vedic Chakra', 'Next.js 15', 'Web Audio Synth', 'Tailwind CSS'],
      stats: [
        { label: 'Verification', val: '100% Real RDAP' },
        { label: 'Honesty States', val: '4 Strict Levels' },
        { label: 'Tactile Hardware', val: 'NG-01 Console' },
        { label: 'Cultural Engine', val: 'Vedic Nakshatra' }
      ],
      description: 'Breaks the broken registry loop. Generates 5x candidates, validates against real domain registries in parallel, and renders results through a retro-tactile NG-01 pocket game console aesthetic.',
      highlight: 'Vedic & Vastu Mode: Derives auspicious business names from 108 nakshatra-pada syllables with complete mathematical provenance.'
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0C0C0E] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300 relative overflow-x-hidden">
      
      {/* Ambient Canvas Spotlight */}
      <GlobalAsciiBackground isDarkMode={isDarkMode} />

      {/* Top Floating Glass Navigation Bar */}
      <header className="sticky top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 bg-white/85 dark:bg-[#0C0C0E]/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back to Home CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playSound('pop', soundEnabled);
                onBack();
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 transition-all group"
            >
              <ArrowLeft size={14} weight="bold" className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Portfolio</span>
            </button>

            <span className="hidden sm:inline-block text-zinc-300 dark:text-zinc-700">/</span>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                AI Playground
              </span>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200 transition-colors"
            >
              {isDarkMode ? <Sun size={15} weight="bold" className="text-amber-400" /> : <Moon size={15} weight="bold" className="text-zinc-700" />}
            </button>

            {/* Audio Toggle */}
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

            {/* Contact Modal CTA */}
            <button
              onClick={() => {
                playSound('success', soundEnabled);
                onOpenContact();
              }}
              className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-zinc-100 px-4 py-2 rounded-full text-xs font-bold shadow-sm transition-all"
            >
              Collaborate
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-16 relative z-20">
        
        {/* Hero Section */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-mono font-semibold">
            <Sparkle size={14} weight="fill" className="animate-spin-slow" />
            <span>AUTONOMOUS EXPERIMENTAL SANDBOX // 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.12]">
            Where agentic AI meets <span className="underline decoration-orange-500 decoration-wavy decoration-2 underline-offset-8">tactile craft</span>.
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            A live showcase of functional AI micro-products, conversational agents, and generative systems designed and developed from scratch in this harness. Moving far beyond generic text prompts into tactile, production-grade applications running live at the edge.
          </p>

          {/* Interactive Lab HUD Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-2xs">
              <span className="text-[11px] font-mono uppercase text-zinc-400 block font-semibold">Inference Stack</span>
              <span className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 block truncate">Groq 70B & RDAP</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-2xs">
              <span className="text-[11px] font-mono uppercase text-zinc-400 block font-semibold">Interaction</span>
              <span className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 block truncate">Speech & Tactile UI</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-2xs">
              <span className="text-[11px] font-mono uppercase text-zinc-400 block font-semibold">Deployment</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block truncate">100% Vercel Edge</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-2xs">
              <span className="text-[11px] font-mono uppercase text-zinc-400 block font-semibold">Architecture</span>
              <span className="text-xs sm:text-sm font-bold text-orange-600 dark:text-orange-400 mt-0.5 block truncate">Agentic & Lean</span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mr-2">Filter Lab:</span>
            {[
              { id: 'all', label: 'All Experiments' },
              { id: 'conversational', label: 'Conversational Agents' },
              { id: 'tactile', label: 'Tactile Domain Engines' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => {
                  setFilter(f.id);
                  playSound('pop', soundEnabled);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filter === f.id
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="space-y-12">
          {filteredProjects.map((proj, idx) => (
            <article 
              key={proj.id}
              className="bg-white dark:bg-[#121215] rounded-3xl sm:rounded-4xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-sm overflow-hidden hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Left: Thumbnail & Live Browser Canvas (7 cols) */}
                <div className="lg:col-span-7 bg-zinc-100 dark:bg-[#0E0E11] p-4 sm:p-6 lg:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
                  
                  {/* Browser Mockup Chrome Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-200 dark:border-zinc-800/80">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    </div>
                    
                    <div className="px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
                      <Globe size={11} className="text-zinc-400" />
                      <span className="truncate max-w-[200px] sm:max-w-xs">{proj.liveUrl.replace('https://', '')}</span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span>Live</span>
                    </span>
                  </div>

                  {/* Thumbnail Image with Glass Overlay on Hover */}
                  <div 
                    onClick={() => onNavigateToProject(proj.id)}
                    className="relative rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 aspect-16/10 cursor-pointer shadow-sm group-hover:scale-[1.01] transition-transform duration-300"
                  >
                    <img 
                      src={proj.thumbnail} 
                      alt={`${proj.title} project live thumbnail`}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    
                    {/* Hover Badge Indicator */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                      <span className="px-4 py-2 rounded-full bg-white text-zinc-900 text-xs font-bold shadow-lg flex items-center gap-2 scale-95 group-hover:scale-100 transition-transform">
                        <span>Inspect System Specs</span>
                        <ArrowRight size={13} weight="bold" />
                      </span>
                    </div>
                  </div>

                  {/* Key Stats Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                    {proj.stats.map((s, sIdx) => (
                      <div key={sIdx} className="text-left">
                        <span className="text-[10px] font-mono uppercase text-zinc-400 font-semibold block">{s.label}</span>
                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block truncate">{s.val}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Right: Narrative, Stack & Direct CTAs (5 cols) */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                        {proj.badge}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">#0{idx + 1}</span>
                    </div>

                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                        {proj.title}
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 mt-1">
                        {proj.role}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Proactive Innovation Callout */}
                    <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 text-xs space-y-1">
                      <span className="font-mono text-[10px] uppercase font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
                        <Lightning size={13} weight="fill" />
                        <span>Core Innovation</span>
                      </span>
                      <p className="text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
                        {proj.highlight}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">Engine Stack</span>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tech.map((t, tIdx) => (
                          <span 
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 text-[11px] font-mono font-medium border border-zinc-200/70 dark:border-zinc-700/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() => {
                        playSound('pop', soundEnabled);
                        onNavigateToProject(proj.id);
                      }}
                      className="flex-1 px-4 py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-zinc-100 text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-98"
                    >
                      <span>Explore Case & System</span>
                      <ArrowRight size={13} weight="bold" />
                    </button>

                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playSound('success', soundEnabled)}
                      className="px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
                    >
                      <span>Launch Live App</span>
                      <ArrowSquareOut size={14} weight="bold" className="text-orange-500" />
                    </a>
                  </div>

                </div>

              </div>
            </article>
          ))}
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
