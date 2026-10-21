import React, { useEffect, useState } from 'react';

// Adapted from the 21st.dev "Text Scramble" (soralabs). Changes: plain JSX with no motion dependency,
// and every character keeps its real width in a fixed cell, so the paragraph never reflows while it decodes.
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const pick = () => CHARS[Math.floor(Math.random() * CHARS.length)];

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// parts: [{ text, className }]. Characters resolve left to right across all parts once `active` turns true.
export function TextScramble({ parts, active, duration = 1.3, speed = 0.035, scrambleClassName = 'opacity-60' }) {
  const total = parts.reduce((n, p) => n + p.text.replace(/\s/g, '').length, 0);
  const [revealed, setRevealed] = useState(0);
  const [, setTick] = useState(0);
  const reduce = prefersReducedMotion();

  useEffect(() => {
    if (!active || reduce) {
      setRevealed(active ? total : 0);
      return undefined;
    }
    const steps = Math.round(duration / speed);
    let step = 0;
    const id = setInterval(() => {
      step += 1;
      setRevealed(Math.min(total, Math.floor((step / steps) * total)));
      setTick((t) => t + 1);
      if (step >= steps) {
        setRevealed(total);
        clearInterval(id);
      }
    }, speed * 1000);
    return () => clearInterval(id);
  }, [active, reduce, total, duration, speed]);

  let index = 0;
  return (
    <>
      <span className="sr-only">{parts.map((p) => p.text).join('')}</span>
      <span aria-hidden="true">
        {parts.map((part, pi) => (
          <span key={pi} className={part.className}>
            {part.text.split(/(\s+)/).map((chunk, ci) => {
              if (/^\s+$/.test(chunk)) return chunk;
              return (
                <span key={ci} className="inline-block whitespace-nowrap">
                  {chunk.split('').map((ch, i) => {
                    const done = index < revealed;
                    const shown = !active ? ch : done ? ch : pick();
                    index += 1;
                    return (
                      <span key={i} className="relative inline-block">
                        <span className="invisible">{ch}</span>
                        <span
                          className={`absolute inset-0 ${active && !done ? scrambleClassName : ''}`}
                          style={{ opacity: active ? 1 : 0 }}
                        >
                          {shown}
                        </span>
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </>
  );
}
