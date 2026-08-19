import React, { useState } from 'react';
import { ArrowDown, Sparkles, Copy, Check, ExternalLink, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { designerProfile, stickerInventory } from '../data/portfolioData';
import { playSound } from '../utils/sound';

export const Hero = ({ soundEnabled, onOpenContact, onSelectTag }) => {
  const [copied, setCopied] = useState(false);
  const [activeStickerTip, setActiveStickerTip] = useState(null);

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(designerProfile.email);
    setCopied(true);
    playSound('success', soundEnabled);

    // Fire cozy warm confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#E07A5F', '#F4A261', '#588157', '#E9C46A']
    });

    setTimeout(() => setCopied(false), 2500);
  };

  const handleStickerClick = (sticker) => {
    playSound('pop', soundEnabled);
    setActiveStickerTip(sticker);
    setTimeout(() => setActiveStickerTip(null), 4000);
  };

  return (
    <section id="home" className="pt-28 sm:pt-36 pb-16 px-4 sm:px-8 max-w-6xl mx-auto">
      
      {/* Availability Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/10 shadow-cozy-sm mb-6 text-xs text-ink-muted">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-medium text-ink">{designerProfile.status}</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4 max-w-4xl">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-ink leading-[1.1]">
          Designing <span className="font-serif italic font-normal text-accent-terracotta">warm</span>, tactile digital products & memorable visual identities.
        </h1>

        <p className="text-lg sm:text-xl text-ink-muted leading-relaxed font-sans max-w-2xl pt-2">
          Hey, I’m <strong className="text-ink font-semibold">{designerProfile.name}</strong>. I bridge the thoughtful craft of graphic design with the systematic rigor of UI/UX, drawing daily inspiration from real-world patterns on Mobbin.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a 
          href="#work"
          onClick={() => playSound('pop', soundEnabled)}
          className="bg-ink hover:bg-black text-canvas px-6 py-3.5 rounded-full text-sm font-semibold shadow-cozy flex items-center gap-2 tactile-btn transition-all"
        >
          <span>Explore Selected Work</span>
          <ArrowDown size={16} className="text-accent-butter animate-bounce" />
        </a>

        <button
          onClick={handleCopyEmail}
          className="bg-white hover:bg-white/90 text-ink border border-black/10 px-5 py-3.5 rounded-full text-sm font-medium shadow-cozy-sm flex items-center gap-2 tactile-btn transition-all"
        >
          {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} className="text-ink-muted" />}
          <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
        </button>

        <a
          href="#playground"
          onClick={() => playSound('pop', soundEnabled)}
          className="px-5 py-3.5 rounded-full text-sm font-medium text-ink-muted hover:text-ink hover:bg-black/5 transition-all flex items-center gap-1.5"
        >
          <Sparkles size={16} className="text-accent-terracotta" />
          <span>Interactive Lab</span>
        </a>
      </div>

      {/* Interactive Sticker Shelf */}
      <div className="mt-12 pt-8 border-t border-black/5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-mono uppercase tracking-widest text-ink-faint flex items-center gap-1.5">
            <span>✨ Click badges to unpack design superpowers:</span>
          </p>
          {activeStickerTip && (
            <span className="text-xs font-medium text-accent-terracotta bg-white px-3 py-1 rounded-full border border-black/10 shadow-cozy-sm animate-fade-in">
              {activeStickerTip.quote}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2.5">
          {stickerInventory.map((sticker) => (
            <button
              key={sticker.id}
              onClick={() => handleStickerClick(sticker)}
              className="bg-white hover:bg-surface-warm active:scale-95 border border-black/10 px-3.5 py-2 rounded-2xl text-xs font-medium text-ink shadow-cozy-sm flex items-center gap-1.5 transition-all hover:-translate-y-0.5 hover:shadow-cozy"
            >
              <span>{sticker.emoji}</span>
              <span>{sticker.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Ribbon */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {designerProfile.stats.map((stat, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-white/70 border border-black/5 shadow-cozy-sm">
            <p className="text-2xl sm:text-3xl font-bold font-sans text-ink tracking-tight">{stat.value}</p>
            <p className="text-xs text-ink-muted mt-1 font-sans">{stat.label}</p>
          </div>
        ))}
      </div>

    </section>
  );
};
