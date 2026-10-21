import React, { useEffect, useRef, useState } from 'react';

// Strong ease-out: starts fast, so the page feels like it heard the scroll.
export const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';
// Ease-in-out for things that travel across the screen, such as an image reveal.
export const EASE_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';

export const useInView = (threshold = 0.2) => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
};

// Fades and lifts 12px into place once, with a short stagger from `delay`.
export const Rise = ({ delay = 0, className = '', children }) => {
  const [ref, seen] = useInView(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 500ms ${EASE_OUT} ${delay}ms, transform 500ms ${EASE_OUT} ${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// Wipes an image in from the top edge, once, when it scrolls into view.
export const RevealImage = ({ src, alt, className = '' }) => {
  const [ref, seen] = useInView(0.12);
  return (
    <div ref={ref} className={className}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="block w-full h-auto"
        style={{
          clipPath: seen ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
          transition: `clip-path 900ms ${EASE_IN_OUT}`
        }}
      />
    </div>
  );
};

// A 1-to-5 scale: the fill grows from the left on scroll-in. Only transform animates.
export const RatingTrack = ({ label, value, delay = 0 }) => {
  const [ref, seen] = useInView(0.3);
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">{label}</span>
        <span className="font-mono font-black text-xl tabular-nums text-zinc-950 dark:text-white">
          {value.toFixed(1)}<span className="text-xs font-normal text-zinc-400 ml-1">/ 5</span>
        </span>
      </div>
      <div className="relative h-px bg-zinc-300 dark:bg-zinc-700">
        <div
          className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 origin-left rounded-full bg-orange-500"
          style={{
            transform: `scaleX(${seen ? value / 5 : 0})`,
            transition: `transform 900ms ${EASE_OUT} ${delay}ms`
          }}
        />
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-zinc-300 dark:bg-zinc-700" style={{ left: `${(n / 5) * 100}%` }} />
        ))}
      </div>
    </div>
  );
};
