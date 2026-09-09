import React from 'react';
import { GameController, Buildings, Coffee, Sparkle, Compass, MapPin, PaintBrush } from '@phosphor-icons/react';

export const ProjectMockup = ({ project, interactive = true }) => {
  if (project.id === 'nobroker-commute') {
    return (
      <div className="w-full h-full bg-[#081717] text-white p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden select-none border border-emerald-500/20 shadow-inner">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#009999]/25 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center justify-between text-xs text-white/60 border-b border-white/10 pb-3">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#009999] animate-pulse" />
            <span className="text-[#009999] font-bold">NOBROKER SPATIAL ENGINE</span>
          </div>
          <span className="font-mono text-[10px] bg-[#009999]/20 text-[#5ce1e1] px-2.5 py-0.5 rounded-full border border-[#009999]/40 font-bold">
            PS2 SPINE · HI-FI LAB
          </span>
        </div>

        <div className="my-3 p-4 rounded-2xl bg-gradient-to-br from-[#004D4D] to-[#002B2B] border border-[#009999]/30 text-white shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-mono text-[#5ce1e1]">In-App Commute & Routing</p>
              <p className="text-xl font-bold font-sans tracking-tight mt-0.5">Search by Commute</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#009999]/30 border border-[#009999]/50 flex items-center justify-center">
              <Compass size={20} weight="duotone" className="text-[#5ce1e1]" />
            </div>
          </div>
          <div className="mt-3 flex justify-between items-center text-[10px] font-mono text-white/80">
            <span className="bg-black/30 px-2 py-0.5 rounded-md">POINT A ➔ 1–5 KM RADIUS</span>
            <span className="text-emerald-400 font-bold">GLIMPSE V6 READY</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <MapPin size={14} weight="fill" className="text-[#009999]" />
            <span className="text-white/90 font-medium">Multi-Amenity & Transit Tabs</span>
          </div>
          <span className="font-mono text-[11px] text-[#5ce1e1]">Bengaluru Focus</span>
        </div>
      </div>
    );
  }

  if (project.id === 'image-of-a-child') {
    return (
      <div className="w-full h-full bg-[#181614] text-white p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden select-none border border-white/10 shadow-inner">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#E07A5F]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center justify-between text-xs text-white/50 border-b border-white/5 pb-3">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>IOAC LMS PLATFORM</span>
          </div>
          <span className="font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-[#F4A261]">
            2,000+ GAMIFIED ACTIVITIES
          </span>
        </div>

        <div className="my-3 p-4 rounded-2xl bg-gradient-to-br from-[#E07A5F] to-[#C86D51] text-white shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-medium text-white/80">Mini-Game UI Template Engine</p>
              <p className="text-xl font-bold font-sans tracking-tight mt-0.5">Early Childhood EdTech</p>
            </div>
            <GameController size={24} weight="duotone" className="text-white/90" />
          </div>
          <div className="mt-3 flex justify-between items-center text-[10px] font-mono text-white/80">
            <span>MIDJOURNEY AI INTEGRATION</span>
            <span className="bg-black/20 px-2 py-0.5 rounded-full">12 DESIGNERS LED</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white/90 font-medium">LMS Web & Mobile App Interface</span>
          </div>
          <span className="font-mono text-[11px] text-white/60">Amphiventures</span>
        </div>
      </div>
    );
  }

  if (project.id === 'freckled-cubism') {
    return (
      <div className="w-full h-full bg-[#FAF5EE] dark:bg-[#1E1B18] text-[#1E1B18] dark:text-white p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden border border-[#E8DFC8] dark:border-white/10">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#C86D51] uppercase font-bold">Cubism Rebrand & Web</span>
            <h4 className="font-serif text-2xl italic tracking-tight text-[#1E1B18] dark:text-white mt-0.5">Freckled Platform</h4>
          </div>
          <span className="text-[10px] font-mono bg-[#C86D51]/10 text-[#C86D51] px-2 py-1 rounded-full font-bold">
            +33% TRAFFIC
          </span>
        </div>

        <div className="my-3 bg-white/90 dark:bg-[#25221F] p-4 rounded-2xl border border-[#E8DFC8] dark:border-white/10 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-ink dark:text-white">Web Performance Revamp</span>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">2.5x Faster Load</span>
          </div>
          <div className="w-full bg-[#FAF5EE] dark:bg-[#1A1816] h-2 rounded-full overflow-hidden">
            <div className="w-[85%] h-full bg-[#C86D51]" />
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#686058] dark:text-white/70 font-mono border-t border-[#E8DFC8] dark:border-white/10 pt-3">
          <span>KRPIET & HUMAN INVERSE</span>
          <span className="font-serif italic text-[#C86D51]">Cubism UI Theme</span>
        </div>
      </div>
    );
  }

  if (project.id === 'poster-challenge') {
    return (
      <div className="w-full h-full bg-[#0E0C10] text-white p-5 sm:p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden select-none border border-orange-500/20 shadow-inner">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#FF4D2E]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#CCFF00]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top header row */}
        <div className="flex items-center justify-between text-xs text-white/60 border-b border-white/10 pb-2.5 relative z-10">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#FF4D2E] animate-pulse" />
            <span className="text-[#FF7A5C] font-bold tracking-wider text-[11px]">30-DAY POSTER SPRINT</span>
          </div>
          <span className="font-mono text-[10px] bg-[#FF4D2E]/20 text-[#FF8F77] px-2.5 py-0.5 rounded-full border border-[#FF4D2E]/40 font-bold">
            SERIES 01–30
          </span>
        </div>

        {/* Center Poster Preview Card */}
        <div className="my-2.5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-[#1E161C] to-[#120E15] border border-white/10 text-white shadow-xl relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#CCFF00]">Daily Editorial & Grid Experiments</p>
              <p className="text-lg sm:text-xl font-bold font-sans tracking-tight mt-0.5">Swiss Typography & Form</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#FF4D2E]/20 border border-[#FF4D2E]/40 flex items-center justify-center shrink-0">
              <PaintBrush size={16} weight="duotone" className="text-[#FF7A5C]" />
            </div>
          </div>

          {/* Mini 3-poster ribbon thumbnail preview */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="h-14 rounded-lg bg-[#271E25] border border-white/10 p-1.5 flex flex-col justify-between">
              <span className="text-[8px] font-mono text-orange-400 font-bold">#07</span>
              <div className="w-full h-1 bg-[#FF4D2E] rounded-full" />
              <span className="text-[7px] font-mono text-white/60 truncate">SWISS GRID</span>
            </div>
            <div className="h-14 rounded-lg bg-[#24211A] border border-white/10 p-1.5 flex flex-col justify-between">
              <span className="text-[8px] font-mono text-[#CCFF00] font-bold">#18</span>
              <div className="w-full h-1 bg-[#CCFF00] rounded-full" />
              <span className="text-[7px] font-mono text-white/60 truncate">BRUTALIST</span>
            </div>
            <div className="h-14 rounded-lg bg-[#1D212A] border border-white/10 p-1.5 flex flex-col justify-between">
              <span className="text-[8px] font-mono text-teal-400 font-bold">#29</span>
              <div className="w-full h-1 bg-teal-400 rounded-full" />
              <span className="text-[7px] font-mono text-white/60 truncate">KINETIC</span>
            </div>
          </div>
        </div>

        {/* Bottom meta row */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10 text-xs relative z-10">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-white/80">
            <span className="text-[#CCFF00] font-bold">30/30</span>
            <span>Compositions Completed</span>
          </div>
          <span className="font-mono text-[10px] text-white/50">Graphic & Brand</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#181614] text-white p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden select-none border border-white/10 shadow-inner">
      <div className="flex items-center justify-between text-xs text-white/50 border-b border-white/5 pb-3">
        <span className="font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-orange-400">
          {project.categoryLabel || 'Case Study'}
        </span>
        <span className="font-mono text-[11px] text-white/60">{project.year}</span>
      </div>

      <div className="my-3 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
        <h4 className="font-sans text-xl font-bold text-white tracking-tight">{project.title}</h4>
        <p className="text-xs text-white/70 line-clamp-2">{project.summary}</p>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-white/40 border-t border-white/5 pt-3">
        <span>{project.company}</span>
        <span className="text-orange-400 font-medium">Selected Work</span>
      </div>
    </div>
  );
};
