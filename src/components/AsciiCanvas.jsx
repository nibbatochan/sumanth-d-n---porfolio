import React, { useEffect, useRef, useState } from 'react';
import { Target, Crosshair, Sparkle } from '@phosphor-icons/react';
import { RealisticAsciiDove } from '../utils/asciiRenderer';
import { playSound } from '../utils/sound';

export const AsciiCanvas = ({ soundEnabled, isDarkMode }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const doveRef = useRef(null);
  const animFrameRef = useRef(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [crosshairPos, setCrosshairPos] = useState({ x: 0, y: 0 });
  const [activePaletteIndex, setActivePaletteIndex] = useState(0);

  const darkPalettes = [
    { name: 'Sun Amber', glow: '#F59E0B', text: '#FBBF24', highlight: '#FEF08A' },
    { name: 'Pure White Glow', glow: '#FFFFFF', text: '#E4E4E7', highlight: '#FAFAFA' },
    { name: 'Terracotta Flame', glow: '#EA580C', text: '#F97316', highlight: '#FDBA74' },
  ];

  const lightPalettes = [
    { name: 'Charcoal Ink', glow: '#18181B', text: '#27272A', highlight: '#52525B' },
    { name: 'Terracotta Flame', glow: '#C2410C', text: '#EA580C', highlight: '#9A3412' },
  ];

  const currentPalettes = isDarkMode ? darkPalettes : lightPalettes;
  const currentPalette = currentPalettes[activePaletteIndex % currentPalettes.length];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dove = new RealisticAsciiDove(118, 42);
    doveRef.current = dove;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth || 400);
    let height = (canvas.height = canvas.offsetHeight || 400);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      try {
        ctx.clearRect(0, 0, width, height);

        const frameText = dove.nextFrame();
        const lines = frameText.split('\n');
        const rows = lines.length;
        const cols = lines[0] ? lines[0].length : 118;

        const charW = width / cols;
        const charH = height / rows;

        ctx.font = `${Math.max(7, Math.floor(charH * 0.95))}px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let y = 0; y < rows; y++) {
          const line = lines[y];
          if (!line) continue;
          for (let x = 0; x < cols; x++) {
            const char = line[x];
            if (char && char !== ' ') {
              const px = x * charW + charW / 2;
              const py = y * charH + charH / 2;

              if (char === '@' || char === '%' || char === '#') {
                ctx.fillStyle = currentPalette.highlight;
                ctx.shadowColor = currentPalette.glow;
                ctx.shadowBlur = 6;
              } else if (char === '*' || char === '+' || char === '=' || char === '>') {
                ctx.fillStyle = currentPalette.text;
                ctx.shadowBlur = 0;
              } else {
                ctx.fillStyle = isDarkMode ? 'rgba(212, 212, 216, 0.45)' : 'rgba(82, 82, 91, 0.45)';
                ctx.shadowBlur = 0;
              }

              ctx.fillText(char, px, py);
            }
          }
        }
        ctx.shadowBlur = 0;
      } catch (err) {
        console.error("Canvas render error:", err);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDarkMode, activePaletteIndex]);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !doveRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;

    setCrosshairPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    doveRef.current.setMouse(nx, ny);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current || !doveRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const nx = (touch.clientX - rect.left) / rect.width;
    const ny = (touch.clientY - rect.top) / rect.height;

    setCrosshairPos({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });

    doveRef.current.setMouse(nx, ny);
  };

  const handleShoot = (e) => {
    if (!containerRef.current || !doveRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : rect.left + rect.width / 2);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : rect.top + rect.height / 2);

    const nx = (clientX - rect.left) / rect.width;
    const ny = (clientY - rect.top) / rect.height;

    playSound('whoosh', soundEnabled);
    doveRef.current.shootProjectile(nx, ny);
  };

  const handleCyclePalette = (e) => {
    e.stopPropagation();
    setActivePaletteIndex((prev) => (prev + 1) % currentPalettes.length);
    playSound('pop', soundEnabled);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (doveRef.current) doveRef.current.setMouse(0.5, 0.5);
      }}
      onClick={handleShoot}
      onTouchStart={handleShoot}
      className="relative w-full aspect-square max-w-[320px] sm:max-w-[420px] md:max-w-[480px] mx-auto rounded-3xl overflow-hidden cursor-crosshair group select-none shadow-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-950/40 dark:bg-zinc-950/80 backdrop-blur-sm"
    >
      {/* 3D ASCII Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />

      {/* Crosshair Sight Laser Reticle */}
      {isHovered && (
        <div
          className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-75 hidden sm:block"
          style={{ left: crosshairPos.x, top: crosshairPos.y }}
        >
          <div className="relative flex items-center justify-center">
            <Crosshair size={28} weight="thin" className="text-orange-500 animate-spin-slow opacity-80" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-red-500 shadow-sm animate-ping" />
          </div>
        </div>
      )}

      {/* Top Controls Overlay */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none text-[10px] sm:text-xs font-mono">
        <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-zinc-300 flex items-center gap-1.5 shadow-sm">
          <Target size={12} weight="bold" className="text-orange-400 animate-pulse" />
          <span>3D Flight Mode</span>
        </div>

        <button
          onClick={handleCyclePalette}
          className="pointer-events-auto px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/10 text-zinc-200 hover:text-white flex items-center gap-1.5 transition-all tactile-btn shadow-sm"
          title="Cycle ASCII color theme"
        >
          <Sparkle size={12} weight="fill" className="text-amber-400" />
          <span>{currentPalette.name}</span>
        </button>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none text-[10px] font-mono text-zinc-400/80 px-4">
        <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
          Click or Tap to Shoot Projectile
        </span>
      </div>
    </div>
  );
};
