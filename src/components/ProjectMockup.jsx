import React from 'react';
import { GameController, Buildings, Coffee, Sparkle } from '@phosphor-icons/react';

export const ProjectMockup = ({ project, interactive = true }) => {
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

  if (project.id === 'smartworks-spaces') {
    return (
      <div className="w-full h-full bg-[#121417] text-white p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden border border-white/10">
        <div className="flex items-center justify-between text-xs border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Buildings size={18} weight="duotone" className="text-[#4A7C59]" />
            <span className="font-mono text-white/80">Smartworks Co-Working</span>
          </div>
          <span className="font-mono text-[10px] bg-[#4A7C59]/20 text-[#85C49B] px-2 py-0.5 rounded-full border border-[#4A7C59]/30">
            20+ MNC BRANDS
          </span>
        </div>

        <div className="my-3 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <p className="text-xs text-white/60 font-mono uppercase">Clients Delivered:</p>
          <div className="flex flex-wrap gap-1.5">
            {['HP', 'Teva Pharma', 'Havells', 'Bridgestone'].map((brand, i) => (
              <span key={i} className="text-[11px] bg-white/10 text-white font-medium px-2 py-0.5 rounded-md">
                {brand}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center text-[10px] text-white/40 font-mono">
          <span>WALL ART & GLASS FROSTING</span>
          <span>BLUEPRINT RENDERS</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#FAF7F2] dark:bg-[#1E1B18] text-[#1E1B18] dark:text-white p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden border border-[#E6DCCE] dark:border-white/10">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1.5">
          <Coffee size={18} weight="duotone" className="text-[#D97706]" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#D97706] font-bold">Sorbetto Gelateria</span>
        </div>
        <span className="font-mono text-[10px] bg-[#FFF3D6] dark:bg-[#3D2C10] text-[#B45309] dark:text-[#FBBF24] px-2 py-0.5 rounded-full font-bold">
          BRANDING & MENUS
        </span>
      </div>

      <div className="my-3 p-4 bg-white dark:bg-[#25221F] rounded-2xl border border-[#E6DCCE] dark:border-white/10 shadow-sm">
        <h4 className="font-serif text-xl italic text-[#1E1B18] dark:text-white">"Crafting appetizing visual identities."</h4>
        <p className="text-[11px] text-[#686058] dark:text-white/70 mt-1">Menu Boards • Banners • Instagram Marketing</p>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-[#686058] dark:text-white/60 border-t border-[#E6DCCE] dark:border-white/10 pt-3">
        <span>STORE SIGNAGE</span>
        <span>CAMPAIGN DESIGN</span>
      </div>
    </div>
  );
};
