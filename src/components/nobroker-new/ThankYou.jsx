import React from 'react';
import { EASE_OUT, EASE_IN_OUT, useInView } from './motion-bits';

// One letter: it rises out of a mask as an outline, then fills from the bottom up.
// Only transform, opacity and clip-path animate.
const Letter = ({ ch, seen, i, reduce }) => {
  const rise = 100 + i * 60;
  const fill = rise + 600;
  return (
    <span className="relative inline-block overflow-hidden px-[0.015em] pb-[0.24em] align-bottom">
      <span
        className="relative block"
        style={{
          transform: seen ? 'translateY(0)' : 'translateY(105%)',
          transition: reduce ? 'none' : `transform 900ms ${EASE_OUT} ${rise}ms`
        }}
      >
        <span className="block text-zinc-900 dark:text-white" style={{ color: 'transparent', WebkitTextStroke: '2px currentColor' }}>
          {ch}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block text-zinc-900 dark:text-white"
          style={{
            clipPath: seen ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
            transition: reduce ? 'none' : `clip-path 850ms ${EASE_IN_OUT} ${fill}ms`
          }}
        >
          {ch}
        </span>
      </span>
    </span>
  );
};

// Closing note: "Thank you" large, "for scrolling" small underneath. No background layer.
export const ThankYou = () => {
  const [ref, seen] = useInView(0.35);
  const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section ref={ref} className="relative flex min-h-[60vh] flex-col items-center justify-center pt-20 pb-56 text-center">
      <h2 className="font-bold leading-[0.9] tracking-tighter text-[clamp(3.5rem,11vw,9rem)]" aria-label="Thank you">
        <span aria-hidden="true" className="block whitespace-nowrap">
          {'Thank you'.split('').map((ch, i) => (
            ch === ' '
              ? <span key={i} className="inline-block w-[0.28em]" />
              : <Letter key={i} ch={ch} i={i} seen={seen} reduce={reduce} />
          ))}
        </span>
      </h2>
      <p
        className="mt-5 text-lg font-medium tracking-tight text-orange-600 sm:text-2xl dark:text-orange-400"
        style={{ opacity: seen ? 1 : 0, transform: seen ? 'none' : 'translateY(8px)', transition: reduce ? 'none' : `opacity 700ms ${EASE_OUT} 1300ms, transform 700ms ${EASE_OUT} 1300ms` }}
      >
        for scrolling
      </p>
    </section>
  );
};
