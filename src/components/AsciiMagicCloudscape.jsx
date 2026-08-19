import React, { useEffect, useRef, useState } from 'react';
import { 
  Sparkle, 
  ArrowsClockwise, 
  Eye, 
  Lightning, 
  SlidersHorizontal 
} from '@phosphor-icons/react';
import { playSound } from '../utils/sound';

export const AsciiMagicCloudscape = ({ soundEnabled = true }) => {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const [themeIndex, setThemeIndex] = useState(0);
  const [asciiDensity, setAsciiDensity] = useState('high');

  // Themes matching ascii-magic reference: Cyan Light Rays + Golden Clouds
  const themes = [
    {
      name: 'Twilight Rays & Gold (Reference)',
      bgTop: '#050B14',
      bgBottom: '#0D1B2A',
      rayColor: 'rgba(56, 189, 248, 0.45)',
      cloudColor: 'rgba(254, 243, 199, 0.85)',
      cloudShadow: 'rgba(30, 41, 59, 0.9)',
      asciiTextColor: 'rgba(224, 242, 254, 0.85)',
      rayTextColor: 'rgba(56, 189, 248, 0.95)',
    },
    {
      name: 'Sunset Ember & Obsidian',
      bgTop: '#12070A',
      bgBottom: '#1F0D11',
      rayColor: 'rgba(251, 146, 60, 0.45)',
      cloudColor: 'rgba(254, 215, 170, 0.85)',
      cloudShadow: 'rgba(67, 20, 28, 0.9)',
      asciiTextColor: 'rgba(255, 237, 213, 0.85)',
      rayTextColor: 'rgba(249, 115, 22, 0.95)',
    },
    {
      name: 'Emerald Aurora',
      bgTop: '#04110B',
      bgBottom: '#082317',
      rayColor: 'rgba(52, 211, 153, 0.45)',
      cloudColor: 'rgba(209, 250, 229, 0.85)',
      cloudShadow: 'rgba(6, 44, 29, 0.9)',
      asciiTextColor: 'rgba(236, 253, 245, 0.85)',
      rayTextColor: 'rgba(16, 185, 129, 0.95)',
    }
  ];

  const currentTheme = themes[themeIndex % themes.length];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let time = 0;
    let mouseX = width * 0.7;
    let mouseY = height * 0.4;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);

    const chars = " .·:=+*#%@X8S0B$";

    const render = () => {
      time += 0.018;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // 1. Sky Gradient Background
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, currentTheme.bgTop);
      skyGrad.addColorStop(1, currentTheme.bgBottom);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Volumetric Light Shafts (God Rays from horizon pointing up-right)
      const rayCount = 7;
      ctx.save();
      for (let r = 0; r < rayCount; r++) {
        const rayAngle = -0.38 + (r / rayCount) * 0.42 + Math.sin(time * 0.5 + r) * 0.04;
        const rayX = width * 0.2 + (r * (width * 0.12));
        const rayGrad = ctx.createLinearGradient(rayX, height, rayX + Math.cos(rayAngle) * width * 0.8, height - Math.sin(0.6) * height);
        rayGrad.addColorStop(0, 'rgba(0,0,0,0)');
        rayGrad.addColorStop(0.4, currentTheme.rayColor);
        rayGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(rayX - 30, height);
        ctx.lineTo(rayX + 30, height);
        ctx.lineTo(rayX + width * 0.75 + (r * 40), 0);
        ctx.lineTo(rayX + width * 0.65 + (r * 40), 0);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // 3. Volumetric Billowing Clouds (Left and Right Cloud Banks)
      const drawCloudBank = (startX, startY, scale, puffCount, isRightSide) => {
        for (let p = 0; p < puffCount; p++) {
          const pt = p / puffCount;
          const puffX = startX + (isRightSide ? (p * 45) : -(p * 40)) + Math.sin(time + p) * 12;
          const puffY = startY - Math.sin(pt * Math.PI) * (scale * 0.6) + Math.cos(time * 0.8 + p) * 8;
          const puffRadius = (scale * 0.45) + Math.sin(p * 1.5 + time) * 18;

          const cloudGrad = ctx.createRadialGradient(puffX, puffY, puffRadius * 0.1, puffX, puffY, puffRadius);
          cloudGrad.addColorStop(0, currentTheme.cloudColor);
          cloudGrad.addColorStop(0.7, currentTheme.cloudShadow);
          cloudGrad.addColorStop(1, 'rgba(0,0,0,0)');

          ctx.fillStyle = cloudGrad;
          ctx.beginPath();
          ctx.arc(puffX, puffY, puffRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      // Left Cloud Bank
      drawCloudBank(width * 0.15, height * 0.72, 140, 6, false);
      // Right Mountain Cloud Bank (like the reference)
      drawCloudBank(width * 0.82, height * 0.55, 190, 8, true);
      // Horizon Ambient Cloud Puffs
      drawCloudBank(width * 0.45, height * 0.85, 110, 5, true);

      // 4. Matrix ASCII Particle Rasterization Overlay
      const cellSize = asciiDensity === 'high' ? 14 : asciiDensity === 'medium' ? 18 : 24;
      const cols = Math.floor(width / cellSize);
      const rows = Math.floor(height / cellSize);

      ctx.font = `${cellSize - 3}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * cellSize + cellSize / 2;
          const py = y * cellSize + cellSize / 2;

          const distToMouse = Math.hypot(px - mouseX, py - mouseY);
          const mouseInfluence = Math.max(0, 1 - distToMouse / 280) * 0.4;

          const n1 = Math.sin(px * 0.008 + time) * Math.cos(py * 0.008 - time);
          const n2 = Math.sin((px + py) * 0.005 + time * 1.2);
          const cloudThreshold = (py / height) * 0.75 + n1 * 0.25 + n2 * 0.15 + mouseInfluence;

          if (cloudThreshold > 0.42) {
            const charIndex = Math.floor(Math.min(1, Math.max(0, (cloudThreshold - 0.42) * 1.8)) * (chars.length - 1));
            const char = chars[charIndex];

            const inRayField = Math.abs((px / width) - ((height - py) / height) * 0.7 - 0.2) < 0.22;
            ctx.fillStyle = inRayField ? currentTheme.rayTextColor : currentTheme.asciiTextColor;
            ctx.globalAlpha = Math.min(0.95, (cloudThreshold - 0.38) * 1.5);
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
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [currentTheme, asciiDensity]);

  const handleShuffleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
    playSound('pop', soundEnabled);
  };

  return (
    <div className="w-full my-12 px-4 sm:px-8 max-w-6xl mx-auto">
      <div className="bg-zinc-950 rounded-4xl border border-zinc-800 shadow-2xl overflow-hidden relative group">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-6 bg-zinc-900/90 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-20 backdrop-blur-md">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-orange-400 font-bold mb-1">
              <Sparkle size={14} weight="fill" />
              <span>Cinematic ASCII Video Shader</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-sans text-white">
              Volumetric Clouds & Crepuscular Rays
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Real-time ray-marched atmospheric cloudbanks with ASCII matrix light beam illumination. Hover to tilt rays.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Density Selector */}
            <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-full p-1 text-xs text-zinc-300 font-mono">
              {['high', 'medium'].map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setAsciiDensity(d);
                    playSound('click', soundEnabled);
                  }}
                  className={`px-3 py-1 rounded-full capitalize font-semibold transition-all ${
                    asciiDensity === d ? 'bg-orange-500 text-white shadow-sm' : 'hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Theme Shuffler */}
            <button
              onClick={handleShuffleTheme}
              className="px-3.5 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 text-xs font-mono font-medium flex items-center gap-1.5 tactile-btn transition-all"
            >
              <ArrowsClockwise size={13} weight="bold" className="text-orange-400" />
              <span>{currentTheme.name}</span>
            </button>
          </div>
        </div>

        {/* Live Canvas Shader Area */}
        <div className="w-full h-80 sm:h-[420px] relative overflow-hidden cursor-crosshair">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Floating Aesthetic Overlay Stamp */}
          <div className="absolute bottom-4 right-4 bg-zinc-950/85 border border-zinc-800 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-mono text-zinc-400 pointer-events-none flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>Volumetric ASCII Shader • 60 FPS</span>
          </div>
        </div>

      </div>
    </div>
  );
};
