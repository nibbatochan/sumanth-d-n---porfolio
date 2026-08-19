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
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  const handleCopyColor = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    playSound('pop', soundEnabled);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto">
      
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-canvas dark:bg-[#141210] w-full max-w-4xl max-h-[92vh] rounded-4xl border border-black/10 dark:border-white/15 shadow-cozy-lg flex flex-col overflow-hidden relative animate-fade-in text-ink dark:text-[#FAF7F2]"
      >
        <div className="p-4 sm:p-6 bg-white dark:bg-[#1A1816] border-b border-black/8 dark:border-white/10 flex items-center justify-between sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-accent-terracotta uppercase tracking-wider font-semibold">
                {project.categoryLabel}
              </span>
              <span className="text-ink-faint dark:text-white/40">•</span>
              <span className="text-[11px] font-mono text-ink-muted dark:text-white/60">{project.year}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-ink dark:text-white tracking-tight font-sans">
              {project.title}
            </h3>
          </div>

          <button
            onClick={() => {
              playSound('click', soundEnabled);
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-surface-warm dark:bg-[#25221F] hover:bg-black/5 dark:hover:bg-white/10 text-ink-muted dark:text-white/80 hover:text-ink dark:hover:text-white flex items-center justify-center transition-colors tactile-btn"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          <div className={`h-64 sm:h-80 rounded-3xl bg-gradient-to-br ${project.heroColor} p-4 sm:p-6 shadow-inner flex items-center justify-center`}>
            <ProjectMockup project={project} interactive={true} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-[#1A1816] rounded-3xl border border-black/5 dark:border-white/10 shadow-cozy-sm">
              <h4 className="text-xs font-bold font-sans text-ink dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span>The Challenge</span>
              </h4>
              <p className="text-sm text-ink-muted dark:text-white/70 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-[#1A1816] rounded-3xl border border-black/5 dark:border-white/10 shadow-cozy-sm">
              <h4 className="text-xs font-bold font-sans text-ink dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>The Solution</span>
              </h4>
              <p className="text-sm text-ink-muted dark:text-white/70 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-accent-terracotta font-semibold">
              Key Deliverables & Screens
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.screens.map((screen, idx) => (
                <div key={idx} className="p-5 bg-white dark:bg-[#1A1816] rounded-2xl border border-black/5 dark:border-white/10 shadow-cozy-sm space-y-2">
                  <span className="text-[10px] font-mono bg-surface-warm dark:bg-[#25221F] text-accent-terracotta px-2 py-0.5 rounded-full font-bold">
                    0{idx + 1} • {screen.type}
                  </span>
                  <h5 className="text-sm font-bold text-ink dark:text-white">{screen.title}</h5>
                  <p className="text-xs text-ink-muted dark:text-white/70 leading-relaxed">{screen.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-[#1A1816] rounded-3xl border border-black/5 dark:border-white/10 shadow-cozy-sm space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-accent-terracotta font-semibold">
              Color Palette (Click to Copy HEX)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.designTokens.colors.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCopyColor(c.hex)}
                  className="p-3 rounded-2xl bg-canvas dark:bg-[#22201D] hover:bg-surface-warm dark:hover:bg-[#2A2723] border border-black/5 dark:border-white/10 flex flex-col items-start gap-2 transition-all tactile-btn text-left"
                >
                  <div 
                    className="w-full h-10 rounded-xl shadow-inner border border-black/5 dark:border-white/10" 
                    style={{ backgroundColor: c.hex }} 
                  />
                  <div className="w-full flex justify-between items-center text-xs">
                    <span className="font-semibold text-ink dark:text-white">{c.name}</span>
                    {copiedHex === c.hex ? <Check size={14} weight="bold" className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={14} weight="bold" className="text-ink-faint dark:text-white/40" />}
                  </div>
                  <span className="font-mono text-[10px] text-ink-muted dark:text-white/60">{c.hex}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        <div className="p-4 sm:p-6 bg-white dark:bg-[#1A1816] border-t border-black/8 dark:border-white/10 flex items-center justify-between">
          <button
            onClick={() => {
              playSound('click', soundEnabled);
              onClose();
            }}
            className="text-xs font-semibold text-ink-muted dark:text-white/70 hover:text-ink dark:hover:text-white"
          >
            Close
          </button>
        </div>

      </div>

    </div>
  );
};
