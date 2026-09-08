import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const getZoom = () => {
      try {
        const docZoom = parseFloat(window.getComputedStyle(document.documentElement).zoom);
        if (docZoom && !isNaN(docZoom) && docZoom > 0) return docZoom;
        const bodyZoom = parseFloat(window.getComputedStyle(document.body).zoom);
        if (bodyZoom && !isNaN(bodyZoom) && bodyZoom > 0) return bodyZoom;
        if (document.documentElement.clientWidth > 0 && window.innerWidth > 0) {
          return window.innerWidth / document.documentElement.clientWidth;
        }
      } catch (e) {}
      return 1;
    };

    const onMouseMove = (e) => {
      const zoom = getZoom();
      const x = e.clientX / zoom;
      const y = e.clientY / zoom;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${x}px`;
        cursorDotRef.current.style.top = `${y}px`;
      }
      setPosition({ x, y });
      setHidden(false);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setHidden(true);

    const onMouseEnterLink = (e) => {
      const target = e.target.closest(
        'a, button, [role="button"], input, textarea, select, .cursor-pointer, [class*="cursor-pointer"], [onclick]'
      );
      if (target) {
        setLinkHovered(true);
        return;
      }
      try {
        const computed = window.getComputedStyle(e.target).cursor;
        setLinkHovered(computed === 'pointer');
      } catch (err) {
        setLinkHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseEnterLink);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseEnterLink);
    };
  }, []);

  if (isTouchDevice || hidden) return null;

  return (
    <div
      ref={cursorDotRef}
      className="fixed pointer-events-none z-[10000] transition-transform duration-75 ease-out will-change-transform hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Precision Core Dot */}
      <div
        className={`rounded-full transition-all duration-200 ${
          clicked
            ? 'w-3 h-3 bg-orange-500 scale-75'
            : linkHovered
            ? 'w-8 h-8 bg-orange-500/20 border border-orange-500 scale-125 backdrop-blur-[1px]'
            : 'w-3 h-3 bg-zinc-900 dark:bg-white shadow-sm'
        }`}
      />
    </div>
  );
};
