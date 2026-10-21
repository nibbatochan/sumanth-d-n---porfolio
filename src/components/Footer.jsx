import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUp, 
  Clock, 
  GlobeHemisphereWest, 
  LinkedinLogo, 
  EnvelopeSimple 
} from '@phosphor-icons/react';
import { designerProfile } from '../data/portfolioData';
import { playSound } from '../utils/sound';

export const Footer = ({ soundEnabled, onOpenContact, className = "", paused = false, fadeFrom = "from-white" }) => {
  const [bengaluruTime, setBengaluruTime] = useState('');
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setBengaluruTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Upward Pulsating Gradient ASCII Shader with Vivid Mouse Flare Hover Interaction
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let time = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handleMouseMove = (e) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      if (relativeY > -100 && relativeY < height + 100 && relativeX > 0 && relativeX < width) {
        targetMouseX = relativeX;
        targetMouseY = relativeY;
      } else {
        targetMouseX = -1000;
        targetMouseY = -1000;
      }
    };

    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const chars = " ·~+x*#%@X8S0B$";

    // Skip the heavy ASCII pass while the footer is off screen or covered by a case study.
    let onScreen = true;
    const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }) : null;
    if (io) io.observe(canvas);

    const render = () => {
      if (paused || !onScreen || document.hidden) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }
      time += 0.014;

      if (targetMouseX > -500) {
        if (mouseX < -500) {
          mouseX = targetMouseX;
          mouseY = targetMouseY;
        } else {
          mouseX += (targetMouseX - mouseX) * 0.08;
          mouseY += (targetMouseY - mouseY) * 0.08;
        }
      } else {
        mouseX += (-1000 - mouseX) * 0.04;
        mouseY += (-1000 - mouseY) * 0.04;
      }

      const dark = document.documentElement.classList.contains('dark');
      ctx.clearRect(0, 0, width, height);
      if (dark) {
        ctx.fillStyle = '#09090B';
        ctx.fillRect(0, 0, width, height);
      }

      // Slow, shallow breathing glow. Many soft stops, so there is no visible edge.
      const breathe = Math.sin(time * 1.3) * 0.06 + 0.94;
      const glow = ctx.createLinearGradient(0, height, 0, 0);
      const peak = (dark ? 0.5 : 0.36) * breathe;
      // Base glow shifts ember -> orange -> amber -> peach as it rises, drifting slowly.
      const drift = 0.5 + 0.5 * Math.sin(time * 0.35);
      const rgb = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(', ');
      [[0, 1, [194, 65, 12]], [0.15, 0.78, [234, 88, 12]], [0.3, 0.56, [249, 115, 22]], [0.5, 0.34, [251, 146, 60]], [0.7, 0.16, [252, 211, 77]], [0.85, 0.06, [254, 215, 170]], [1, 0, [255, 237, 213]]].forEach(([o, k, c]) => {
        glow.addColorStop(o, `rgba(${rgb(c, [251, 191, 36], drift * 0.25)}, ${(peak * k).toFixed(3)})`);
      });
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      if (mouseX > -500) {
        const flare = ctx.createRadialGradient(mouseX, mouseY, 10, mouseX, mouseY, 320);
        const fa = dark ? 0.36 : 0.22;
        [[0, 1], [0.3, 0.62], [0.6, 0.26], [0.85, 0.07], [1, 0]].forEach(([o, k]) => {
          flare.addColorStop(o, `rgba(249, 115, 22, ${(fa * k).toFixed(3)})`);
        });
        ctx.fillStyle = flare;
        ctx.fillRect(0, 0, width, height);
      }

      // ASCII field: every step is a smooth ramp, so characters fade in and out instead of snapping.
      const smooth = (e0, e1, x) => {
        const k = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
        return k * k * (3 - 2 * k);
      };
      // ember -> orange -> amber -> peach -> near white (dark); deep rust -> orange -> amber -> peach (light)
      const palette = dark
        ? [[170, 55, 10], [234, 88, 12], [251, 146, 60], [252, 211, 77], [254, 215, 170], [255, 247, 237]]
        : [[124, 45, 18], [194, 65, 12], [234, 88, 12], [249, 140, 40], [245, 170, 70], [251, 191, 120]];
      const cellSize = 15;
      const cols = Math.floor(width / cellSize);
      const rows = Math.floor(height / cellSize);
      ctx.font = `${cellSize - 3}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let y = 0; y < rows; y++) {
        const py = y * cellSize + cellSize / 2;
        const fromBottom = (height - py) / height;
        const density = Math.pow(1 - fromBottom, 1.3);
        for (let x = 0; x < cols; x++) {
          const px = x * cellSize + cellSize / 2;
          const waveA = 0.5 + 0.5 * Math.sin(time * 1.5 - fromBottom * 7 + Math.cos(px * 0.012) * 1.2);
          const waveB = 0.5 + 0.5 * Math.sin(time * 0.65 + px * 0.006 - fromBottom * 3);
          const pulse = waveA * 0.6 + waveB * 0.4;

          let near = 0;
          if (mouseX > -500) {
            const d = Math.hypot(px - mouseX, py - mouseY);
            near = d < 260 ? Math.pow(1 - d / 260, 2) : 0;
          }

          const s = smooth(0.1, 0.9, density * 0.62 + pulse * 0.38 * density + near * 0.5);
          if (s < 0.02) continue;

          const char = chars[Math.round(s * (chars.length - 1))];
          const heat = Math.min(1, s + near * 0.6);
          // A slow hue wave across the field picks where on the palette each cell sits.
          const hue = 0.5 + 0.5 * Math.sin(time * 0.45 + px * 0.011 - fromBottom * 4.5);
          const t = Math.min(1, heat * 0.6 + hue * 0.4) * (palette.length - 1);
          const lo = Math.floor(t);
          const hi = Math.min(palette.length - 1, lo + 1);
          const k = t - lo;
          const a = palette[lo];
          const b = palette[hi];
          ctx.fillStyle = `rgba(${(a[0] + (b[0] - a[0]) * k) | 0}, ${(a[1] + (b[1] - a[1]) * k) | 0}, ${(a[2] + (b[2] - a[2]) * k) | 0}, ${(s * 0.92).toFixed(3)})`;
          ctx.fillText(char, px, py);
        }
      }
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (io) io.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [paused]);

  const scrollToTop = () => {
    playSound('pop', soundEnabled);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const parentContainer = canvasRef.current?.closest('.overflow-y-auto');
    if (parentContainer) {
      parentContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className={`relative text-zinc-900 dark:text-white overflow-hidden select-none min-h-[440px] sm:min-h-[540px] flex flex-col justify-end z-10 w-full ${className || '-mt-6 sm:-mt-[168px] md:-mt-[216px]'}`}>
      
      {/* Full-Size Upward Pulsating Orange Canvas Background */}
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Top Gradient Fade to guarantee seamless transition from #09090B */}
      <div className={`absolute top-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-b ${fadeFrom} dark:from-[#09090B] to-transparent z-5 pointer-events-none`} />

      {/* Bottom Footer Bar - Fully Responsive Clean Stacking on Mobile */}
      <div className="relative z-20 max-w-6xl mx-auto w-full py-8 sm:py-12 px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-xs text-zinc-700 dark:text-zinc-300">
        
        {/* Brand & Bangalore Time Indicator */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 text-center sm:text-left">
          <span className="font-bold text-zinc-900 dark:text-white font-sans text-sm tracking-tight">© {new Date().getFullYear()} {designerProfile.name}</span>
          <span className="hidden sm:inline text-zinc-400 dark:text-zinc-600">•</span>
          <span className="font-mono bg-white/80 dark:bg-zinc-950/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 font-medium flex items-center gap-1.5 shadow-sm text-[11px] sm:text-xs">
            <GlobeHemisphereWest size={13} weight="duotone" className="text-orange-400 shrink-0" />
            <span>Bangalore, IN</span>
            <Clock size={12} weight="bold" className="text-zinc-500 dark:text-zinc-400 ml-1 shrink-0" />
            <span>{bengaluruTime || '1:30 PM (IST)'}</span>
          </span>
        </div>

        {/* Social Links - Clean wrap without clipping */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 font-semibold text-xs sm:text-sm">
          <a 
            href={designerProfile.socials.behance} 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1 text-zinc-800 dark:text-zinc-200"
          >
            <span>Behance</span>
          </a>
          <a 
            href={designerProfile.socials.linkedin} 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1 text-zinc-800 dark:text-zinc-200"
          >
            <LinkedinLogo size={15} weight="bold" />
            <span>LinkedIn</span>
          </a>
          <a 
            href={`mailto:${designerProfile.email}`}
            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1 text-zinc-800 dark:text-zinc-200 max-w-[200px] sm:max-w-none truncate"
            title={designerProfile.email}
          >
            <EnvelopeSimple size={15} weight="bold" className="shrink-0" />
            <span className="truncate">{designerProfile.email}</span>
          </a>
        </div>

        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="p-2.5 px-3.5 rounded-full bg-white/80 dark:bg-zinc-950/85 hover:bg-white dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-800 shadow-sm text-zinc-800 dark:text-zinc-200 dark:hover:text-white hover:scale-105 transition-all tactile-btn flex items-center gap-1.5 backdrop-blur-md"
        >
          <ArrowUp size={14} weight="bold" />
          <span className="text-[11px] font-bold">Top</span>
        </button>

      </div>
    </footer>
  );
};
