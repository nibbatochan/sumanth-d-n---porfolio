import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { playSound } from '../utils/sound';

export const Preloader = ({ onComplete, soundEnabled }) => {
  const [percent, setPercent] = useState(0);
  const [statusLog, setStatusLog] = useState('INITIALIZING PORTFOLIO TOKENS...');
  const containerRef = useRef(null);
  const isDoneRef = useRef(false);

  const logs = [
    'INITIALIZING DESIGN SYSTEMS & TOKENS...',
    'SYNTHESIZING SELECTED CASE STUDIES...',
    'CALIBRATING 3D ASCII DOVE ENGINE...',
    'SYSTEM READY.'
  ];

  const handleFinish = () => {
    if (isDoneRef.current) return;
    isDoneRef.current = true;

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        yPercent: -100,
        duration: 0.65,
        ease: 'power3.inOut',
        onComplete: () => {
          onComplete();
        }
      });
    } else {
      onComplete();
    }
  };

  useEffect(() => {
    const totalDuration = 1500; // Exact 1.5 seconds duration
    const startTime = performance.now();
    let prevLogIndex = -1;
    let animId = null;

    // Smooth Ease-In-Out Cubic function
    const easeInOutCubic = (x) => {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    };

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / totalDuration);
      const easedProgress = easeInOutCubic(progress);
      
      const currentPercent = Math.min(100, Math.floor(easedProgress * 100));
      setPercent(currentPercent);

      const logIndex = Math.min(Math.floor((currentPercent / 100) * logs.length), logs.length - 1);
      if (logIndex !== prevLogIndex) {
        prevLogIndex = logIndex;
        setStatusLog(logs[logIndex]);
        if (currentPercent > 0 && currentPercent < 100) {
          playSound('type', soundEnabled);
        }
      }

      if (progress < 1) {
        animId = requestAnimationFrame(update);
      } else {
        setPercent(100);
        setStatusLog(logs[logs.length - 1]);
        playSound('success', soundEnabled);
        
        // Small graceful pause at 100% before smooth slide-up
        setTimeout(() => {
          handleFinish();
        }, 120);
      }
    };

    animId = requestAnimationFrame(update);

    // Failsafe safety fallback (guaranteed dismissal)
    const safetyTimeout = setTimeout(() => {
      handleFinish();
    }, 2200);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      clearTimeout(safetyTimeout);
    };
  }, [soundEnabled]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#09090B] text-white flex flex-col justify-between p-8 sm:p-12 select-none overflow-hidden"
    >
      {/* Top Header Bar */}
      <div className="flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
          <span className="font-semibold text-zinc-200 tracking-wider">SUMANTH REDDY — PORTFOLIO</span>
        </div>
        <span className="text-zinc-500 hidden sm:inline tracking-wider">UI/UX & GRAPHIC DESIGNER</span>
      </div>

      {/* Center Percentage & Smooth Eased Bar */}
      <div className="my-auto space-y-5 max-w-xl">
        <div className="flex items-baseline gap-2">
          <span className="font-serif italic text-7xl sm:text-9xl font-bold tracking-tighter text-white tabular-nums">
            {percent}
          </span>
          <span className="text-3xl sm:text-5xl font-mono text-orange-500 font-bold">%</span>
        </div>

        {/* Easing Progress Bar */}
        <div className="w-full bg-zinc-900 border border-zinc-800 h-2 rounded-full overflow-hidden p-0.5 shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 rounded-full transition-all duration-75 ease-out shadow-sm"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="font-mono text-xs text-amber-400 tracking-widest animate-pulse">
          &gt; {statusLog}
        </p>
      </div>

      {/* Bottom Footer Bar */}
      <div className="flex justify-between items-end text-[11px] font-mono text-zinc-500 border-t border-zinc-800 pt-4">
        <span>UI/UX PRODUCT • BRANDING • CREATIVE TECH</span>
        <span>BENGALURU, IN 🇮🇳</span>
      </div>
    </div>
  );
};
