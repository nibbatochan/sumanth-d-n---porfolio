import React, { useEffect, useRef } from 'react';

export const GlobalAsciiBackground = ({ isDarkMode = true }) => {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      mouseX += (targetMouseX - mouseX) * 0.12;
      mouseY += (targetMouseY - mouseY) * 0.12;

      ctx.clearRect(0, 0, width, height);

      const heroEl = document.getElementById('home');
      const heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom : -1000;

      // Only render if mouse is present and below the hero section
      if (mouseX > -500 && mouseY > heroBottom - 40) {
        const cellSize = 38;
        const cols = Math.floor(width / cellSize);
        const rows = Math.floor(height / cellSize);
        const spotlightRadius = 190;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let y = 0; y <= rows; y++) {
          const py = y * cellSize + cellSize / 2;

          if (py < heroBottom) continue;

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
  }, [isDarkMode]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
