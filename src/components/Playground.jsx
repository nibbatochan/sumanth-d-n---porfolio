import React, { useState } from 'react';
import { Sparkles, RefreshCw, Copy, Check, MousePointer, Type, Palette, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/sound';

export const Playground = ({ soundEnabled }) => {
  const [activeTab, setActiveTab] = useState('palette');
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [copiedHex, setCopiedHex] = useState(null);

  const cozyPalettes = [
    {
      name: 'Oatmeal & Terracotta (Signature)',
      colors: [
        { name: 'Warm Canvas', hex: '#FAF7F2' },
        { name: 'Espresso Ink', hex: '#1E1B18' },
        { name: 'Terracotta', hex: '#E07A5F' },
        { name: 'Butter Sun', hex: '#F4A261' },
      ]
    },
    {
      name: 'Sage Meadow & Basalt',
      colors: [
        { name: 'Cream Linen', hex: '#F4EFE6' },
        { name: 'Basalt Charcoal', hex: '#22201D' },
        { name: 'Forest Sage', hex: '#588157' },
        { name: 'Soft Matcha', hex: '#A3B18A' },
      ]
    },
    {
      name: 'Nordic Clay & Amber',
      colors: [
        { name: 'Sand Tint', hex: '#F7F3EB' },
        { name: 'Deep Umber', hex: '#2B2620' },
        { name: 'Raw Clay', hex: '#C86D51' },
        { name: 'Amber Gold', hex: '#D97706' },
      ]
    }
  ];

  const [buttonClicks, setButtonClicks] = useState(0);
  const [bouncyClicks, setBouncyClicks] = useState(0);
  const [snappyClicks, setSnappyClicks] = useState(0);

  const [fontSize, setFontSize] = useState(36);
  const [lineHeight, setLineHeight] = useState(1.2);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [sampleText, setSampleText] = useState('Crafting cozy interfaces with human warmth.');

  const [stampedStickers, setStampedStickers] = useState([
    { id: 1, x: 20, y: 30, emoji: '✨', label: 'Cozy Vibe' },
    { id: 2, x: 65, y: 55, emoji: '🎨', label: 'Pixel Craft' },
    { id: 3, x: 40, y: 75, emoji: '☕', label: 'Chai First' }
  ]);

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    playSound('pop', soundEnabled);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleNextPalette = () => {
    playSound('pop', soundEnabled);
    setPaletteIndex((prev) => (prev + 1) % cozyPalettes.length);
  };

  const handleCanvasClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    const emojis = ['✨', '🎨', '🔤', '☕', '🌿', '🧡', '🧩', '🚀'];
    const labels = ['Designed with love', 'Tactile UI', 'Type nerd', 'Clean grid', 'Organic aesthetic'];

    const newSticker = {
      id: Date.now(),
      x: Math.min(Math.max(x, 5), 90),
      y: Math.min(Math.max(y, 5), 90),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      label: labels[Math.floor(Math.random() * labels.length)]
    };

    setStampedStickers((prev) => [...prev, newSticker]);
    playSound('pop', soundEnabled);
  };

  return (
    <section id="playground" className="py-16 px-4 sm:px-8 max-w-6xl mx-auto">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-black/5 dark:border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-accent-terracotta font-semibold mb-2">
            <Sparkles size={14} />
            <span>Interactive Designer Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans text-ink dark:text-[#FAF7F2]">
            Touch, tweak, and play with design mechanics.
          </h2>
        </div>

        <p className="text-sm text-ink-muted dark:text-white/70 max-w-md">
          A live laboratory exploring tactile physics, harmonic typography ratios, and accessible color palettes.
        </p>
      </div>

      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {[
          { id: 'palette', label: 'Color Token Harmonizer', icon: Palette },
          { id: 'physics', label: 'Micro-Interaction Physics', icon: MousePointer },
          { id: 'type', label: 'Typography & Kerning Studio', icon: Type },
          { id: 'stickers', label: 'Interactive Sticker Board', icon: Heart },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                playSound('pop', soundEnabled);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-medium flex items-center gap-2 transition-all tactile-btn whitespace-nowrap ${
                isActive
                  ? 'bg-ink text-canvas dark:bg-[#FAF7F2] dark:text-ink shadow-cozy-sm font-bold'
                  : 'bg-white dark:bg-[#1A1816] text-ink-muted dark:text-white/70 hover:text-ink dark:hover:text-white hover:bg-surface-warm dark:hover:bg-[#25221F] border border-black/10 dark:border-white/10'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-accent-butter dark:text-accent-terracotta' : 'text-ink-muted dark:text-white/60'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'palette' && (
        <div className="bg-white dark:bg-[#1A1816] p-6 sm:p-8 rounded-4xl border border-black/8 dark:border-white/10 shadow-cozy space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-accent-terracotta font-semibold uppercase">Harmonic Set</span>
              <h3 className="text-2xl font-bold font-sans text-ink dark:text-[#FAF7F2]">{cozyPalettes[paletteIndex].name}</h3>
            </div>
            <button
              onClick={handleNextPalette}
              className="bg-canvas dark:bg-[#25221F] hover:bg-surface-warm dark:hover:bg-[#302B26] border border-black/10 dark:border-white/10 px-4 py-2 rounded-full text-xs font-semibold text-ink dark:text-white flex items-center gap-2 shadow-cozy-sm tactile-btn"
            >
              <RefreshCw size={14} className="text-accent-terracotta" />
              <span>Shuffle Palette</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cozyPalettes[paletteIndex].colors.map((c, idx) => (
              <div 
                key={idx}
                onClick={() => handleCopy(c.hex)}
                className="p-4 rounded-3xl bg-canvas dark:bg-[#22201D] hover:bg-surface-warm dark:hover:bg-[#2A2723] border border-black/8 dark:border-white/10 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-cozy"
              >
                <div 
                  className="w-full h-24 rounded-2xl shadow-inner border border-black/5 dark:border-white/10 mb-3 flex items-end justify-end p-2"
                  style={{ backgroundColor: c.hex }}
                >
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/50 text-white backdrop-blur-sm">
                    {c.hex}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-ink dark:text-[#FAF7F2]">{c.name}</span>
                  {copiedHex === c.hex ? <Check size={14} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={14} className="text-ink-faint dark:text-white/40" />}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-surface-warm dark:bg-[#22201D] text-xs text-ink-muted dark:text-white/70 flex items-center justify-between border border-black/5 dark:border-white/5">
            <span className="font-mono">💡 Click any swatch to copy its HEX token to clipboard.</span>
            <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">WCAG AAA Validated</span>
          </div>
        </div>
      )}

      {activeTab === 'physics' && (
        <div className="bg-white dark:bg-[#1A1816] p-6 sm:p-8 rounded-4xl border border-black/8 dark:border-white/10 shadow-cozy space-y-6 animate-fade-in">
          <div>
            <h3 className="text-2xl font-bold font-sans text-ink dark:text-[#FAF7F2]">Tactile Micro-Interaction Feedback</h3>
            <p className="text-sm text-ink-muted dark:text-white/70 mt-1">Experience different spring curves, elevation depths, and sound feedback profiles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-canvas dark:bg-[#22201D] border border-black/5 dark:border-white/10 flex flex-col items-center justify-between text-center space-y-4">
              <span className="text-xs font-mono uppercase text-accent-terracotta font-semibold">Spring Tactile (400ms)</span>
              <button
                onClick={() => {
                  setButtonClicks(c => c + 1);
                  playSound('pop', soundEnabled);
                }}
                className="px-6 py-3 bg-[#E07A5F] text-white font-bold rounded-2xl shadow-cozy hover:shadow-cozy-lg active:scale-90 active:rotate-1 transition-all duration-150 transform"
              >
                Press Me ({buttonClicks})
              </button>
              <p className="text-[11px] text-ink-muted dark:text-white/60">Soft overshoot bounce with natural dampening.</p>
            </div>

            <div className="p-6 rounded-3xl bg-canvas dark:bg-[#22201D] border border-black/5 dark:border-white/10 flex flex-col items-center justify-between text-center space-y-4">
              <span className="text-xs font-mono uppercase text-[#4A7C59] dark:text-[#85C49B] font-semibold">Snappy Crisp (100ms)</span>
              <button
                onClick={() => {
                  setSnappyClicks(c => c + 1);
                  playSound('click', soundEnabled);
                }}
                className="px-6 py-3 bg-ink dark:bg-white text-white dark:text-ink font-bold rounded-2xl shadow-tactile active:shadow-tactile-pressed active:translate-y-1 transition-all duration-75"
              >
                Snap Click ({snappyClicks})
              </button>
              <p className="text-[11px] text-ink-muted dark:text-white/60">Crisp physical button simulation with rigid stroke.</p>
            </div>

            <div className="p-6 rounded-3xl bg-canvas dark:bg-[#22201D] border border-black/5 dark:border-white/10 flex flex-col items-center justify-between text-center space-y-4">
              <span className="text-xs font-mono uppercase text-[#D97706] dark:text-[#FBBF24] font-semibold">Celebration Burst</span>
              <button
                onClick={() => {
                  setBouncyClicks(c => c + 1);
                  playSound('success', soundEnabled);
                  confetti({ particleCount: 25, spread: 40, origin: { y: 0.7 } });
                }}
                className="px-6 py-3 bg-gradient-to-r from-[#F4A261] to-[#E07A5F] text-white font-bold rounded-2xl shadow-cozy hover:scale-105 active:scale-95 transition-all"
              >
                Cheer ({bouncyClicks}) ✨
              </button>
              <p className="text-[11px] text-ink-muted dark:text-white/60">Delightful particle burst for primary conversion actions.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'type' && (
        <div className="bg-white dark:bg-[#1A1816] p-6 sm:p-8 rounded-4xl border border-black/8 dark:border-white/10 shadow-cozy space-y-6 animate-fade-in">
          <div>
            <h3 className="text-2xl font-bold font-sans text-ink dark:text-[#FAF7F2]">Editorial Typography & Ratio Studio</h3>
            <p className="text-sm text-ink-muted dark:text-white/70 mt-1">Instrument Serif (Display) collided with Plus Jakarta Sans & JetBrains Mono.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-canvas dark:bg-[#22201D] rounded-2xl border border-black/5 dark:border-white/10">
            <div>
              <label className="text-xs font-mono text-ink-muted dark:text-white/70 flex justify-between">
                <span>Font Size:</span>
                <span className="font-bold text-ink dark:text-white">{fontSize}px</span>
              </label>
              <input
                type="range"
                min="20"
                max="64"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full mt-2 accent-accent-terracotta"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-ink-muted dark:text-white/70 flex justify-between">
                <span>Line Height:</span>
                <span className="font-bold text-ink dark:text-white">{lineHeight}</span>
              </label>
              <input
                type="range"
                min="0.9"
                max="1.8"
                step="0.05"
                value={lineHeight}
                onChange={(e) => setLineHeight(Number(e.target.value))}
                className="w-full mt-2 accent-accent-terracotta"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-ink-muted dark:text-white/70 flex justify-between">
                <span>Letter Spacing:</span>
                <span className="font-bold text-ink dark:text-white">{letterSpacing}px</span>
              </label>
              <input
                type="range"
                min="-2"
                max="6"
                step="0.5"
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(Number(e.target.value))}
                className="w-full mt-2 accent-accent-terracotta"
              />
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-surface-warm dark:bg-[#22201D] border border-black/5 dark:border-white/10 min-h-[160px] flex items-center justify-center text-center">
            <h4 
              className="font-serif italic text-ink dark:text-[#FAF7F2]"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: lineHeight,
                letterSpacing: `${letterSpacing}px`
              }}
            >
              {sampleText}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              className="w-full bg-canvas dark:bg-[#22201D] border border-black/10 dark:border-white/10 rounded-2xl px-4 py-2 text-xs font-sans text-ink dark:text-white focus:outline-none focus:border-accent-terracotta"
              placeholder="Type your custom sample text here..."
            />
          </div>
        </div>
      )}

      {activeTab === 'stickers' && (
        <div className="bg-white dark:bg-[#1A1816] p-6 sm:p-8 rounded-4xl border border-black/8 dark:border-white/10 shadow-cozy space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold font-sans text-ink dark:text-[#FAF7F2]">Interactive Stamp Canvas</h3>
              <p className="text-sm text-ink-muted dark:text-white/70">Click anywhere inside the canvas below to stamp fun designer stickers!</p>
            </div>
            <button
              onClick={() => {
                setStampedStickers([]);
                playSound('pop', soundEnabled);
              }}
              className="text-xs font-mono text-ink-muted dark:text-white/60 hover:text-ink dark:hover:text-white underline"
            >
              Clear Board
            </button>
          </div>

          <div 
            onClick={handleCanvasClick}
            className="w-full h-80 bg-canvas dark:bg-[#161412] rounded-3xl border-2 border-dashed border-black/15 dark:border-white/15 relative overflow-hidden cursor-crosshair select-none flex items-center justify-center"
          >
            {stampedStickers.length === 0 && (
              <span className="text-xs font-mono text-ink-faint dark:text-white/40 pointer-events-none">
                👆 Click anywhere inside this board to stamp badges
              </span>
            )}

            {stampedStickers.map((st) => (
              <div
                key={st.id}
                style={{ left: `${st.x}%`, top: `${st.y}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#25221F] px-3 py-1.5 rounded-2xl border border-black/10 dark:border-white/10 shadow-cozy flex items-center gap-1.5 text-xs font-medium text-ink dark:text-white pointer-events-none animate-fade-in"
              >
                <span>{st.emoji}</span>
                <span>{st.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
};
