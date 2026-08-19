import React from 'react';
import { ArrowUpRight, CalendarBlank, Tag } from '@phosphor-icons/react';
import { ProjectMockup } from './ProjectMockup';
import { playSound } from '../utils/sound';

export const ProjectCard = ({ project, onSelect, soundEnabled }) => {
  return (
    <div 
      onClick={() => {
        playSound('pop', soundEnabled);
        onSelect(project);
      }}
      className="group relative bg-white dark:bg-gradient-to-t dark:from-[#191310] dark:via-[#131317] dark:to-[#0f0e13] rounded-3xl sm:rounded-4xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 hover:border-orange-500/40 flex flex-col cursor-pointer"
    >
      {/* Decorative Subtle ASCII Matrix Texture (Very soft, non-crowding ambient aesthetic) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.07] group-hover:opacity-[0.14] transition-opacity duration-500 overflow-hidden font-mono text-[9px] leading-[13px] text-orange-400 select-none p-4 break-all">
        {'+  ~  ·  *  %  @  8  S  0  #  X  +  ~  ·  *  %  @  8  S  0  #  X  ' +
         '+  ~  ·  *  %  @  8  S  0  #  X  +  ~  ·  *  %  @  8  S  0  #  X  ' +
         '+  ~  ·  *  %  @  8  S  0  #  X  +  ~  ·  *  %  @  8  S  0  #  X  ' +
         '+  ~  ·  *  %  @  8  S  0  #  X  +  ~  ·  *  %  @  8  S  0  #  X  ' +
         '+  ~  ·  *  %  @  8  S  0  #  X  +  ~  ·  *  %  @  8  S  0  #  X  ' +
         '+  ~  ·  *  %  @  8  S  0  #  X  +  ~  ·  *  %  @  8  S  0  #  X  '}
      </div>

      {/* Top Visual Mockup Container */}
      <div className={`h-64 sm:h-80 p-4 bg-gradient-to-br ${project.heroColor} relative overflow-hidden flex items-center justify-center rounded-t-3xl sm:rounded-t-4xl`}>
        <ProjectMockup project={project} interactive={false} />

        <div className="absolute top-4 right-4 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-zinc-900 dark:text-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-800">
          <span>View Case Study</span>
          <ArrowUpRight size={14} weight="bold" className="text-orange-500" />
        </div>
      </div>

      {/* Card Info Content */}
      <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-5 relative z-10">
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-2.5">
            <span className="font-mono uppercase tracking-wider text-[11px] text-orange-600 dark:text-orange-400 font-bold">
              {project.categoryLabel}
            </span>
            <span className="font-mono text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
              <CalendarBlank size={13} weight="bold" />
              <span>{project.year}</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-snug">
            {project.title}
          </h3>

          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mt-2.5 line-clamp-2">
            {project.summary}
          </p>
        </div>

        {/* Tags */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center gap-1.5">
          {project.tags.map((tag, idx) => (
            <span 
              key={idx}
              className="text-[11px] bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 px-3 py-1 rounded-full font-medium border border-zinc-200/60 dark:border-zinc-700/50 flex items-center gap-1"
            >
              <Tag size={11} weight="bold" className="text-orange-500" />
              <span>{tag}</span>
            </span>
          ))}
        </div>

      </div>
    </div>
  );
};
