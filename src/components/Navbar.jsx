import React, { useState, useEffect } from 'react';
import { 
  SpeakerHigh, 
  SpeakerSlash, 
  ArrowUpRight, 
  FolderSimple, 
  User, 
  Wrench,
  FileText, 
  DownloadSimple, 
  Sun, 
  Moon 
} from '@phosphor-icons/react';
import { SumanthLogo } from './SumanthLogo';
import { playSound } from '../utils/sound';

export const Navbar = ({ soundEnabled, setSoundEnabled, onOpenContact, isDarkMode, setIsDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    playSound('pop', soundEnabled);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-3 sm:px-8 py-3 sm:py-4 ${scrolled ? 'pt-2.5 sm:pt-3' : 'pt-3 sm:pt-5'} opacity-100 translate-y-0`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        
        {/* Authentic Signature Logo + Sumanth Reddy Name */}
        <a 
          href="#home"
          onClick={() => playSound('click', soundEnabled)}
          className="flex items-center gap-2 sm:gap-3 group focus:outline-none select-none shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center p-1 sm:p-1.5 group-hover:scale-105 group-hover:border-orange-500 transition-all">
            <SumanthLogo className="w-6 h-6 sm:w-7 sm:h-7" isDarkMode={isDarkMode} />
          </div>
          <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white tracking-tight font-sans hidden xs:block">
            Sumanth Reddy
          </p>
        </a>

        {/* Center Pill Navigation: Work, About, Tools */}
        <nav className="bg-white/95 dark:bg-zinc-900/95 border border-zinc-200 dark:border-zinc-800 px-2 sm:px-6 py-1.5 sm:py-2 rounded-full shadow-sm backdrop-blur-md flex items-center gap-0.5 sm:gap-3 text-[11px] sm:text-xs font-bold text-zinc-800 dark:text-zinc-200">
          <a 
            href="#work" 
            onClick={() => playSound('pop', soundEnabled)}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full hover:text-orange-600 dark:hover:text-orange-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1"
          >
            <FolderSimple size={13} weight="bold" />
            <span>Work</span>
          </a>
          <a 
            href="#about" 
            onClick={() => playSound('pop', soundEnabled)}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full hover:text-orange-600 dark:hover:text-orange-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1"
          >
            <User size={13} weight="bold" />
            <span>About</span>
          </a>
          <a 
            href="#tools" 
            onClick={() => playSound('pop', soundEnabled)}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full hover:text-orange-600 dark:hover:text-orange-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1"
          >
            <Wrench size={13} weight="bold" />
            <span>Tools</span>
          </a>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Dark / Light Theme Toggle */}
          <button 
            onClick={toggleTheme}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all tactile-btn"
          >
            {isDarkMode ? <Sun size={15} weight="bold" className="text-amber-400" /> : <Moon size={15} weight="bold" className="text-zinc-800" />}
          </button>

          {/* Download Resume Button */}
          <a
            href="/Sumanth_DN_Resume.pdf"
            download="Sumanth_DN_Resume.pdf"
            onClick={() => playSound('success', soundEnabled)}
            className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-[11px] sm:text-xs font-bold shadow-sm flex items-center gap-1 sm:gap-1.5 transition-all tactile-btn"
            title="Download Resume PDF"
          >
            <FileText size={14} weight="bold" className="text-orange-600 dark:text-orange-400" />
            <span className="hidden sm:inline">Resume</span>
            <DownloadSimple size={12} weight="bold" className="text-zinc-500 dark:text-zinc-400" />
          </a>

          {/* Sound Toggle */}
          <button 
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              playSound('toggle', next);
            }}
            title={soundEnabled ? "Mute audio" : "Enable audio"}
            className="hidden sm:flex w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm items-center justify-center text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all tactile-btn"
          >
            {soundEnabled ? <SpeakerHigh size={17} weight="bold" className="text-orange-500" /> : <SpeakerSlash size={17} weight="bold" className="text-zinc-400" />}
          </button>

          {/* Contact CTA */}
          <button
            onClick={() => {
              playSound('success', soundEnabled);
              onOpenContact();
            }}
            className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-zinc-100 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold shadow-sm flex items-center gap-1 sm:gap-1.5 transition-all tactile-btn"
          >
            <span className="hidden sm:inline">Let's Connect</span>
            <span className="sm:hidden">Chat</span>
            <ArrowUpRight size={13} weight="bold" className="text-orange-400 dark:text-orange-600" />
          </button>
        </div>

      </div>
    </header>
  );
};
