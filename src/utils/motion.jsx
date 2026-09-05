import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, stagger } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits text into animated word spans wrapped in overflow-hidden containers.
 * @param {string} text 
 * @param {string} wordClass 
 * @returns {JSX.Element[]}
 */
export const splitWords = (text, wordClass = 'header-title-word') => {
  return text.split(' ').map((word, i) => (
    <React.Fragment key={i}>
      <span className="inline-block overflow-hidden py-0.5 align-top">
        <span className={`${wordClass} inline-block transform-gpu will-change-transform`}>
          {word}
        </span>
      </span>
      {' '}
    </React.Fragment>
  ));
};

/**
 * KineticHeading component:
 * Automatically triggers Anime.js word reveal when scrolled into view.
 */
export const KineticHeading = ({ 
  text, 
  as: Component = 'h2', 
  className = '', 
  wordClass = '',
  delay = 0 
}) => {
  const headingRef = React.useRef(null);
  const words = text.split(' ');

  React.useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const wordEls = el.querySelectorAll('.kinetic-word');
    if (!wordEls.length) return;

    // Initially hide words
    wordEls.forEach(w => {
      w.style.opacity = '0';
      w.style.transform = 'translateY(115%)';
      w.style.willChange = 'transform, opacity';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);

        try {
          animate(wordEls, {
            translateY: ['115%', '0%'],
            opacity: [0, 1],
            rotateZ: [-2, 0],
            delay: stagger(30, { start: delay }),
            duration: 750,
            ease: 'outExpo'
          });
        } catch {
          gsap.fromTo(wordEls,
            { y: '115%', opacity: 0 },
            { y: '0%', opacity: 1, stagger: 0.03, duration: 0.75, ease: 'power4.out', delay: delay / 1000 }
          );
        }
      });
    }, {
      root: el.closest('.overflow-y-auto') || null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.15
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, delay]);

  return (
    <Component ref={headingRef} className={`${className} flex flex-wrap`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-0.5 mr-[0.28em] last:mr-0 align-top">
          <span className={`kinetic-word ${wordClass} inline-block transform-gpu will-change-transform`}>
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};

/**
 * 60FPS Orchestrated Header Load Animation
 * Combines GSAP for layout timeline and Anime.js for spring word load physics.
 */
export const animateHeaderLoad = (headerEl, { onComplete } = {}) => {
  if (!headerEl) return null;

  const kicker = headerEl.querySelector('.header-kicker');
  const logo = headerEl.querySelector('.header-logo');
  const titleWords = headerEl.querySelectorAll('.header-title-word');
  const descWords = headerEl.querySelectorAll('.header-desc-word');
  const metaCols = headerEl.querySelectorAll('.header-meta-col');

  // GSAP master timeline for choreography
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete
  });

  // 1. Kicker Badge entrance
  if (kicker) {
    tl.fromTo(
      kicker,
      { opacity: 0, x: -16, filter: 'blur(4px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.55 },
      0
    );
  }

  // 2. Logo entrance with subtle bounce
  if (logo) {
    tl.fromTo(
      logo,
      { opacity: 0, y: -12, scale: 0.88 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
      0.08
    );
  }

  // 3. Kinetic Title Word Load Animation using Anime.js
  if (titleWords && titleWords.length > 0) {
    try {
      animate(titleWords, {
        translateY: ['115%', '0%'],
        opacity: [0, 1],
        rotateZ: [-2.5, 0],
        delay: stagger(38, { start: 160 }),
        duration: 800,
        ease: 'outExpo'
      });
    } catch {
      tl.fromTo(
        titleWords,
        { y: '115%', opacity: 0, rotateZ: -2.5 },
        { y: '0%', opacity: 1, rotateZ: 0, stagger: 0.038, duration: 0.8, ease: 'power4.out' },
        0.16
      );
    }
  }

  // 4. Elevator Pitch Paragraph Smooth Slide & Fade
  const desc = headerEl.querySelector('.header-desc');
  if (desc) {
    tl.fromTo(
      desc,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
      0.35
    );
  } else if (descWords && descWords.length > 0) {
    try {
      animate(descWords, {
        translateY: [8, 0],
        opacity: [0, 1],
        delay: stagger(8, { start: 380 }),
        duration: 400,
        ease: 'outCubic'
      });
    } catch {
      tl.fromTo(
        descWords,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.008, duration: 0.4, ease: 'power2.out' },
        0.38
      );
    }
  }

  // 5. Metadata Grid Columns Stagger
  if (metaCols && metaCols.length > 0) {
    tl.fromTo(
      metaCols,
      { opacity: 0, y: 20, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.6, ease: 'power3.out' },
      0.6
    );
  }

  return tl;
};

/**
 * 60FPS Scroll Reveal Engine
 * Uses IntersectionObserver + GPU-accelerated GSAP transforms for zero-jank scroll reveals.
 */
export const initScrollReveals = (containerEl) => {
  if (!containerEl || typeof window === 'undefined') return () => {};

  const targets = containerEl.querySelectorAll('[data-reveal], [data-reveal-group]');
  if (!targets.length) return () => {};

  // Initially hide elements to prepare for entrance
  targets.forEach((target) => {
    if (target.hasAttribute('data-reveal-group')) {
      const children = target.querySelectorAll('[data-reveal-child]');
      const items = children.length ? children : target.children;
      Array.from(items).forEach((item) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(24px) scale(0.985)';
        item.style.willChange = 'transform, opacity';
      });
    } else {
      target.style.opacity = '0';
      target.style.transform = 'translateY(22px) scale(0.99)';
      target.style.willChange = 'transform, opacity';
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        observer.unobserve(el);

        if (el.hasAttribute('data-reveal-group')) {
          const children = el.querySelectorAll('[data-reveal-child]');
          const itemsToAnimate = children.length ? children : el.children;
          gsap.to(itemsToAnimate, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.07,
            duration: 0.65,
            ease: 'power2.out',
            clearProps: 'transform,will-change'
          });
        } else {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: 'power2.out',
            clearProps: 'transform,will-change'
          });
        }
      });
    },
    {
      root: containerEl.closest('.overflow-y-auto') || null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    }
  );

  targets.forEach((target) => observer.observe(target));

  return () => {
    observer.disconnect();
  };
};
