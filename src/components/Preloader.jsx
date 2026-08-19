import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { playSound } from '../utils/sound';

export const Preloader = ({ onComplete, soundEnabled }) => {
  const [percent, setPercent] = useState(0);
  const [statusLog, setStatusLog] = useState('INITIALIZING PORTFOLIO...');
  const containerRef = useRef(null);
  const isDoneRef = useRef(false);

  const logs = [
    'LOADING DESIGN SYSTEMS & TOKENS...',
    'SYNTHESIZING SELECTED PROJECTS...',
    'CALIBRATING 3D ASCII DOVE ENGINE...',
    'READY.'
  ];

  const completeAndDismiss = () => {
    if (isDoneRef.current) return;
    isDoneRef.current = true;

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        yPercent: -100,
        duration: 0.55,
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
    let currentPercent = 0;
    let logIndex = 0;

    // Safety fallback: maximum 1.2 seconds
    const fallback = setTimeout(() => {
      completeAndDismiss();
    }, 1200);

    const interval = setInterval(() => {
      currentPercent += 12;
      if (currentPercent > 100) currentPercent = 100;
      setPercent(currentPercent);

      const nextLogIdx = Math.min(Math.floor((currentPercent / 100) * logs.length), logs.length - 1);
      if (nextLogIdx !== logIndex) {
        logIndex = nextLogIdx;
        setStatusLog(logs[logIndex]);
        playSound('type', soundEnabled);
      }

      if (currentPercent >= 100) {
        clearInterval(interval);
        clearTimeout(fallback);
        playSound('success', soundEnabled);
        completeAndDismiss();
      }
    }, 25);

    return () => {
      clearInterval(interval);
      clearTimeout(fallback);
    };
  }, [soundEnabled]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#09090B] text-white flex flex-col justify-between p-8 sm:p-12 select-none overflow-hidden"
    >
      <div className="flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
          <span>SUMANTH REDDY — PORTFOLIO</span>
        </div>
        <span className="text-zinc-500 hidden sm:inline">UI/UX & GRAPHIC DESIGNER</span>
      </div>

      <div className="my-auto space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="font-serif italic text-7xl sm:text-9xl font-bold tracking-tighter text-white">
            {percent}
          </span>
          <span className="text-3xl sm:text-5xl font-mono text-orange-500 font-bold">%</span>
        </div>

        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-75"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="font-mono text-xs text-amber-400 tracking-wider animate-pulse">
          &gt; {statusLog}
        </p>
      </div>

      <div className="flex justify-between items-end text-[11px] font-mono text-zinc-500 border-t border-zinc-800 pt-4">
        <span>UI/UX PRODUCT • BRANDING • CREATIVE TECH</span>
        <span>BENGALURU, IN 🇮🇳</span>
      </div>
    </div>
  );
};
