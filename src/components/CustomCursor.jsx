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

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setHidden(true);

    const onMouseEnterLink = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select');
      if (target) {
        setLinkHovered(true);
      } else {
        setLinkHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
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
