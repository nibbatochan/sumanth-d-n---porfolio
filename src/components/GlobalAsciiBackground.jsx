import React, { useEffect, useRef } from 'react';

export const GlobalAsciiBackground = ({ isDarkMode = true, fullPage = false }) => {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const getZoom = () => {
      try {
        const docZoom = parseFloat(window.getComputedStyle(document.documentElement).zoom);
        if (docZoom && !isNaN(docZoom) && docZoom > 0) return docZoom;
      } catch (e) {}
      return 1;
    };

    let width = (canvas.width = Math.round(window.innerWidth / getZoom()));
    let height = (canvas.height = Math.round(window.innerHeight / getZoom()));

    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handleMouseMove = (e) => {
      const zoom = getZoom();
      targetMouseX = e.clientX / zoom;
      targetMouseY = e.clientY / zoom;
    };

    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      const zoom = getZoom();
      width = canvas.width = Math.round(window.innerWidth / zoom);
      height = canvas.height = Math.round(window.innerHeight / zoom);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      mouseX += (targetMouseX - mouseX) * 0.12;
      mouseY += (targetMouseY - mouseY) * 0.12;

      ctx.clearRect(0, 0, width, height);

      const heroEl = document.getElementById('home');
      const heroBottom = (fullPage || !heroEl) ? -5000 : heroEl.getBoundingClientRect().bottom;

      // Only render if mouse is present and below the hero section (or fullPage)
      if (mouseX > -500 && (fullPage || mouseY > heroBottom - 40)) {
        const cellSize = 38;
        const cols = Math.floor(width / cellSize);
        const rows = Math.floor(height / cellSize);
        const spotlightRadius = 190;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let y = 0; y <= rows; y++) {
          const py = y * cellSize + cellSize / 2;

          if (!fullPage && py < heroBottom) continue;

          for (let x = 0; x <= cols; x++) {
            const px = x * cellSize + cellSize / 2;

            const dist = Math.hypot(px - mouseX, py - mouseY);

            if (dist < spotlightRadius) {
              const normDist = dist / spotlightRadius;
              const intensity = Math.pow(1 - normDist, 1.8);

              if (intensity > 0.02) {
                const fontSize = Math.floor(10 + intensity * 4);
                ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

                if (isDarkMode) {
                  ctx.fillStyle = `rgba(251, 146, 60, ${intensity * 0.75})`;
                } else {
                  ctx.fillStyle = `rgba(234, 88, 12, ${intensity * 0.65})`;
                }

                ctx.fillText('+', px, py);
              }
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDarkMode, fullPage]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
