import React, { useState, useEffect, useRef } from 'react';
import { RealisticAsciiDove } from '../utils/asciiRenderer';
import { playSound } from '../utils/sound';
import { ArrowsClockwise, Crosshair } from '@phosphor-icons/react';

export const AsciiCanvas = ({ soundEnabled = true, isDarkMode = true }) => {
  const [asciiOutput, setAsciiOutput] = useState('');
  const [colorIndex, setColorIndex] = useState(0);
  const [reticlePos, setReticlePos] = useState({ x: -100, y: -100 });
  const [isAiming, setIsAiming] = useState(false);
  const [activeProjectiles, setActiveProjectiles] = useState([]);

  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const animRef = useRef(null);

  // Palettes tuned for Light & Dark mode
  const lightColorThemes = [
    { name: 'Charcoal Ink', textClass: 'text-zinc-900', dotClass: 'bg-zinc-900' },
    { name: 'Terracotta Flame', textClass: 'text-orange-600', dotClass: 'bg-orange-600' },
    { name: 'Sun Amber', textClass: 'text-amber-700', dotClass: 'bg-amber-600' },
    { name: 'Emerald Mint', textClass: 'text-emerald-700', dotClass: 'bg-emerald-600' },
    { name: 'Sky Cyan', textClass: 'text-sky-600', dotClass: 'bg-sky-600' }
  ];

  const darkColorThemes = [
    { name: 'Sun Amber (Glow)', textClass: 'text-amber-400', dotClass: 'bg-amber-400' },
    { name: 'Pure White (Glow)', textClass: 'text-white', dotClass: 'bg-white' },
    { name: 'Terracotta Sun', textClass: 'text-orange-400', dotClass: 'bg-orange-400' },
    { name: 'Mint Emerald', textClass: 'text-emerald-400', dotClass: 'bg-emerald-400' },
    { name: 'Sky Cyan (Glow)', textClass: 'text-sky-400', dotClass: 'bg-sky-400' }
  ];

  const activePalettes = isDarkMode ? darkColorThemes : lightColorThemes;
  const currentTheme = activePalettes[colorIndex % activePalettes.length];

  useEffect(() => {
    // 118 columns x 42 rows ultra-large dove
    const engine = new RealisticAsciiDove(118, 42);
    engineRef.current = engine;

    // Check motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const intervalMs = prefersReducedMotion ? 400 : 35;

    const updateFrame = () => {
      try {
        setAsciiOutput(engine.nextFrame());
      } catch (e) {
        console.error("Frame error:", e);
      }
      animRef.current = setTimeout(updateFrame, intervalMs);
    };

    updateFrame();

    return () => {
      if (animRef.current) clearTimeout(animRef.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !engineRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    engineRef.current.setMouse(x, y);
    setReticlePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsAiming(true);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current || !engineRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) / rect.width;
    const y = (touch.clientY - rect.top) / rect.height;

    engineRef.current.setMouse(x, y);
    setReticlePos({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
    setIsAiming(true);
  };

  const handleShoot = (e) => {
    if (!containerRef.current || !engineRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : rect.left + rect.width / 2);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : rect.top + rect.height / 2);

    const startX = clientX - rect.left;
    const startY = clientY - rect.top;
    const normX = startX / rect.width;
    const normY = startY / rect.height;

    // Trigger internal 3D math & evasive dodge
    engineRef.current.shootProjectile(normX, normY);
    playSound('whoosh', soundEnabled);

    // Spawn distinct vivid colored laser/bullet tracer
    const projId = Date.now() + Math.random();
    const targetEndX = startX + (Math.random() > 0.5 ? 180 : -180);
    const targetEndY = startY - 120 + (Math.random() * 80 - 40);

    const newProj = {
      id: projId,
      startX,
      startY,
      targetEndX,
      targetEndY,
      progress: 0
    };

    setActiveProjectiles((prev) => [...prev, newProj]);

    // Animate the colored bullet streak
    const startTime = performance.now();
    const duration = 280; // ms

    const animateBullet = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);

      setActiveProjectiles((prev) =>
        prev.map((p) => (p.id === projId ? { ...p, progress: t } : p))
      );

      if (t < 1) {
        requestAnimationFrame(animateBullet);
      } else {
        setActiveProjectiles((prev) => prev.filter((p) => p.id !== projId));
      }
    };

    requestAnimationFrame(animateBullet);
  };

  const handleShuffleColor = (e) => {
    e.stopPropagation();
    setColorIndex((prev) => (prev + 1) % activePalettes.length);
    playSound('pop', soundEnabled);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={handleShoot}
      onTouchStart={handleShoot}
      onMouseEnter={() => setIsAiming(true)}
      onMouseLeave={() => {
        setIsAiming(false);
        if (engineRef.current) engineRef.current.setMouse(0.5, 0.5);
      }}
      aria-label="Interactive 3D Flying Dove Canvas"
      title="Aim with crosshair gun • Click to shoot colored laser projectile (dove dodges!)"
      style={{ cursor: 'crosshair' }}
      className="w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[460px] relative select-none flex flex-col items-center justify-center group overflow-visible"
    >
      {/* 1. Distinct Vivid Colored Projectile Tracers */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible" aria-hidden="true">
        {activeProjectiles.map((p) => {
          const currentX = p.startX + (p.targetEndX - p.startX) * p.progress;
          const currentY = p.startY + (p.targetEndY - p.startY) * p.progress;
          const trailLength = 45;
          const angle = Math.atan2(p.targetEndY - p.startY, p.targetEndX - p.startX);
          const tailX = currentX - Math.cos(angle) * trailLength;
          const tailY = currentY - Math.sin(angle) * trailLength;

          return (
            <g key={p.id}>
              {/* Fiery Outer Glow */}
              <line
                x1={tailX}
                y1={tailY}
                x2={currentX}
                y2={currentY}
                stroke="#FF3B30"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.8"
                filter="drop-shadow(0 0 8px #FF9500)"
              />
              {/* Brilliant Inner Core */}
              <line
                x1={tailX + Math.cos(angle) * 10}
                y1={tailY + Math.sin(angle) * 10}
                x2={currentX}
                y2={currentY}
                stroke="#FFE600"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="1"
              />
              {/* Bullet Tip Energy Spark */}
              <circle
                cx={currentX}
                cy={currentY}
                r="4"
                fill="#FFFFFF"
                filter="drop-shadow(0 0 10px #FF5500)"
              />
            </g>
          );
        })}
      </svg>

      {/* 2. Gun Reticle Target Sight Overlay */}
      {isAiming && (
        <div 
          style={{ 
            left: `${reticlePos.x}px`, 
            top: `${reticlePos.y}px`, 
            transform: 'translate(-50%, -50%)' 
          }}
          className="absolute pointer-events-none z-40 flex items-center justify-center transition-opacity duration-150 hidden sm:flex"
          aria-hidden="true"
        >
          <div className="relative flex items-center justify-center">
            <Crosshair size={32} weight="bold" className="text-orange-500 drop-shadow-md opacity-90 animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 absolute shadow-glow" />
          </div>
        </div>
      )}

      {/* 3. Floating Minimal Palette Shuffle Button */}
      <div className="absolute top-0 right-0 z-20 flex items-center gap-2">
        <button
          onClick={handleShuffleColor}
          aria-label={`Shuffle dove color palette. Current: ${currentTheme.name}`}
          className="px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-zinc-900/95 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 shadow-sm text-xs font-mono font-medium flex items-center gap-2 tactile-btn backdrop-blur-md transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
          title="Shuffle ink color"
        >
          <span className={`w-2.5 h-2.5 rounded-full ${currentTheme.dotClass} shadow-xs`} />
          <span className="text-[11px] text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white font-semibold">
            {currentTheme.name}
          </span>
          <ArrowsClockwise size={13} weight="bold" className="transition-transform group-hover:rotate-180 duration-500 text-zinc-400 dark:text-zinc-500" />
        </button>
      </div>

      {/* 4. Ultra-Large High-Definition 3D Flying Dove Canvas */}
      <div className="w-full h-full flex items-center justify-center overflow-visible relative z-10 my-auto">
        <pre 
          className={`font-mono text-[7px] xs:text-[7.8px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] leading-[0.98] tracking-tighter whitespace-pre text-center select-none transition-colors duration-300 ${currentTheme.textClass} drop-shadow-sm`}
          style={{ margin: 0 }}
        >
          {asciiOutput}
        </pre>
      </div>

    </div>
  );
};
