import React, { useState, useEffect } from 'react';
import { playSound } from '../utils/sound';

// 1. Rotating Mini 3D ASCII Globe (Inspired by uploaded Sphere matrix & glowing squircle)
export const InlineAsciiGlobe = ({ soundEnabled = true }) => {
  const [frame, setFrame] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 10-step smooth 3D globe rotation sequence in clean dense ASCII
  const globeFrames = [
    ["  .---.  ", " ( @ @ ) ", "  '---'  "],
    ["  .---.  ", " ( % @ ) ", "  '---'  "],
    ["  .---.  ", " ( # % ) ", "  '---'  "],
    ["  .---.  ", " ( * # ) ", "  '---'  "],
    ["  .---.  ", " ( + * ) ", "  '---'  "],
    ["  .---.  ", " ( . + ) ", "  '---'  "],
    ["  .---.  ", " ( @ . ) ", "  '---'  "],
    ["  .---.  ", " ( % @ ) ", "  '---'  "],
    ["  .---.  ", " ( # % ) ", "  '---'  "],
    ["  .---.  ", " ( * # ) ", "  '---'  "],
  ];

  useEffect(() => {
    const speed = isHovered ? 60 : 130;
    const timer = setInterval(() => {
      setFrame((prev) => (prev + 1) % globeFrames.length);
    }, speed);
    return () => clearInterval(timer);
  }, [isHovered, globeFrames.length]);

  return (
    <span
      onMouseEnter={() => {
        setIsHovered(true);
        playSound('pop', soundEnabled);
      }}
      onMouseLeave={() => setIsHovered(false)}
      title="Interactive ASCII Globe"
      className="inline-flex items-center justify-center align-middle mx-1.5 sm:mx-2.5 h-8 sm:h-10 px-2 sm:px-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-orange-950/20 dark:from-orange-500/30 dark:via-amber-500/15 dark:to-zinc-900 border border-orange-500/40 shadow-xs backdrop-blur-md hover:scale-110 hover:border-orange-400 hover:shadow-orange-500/20 transition-all duration-300 cursor-pointer select-none -translate-y-0.5 group"
    >
      <span className="font-mono text-[8px] sm:text-[9px] leading-[1.0] text-orange-600 dark:text-orange-400 tracking-tighter whitespace-pre text-center drop-shadow-xs font-bold group-hover:text-amber-500 transition-colors">
        {globeFrames[frame].join('\n')}
      </span>
    </span>
  );
};

// 2. Animated ASCII Morphing Geometric Prism / Star Squircle (Inspired by colorful squircle pads & GSAP character badge)
export const InlineAsciiMorph = ({ soundEnabled = true }) => {
  const [frame, setFrame] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 8-step morphing wireframe geometry
  const morphFrames = [
    [" /\\ ", "/  \\", "\\  /", " \\/ "],
    [" |  ", "+--+", "|  |", " +-+"],
    ["  * ", " *** ", "*****", "  * "],
    [" <> ", "<><>", "<><>", " <> "],
    [" .  ", "/--\\", "|::|", "\\--/"],
    [" o  ", "[++] ", "[++] ", " o  "],
    [" ^  ", "/==\\", "\\==/", " v  "],
    [" #  ", "####", "####", " #  "]
  ];

  useEffect(() => {
    const speed = isHovered ? 70 : 160;
    const timer = setInterval(() => {
      setFrame((prev) => (prev + 1) % morphFrames.length);
    }, speed);
    return () => clearInterval(timer);
  }, [isHovered, morphFrames.length]);

  return (
    <span
      onMouseEnter={() => {
        setIsHovered(true);
        playSound('toggle', soundEnabled);
      }}
      onMouseLeave={() => setIsHovered(false)}
      title="Interactive ASCII Morph"
      className="inline-flex items-center justify-center align-middle mx-1.5 sm:mx-2.5 h-8 sm:h-10 px-2 sm:px-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500/20 via-sky-500/10 to-indigo-950/20 dark:from-emerald-500/25 dark:via-sky-500/15 dark:to-zinc-900 border border-emerald-500/40 shadow-xs backdrop-blur-md hover:scale-110 hover:border-emerald-400 hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer select-none -translate-y-0.5 group"
    >
      <span className="font-mono text-[7.5px] sm:text-[8.5px] leading-[1.0] text-emerald-600 dark:text-emerald-400 tracking-tighter whitespace-pre text-center drop-shadow-xs font-bold group-hover:text-sky-400 transition-colors">
        {morphFrames[frame].join('\n')}
      </span>
    </span>
  );
};
