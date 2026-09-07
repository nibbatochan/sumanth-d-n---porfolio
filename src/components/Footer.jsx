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

export const Footer = ({ soundEnabled, onOpenContact, className = "" }) => {
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

    const render = () => {
      time += 0.022;

      if (targetMouseX > -500) {
        if (mouseX < -500) {
          mouseX = targetMouseX;
          mouseY = targetMouseY;
        } else {
          mouseX += (targetMouseX - mouseX) * 0.10;
          mouseY += (targetMouseY - mouseY) * 0.10;
        }
      } else {
        mouseX += (-1000 - mouseX) * 0.05;
        mouseY += (-1000 - mouseY) * 0.05;
      }

      // 1. Base Fill: #09090B
      ctx.fillStyle = '#09090B';
      ctx.fillRect(0, 0, width, height);

      // 2. Upward Pulsating Ambient Orange Glow
      const bottomPulse = Math.sin(time * 2.2) * 0.12 + 0.88;

      const bottomGrad = ctx.createLinearGradient(0, height, 0, 0);
      bottomGrad.addColorStop(0, `rgba(234, 88, 12, ${0.52 * bottomPulse})`);
      bottomGrad.addColorStop(0.35, `rgba(245, 158, 11, ${0.32 * bottomPulse})`);
      bottomGrad.addColorStop(0.70, 'rgba(180, 83, 9, 0.10)');
      bottomGrad.addColorStop(1, 'rgba(9, 9, 11, 0)');
      ctx.fillStyle = bottomGrad;
      ctx.fillRect(0, 0, width, height);

      // Ambient upward pulsing glow orbs
      const orbCount = 3;
      for (let i = 0; i < orbCount; i++) {
        const orbX = (width * 0.2) + (i * (width * 0.3)) + Math.sin(time + i) * 25;
        const orbY = height * 0.70 + Math.sin(time * 1.8 + i) * 20;
        const orbGrad = ctx.createRadialGradient(orbX, orbY, 25, orbX, orbY, width * 0.38);
        orbGrad.addColorStop(0, 'rgba(251, 146, 60, 0.28)');
        orbGrad.addColorStop(0.6, 'rgba(234, 88, 12, 0.10)');
        orbGrad.addColorStop(1, 'rgba(9, 9, 11, 0)');
        ctx.fillStyle = orbGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. VIVID CURSOR HOVER FLARE SPOTLIGHT
      if (mouseX > -500) {
        const mouseGlow = ctx.createRadialGradient(mouseX, mouseY, 15, mouseX, mouseY, 320);
        mouseGlow.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
        mouseGlow.addColorStop(0.4, 'rgba(249, 115, 22, 0.25)');
        mouseGlow.addColorStop(0.8, 'rgba(234, 88, 12, 0.08)');
        mouseGlow.addColorStop(1, 'rgba(9, 9, 11, 0)');
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 4. ASCII Matrix Particles
      const cellSize = 15;
      const cols = Math.floor(width / cellSize);
      const rows = Math.floor(height / cellSize);

      ctx.font = `${cellSize - 3}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * cellSize + cellSize / 2;
          const py = y * cellSize + cellSize / 2;

          const normYFromBottom = (height - py) / height;

          const wavePhase = Math.sin(time * 2.8 - normYFromBottom * 9.5 + Math.cos(px * 0.015) * 1.5);
          const pulseIntensity = (wavePhase * 0.5 + 0.5);
          const verticalDensity = Math.pow(1 - normYFromBottom, 1.3);

          let mouseSurge = 0;
          let distToMouse = 9999;
          if (mouseX > -500) {
            distToMouse = Math.hypot(px - mouseX, py - mouseY);
            if (distToMouse < 260) {
              mouseSurge = Math.pow(1 - distToMouse / 260, 1.6) * 0.65;
            }
          }

          const totalIntensity = (verticalDensity * 0.62) + (pulseIntensity * 0.38 * verticalDensity) + mouseSurge;

          if (totalIntensity > 0.14) {
            const charIdx = Math.floor(Math.min(1, Math.max(0, (totalIntensity - 0.14) * 1.55)) * (chars.length - 1));
            const char = chars[charIdx];

            if (distToMouse < 140) {
              ctx.fillStyle = 'rgba(255, 240, 138, 0.98)';
            } else if (distToMouse < 220 || totalIntensity > 0.60) {
              ctx.fillStyle = 'rgba(251, 191, 36, 0.95)';
            } else if (totalIntensity > 0.36) {
              ctx.fillStyle = 'rgba(249, 115, 22, 0.85)';
            } else {
              ctx.fillStyle = 'rgba(194, 65, 12, 0.45)';
            }

            ctx.globalAlpha = Math.min(0.98, (totalIntensity - 0.12) * 1.65);
            ctx.fillText(char, px, py);
          }
        }
      }
      ctx.globalAlpha = 1.0;

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const scrollToTop = () => {
    playSound('pop', soundEnabled);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const parentContainer = canvasRef.current?.closest('.overflow-y-auto');
    if (parentContainer) {
      parentContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className={`relative text-white overflow-hidden select-none min-h-[440px] sm:min-h-[540px] flex flex-col justify-end z-10 w-full ${className || '-mt-6 sm:-mt-[168px] md:-mt-[216px]'}`}>
      
      {/* Full-Size Upward Pulsating Orange Canvas Background */}
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Top Gradient Fade to guarantee seamless transition from #09090B */}
      <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-b from-[#09090B] to-transparent z-5 pointer-events-none" />

      {/* Bottom Footer Bar - Fully Responsive Clean Stacking on Mobile */}
      <div className="relative z-20 max-w-[830px] mx-auto w-full py-8 sm:py-12 px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-xs text-zinc-300">
        
        {/* Brand & Bangalore Time Indicator */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 text-center sm:text-left">
          <span className="font-bold text-white font-sans text-sm tracking-tight">© {new Date().getFullYear()} {designerProfile.name}</span>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <span className="font-mono bg-zinc-950/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-800 text-zinc-200 font-medium flex items-center gap-1.5 shadow-sm text-[11px] sm:text-xs">
            <GlobeHemisphereWest size={13} weight="duotone" className="text-orange-400 shrink-0" />
            <span>Bangalore, IN</span>
            <Clock size={12} weight="bold" className="text-zinc-400 ml-1 shrink-0" />
            <span>{bengaluruTime || '1:30 PM (IST)'}</span>
          </span>
        </div>

        {/* Social Links - Clean wrap without clipping */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 font-semibold text-xs sm:text-sm">
          <a 
            href={designerProfile.socials.behance} 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-orange-400 transition-colors flex items-center gap-1 text-zinc-200"
          >
            <span>Behance</span>
          </a>
          <a 
            href={designerProfile.socials.linkedin} 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-orange-400 transition-colors flex items-center gap-1 text-zinc-200"
          >
            <LinkedinLogo size={15} weight="bold" />
            <span>LinkedIn</span>
          </a>
          <a 
            href={`mailto:${designerProfile.email}`}
            className="hover:text-orange-400 transition-colors flex items-center gap-1 text-zinc-200 max-w-[200px] sm:max-w-none truncate"
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
          className="p-2.5 px-3.5 rounded-full bg-zinc-950/85 hover:bg-zinc-800 border border-zinc-800 shadow-sm text-zinc-200 hover:text-white hover:scale-105 transition-all tactile-btn flex items-center gap-1.5 backdrop-blur-md"
        >
          <ArrowUp size={14} weight="bold" />
          <span className="text-[11px] font-bold">Top</span>
        </button>

      </div>
    </footer>
  );
};
