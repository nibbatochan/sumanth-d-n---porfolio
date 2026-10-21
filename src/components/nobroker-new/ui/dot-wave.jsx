import React, { useEffect, useRef } from 'react';

// Adapted from the 21st.dev "Dot Wave" (scrollxui). Changes: sized to its own box instead of the window,
// transparent background, one wave that starts when `active` flips on, then the dots settle and the loop stops.
export function DotWave({ active, dotGap = 22, dotRadius = 1.8, expansionSpeed = 260, rgb = '234, 88, 12', peak = 0.65, rest = 0.16, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let start = 0;

    const size = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (radius) => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const front = 90;
      const cols = Math.floor(w / dotGap) + 2;
      const rows = Math.floor(h / dotGap) + 1;
      const x0 = (w - (cols - 1) * dotGap) / 2;
      const y0 = (h - (rows - 1) * dotGap) / 2;
      for (let i = 0; i < cols; i += 1) {
        for (let j = 0; j < rows; j += 1) {
          const x = x0 + i * dotGap + (j % 2 === 0 ? -dotGap / 2 : 0);
          const y = y0 + j * dotGap;
          const d = Math.hypot(x - cx, y - cy);
          let a = 0;
          if (d <= radius) {
            const off = Math.abs(d - radius);
            a = off < front ? rest + (peak - rest) * (1 - off / front) : rest;
          }
          if (a > 0) {
            ctx.fillStyle = `rgba(${rgb}, ${a})`;
            ctx.beginPath();
            ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    size();
    const max = Math.hypot(w, h) / 2 + front0(w, h);
    if (!active) {
      ctx.clearRect(0, 0, w, h);
      return undefined;
    }
    if (reduce) {
      draw(max);
      return undefined;
    }
    start = performance.now();
    const loop = (now) => {
      const radius = ((now - start) / 1000) * expansionSpeed;
      draw(radius);
      if (radius < max) raf = requestAnimationFrame(loop);
      else draw(max);
    };
    raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(() => { size(); draw(max); });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [active, dotGap, dotRadius, expansionSpeed, rgb, peak, rest]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}

// the wave has to travel a little past the corner so the last dots light up
function front0() {
  return 120;
}
