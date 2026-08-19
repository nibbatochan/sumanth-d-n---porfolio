import React from 'react';

export const SumanthLogo = ({ className = "w-8 h-8", isDarkMode = true }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <img
        src="/sumanth_signature.png"
        alt="Sumanth Reddy Logo"
        className="w-full h-full object-contain transition-all select-none pointer-events-none"
        style={
          isDarkMode
            ? { filter: 'invert(1) brightness(2)', mixBlendMode: 'screen' }
            : { filter: 'brightness(0)', mixBlendMode: 'multiply' }
        }
      />
    </div>
  );
};
