import React, { useState, useEffect } from 'react';
import { X, Copy, Check } from '@phosphor-icons/react';
import { ProjectMockup } from './ProjectMockup';
import { playSound } from '../utils/sound';

export const CaseStudyModal = ({ project, onClose, soundEnabled }) => {
  const [copiedHex, setCopiedHex] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyColor = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    playSound('pop', soundEnabled);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#121215] w-full max-w-4xl max-h-[92vh] rounded-4xl border border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col overflow-hidden relative text-zinc-900 dark:text-white"
      >
        {/* Sticky Header */}
        <div className="p-4 sm:p-6 bg-white dark:bg-[#18181D] border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-orange-600 dark:text-orange-400 uppercase tracking-wider font-semibold">
                {project.categoryLabel}
              </span>
              <span className="text-zinc-400 dark:text-zinc-600">•</span>
              <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">{project.year}</span>
            </div>
            <h3 id="case-study-title" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight font-sans">
              {project.title}
            </h3>
          </div>

          <button
            onClick={() => {
              playSound('click', soundEnabled);
              onClose();
            }}
            aria-label="Close case study dialog"
            className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex items-center justify-center transition-colors tactile-btn border border-zinc-200 dark:border-zinc-700"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-8">
          
          {/* Visual Showcase */}
          <div className={`w-full rounded-3xl p-4 sm:p-8 bg-gradient-to-br ${project.heroColor} flex items-center justify-center min-h-[300px] sm:min-h-[400px] border border-black/5 dark:border-white/5 shadow-inner`}>
            <ProjectMockup project={project} interactive={true} />
          </div>

          {/* Core Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold">The Challenge</span>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {project.details.challenge}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold">The Solution</span>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {project.details.solution}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">Verified Impact</span>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-semibold">
                {project.details.impact}
              </p>
            </div>

          </div>

          {/* Design System Palette Swatches */}
          {project.details.palette && project.details.palette.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                Design System Palette
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.details.palette.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCopyColor(color.hex)}
                    className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between group hover:border-orange-500/40 transition-all text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <span 
                        className="w-5 h-5 rounded-full border border-black/10 dark:border-white/20 shadow-xs shrink-0" 
                        style={{ backgroundColor: color.hex }}
                      />
                      <div>
                        <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{color.name}</p>
                        <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">{color.hex}</p>
                      </div>
                    </div>
                    {copiedHex === color.hex ? (
                      <Check size={14} className="text-emerald-500" />
                    ) : (
                      <Copy size={14} className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Key Design Takeaways */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
              Execution Methodology
            </h4>
            <ul className="space-y-2">
              {project.details.takeaways.map((item, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
