import React, { useRef, useEffect } from 'react';
import { playSound } from '../utils/sound';

export const PixelFlower = ({ isDarkMode = true, soundEnabled = true, className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/pixel-flower.png?' + new Date().getTime();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Key out white/light background and render dual-theme 8-bit pixel matrix
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Background threshold (near-white)
        if (r > 225 && g > 225 && b > 225) {
          data[i + 3] = 0; // Transparent
        } else {
          const brightness = (r + g + b) / 3;
          const alphaStrength = Math.min(255, (255 - brightness) * 1.4);
          data[i + 3] = alphaStrength;

          if (isDarkMode) {
            // Dark Mode: Crisp luminous white / bright silver pixels
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
          } else {
            // Light Mode: Deep crisp obsidian black pixels
            data[i] = 18;
            data[i + 1] = 18;
            data[i + 2] = 20;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
    };
  }, [isDarkMode]);

  return (
    <span
      onClick={() => playSound('pop', soundEnabled)}
      onMouseEnter={() => playSound('toggle', soundEnabled)}
      title="Pixel Star Flower"
      className={`inline-flex items-center justify-center align-middle cursor-pointer hover:rotate-45 hover:scale-110 transition-transform duration-300 select-none shrink-0 ${className}`}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-contain filter drop-shadow-xs" 
      />
    </span>
  );
};
