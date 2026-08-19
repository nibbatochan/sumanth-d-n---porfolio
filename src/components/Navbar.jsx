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
  Moon,
  List,
  X
} from '@phosphor-icons/react';
import { SumanthLogo } from './SumanthLogo';
import { playSound } from '../utils/sound';

export const Navbar = ({ soundEnabled, setSoundEnabled, onOpenContact, isDarkMode, setIsDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    playSound('pop', soundEnabled);
  };

  const handleNavClick = (anchor) => {
    setMobileMenuOpen(false);
    playSound('pop', soundEnabled);
    const el = document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 py-3 sm:py-4 ${scrolled ? 'pt-2.5 sm:pt-3' : 'pt-3 sm:pt-4'}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        
        {/* Authentic Signature Logo + Sumanth Reddy Name */}
        <a 
          href="#home"
          onClick={() => playSound('click', soundEnabled)}
          aria-label="Sumanth Reddy Portfolio Home"
          className="flex items-center gap-2.5 group focus:outline-none select-none shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center p-1 sm:p-1.5 group-hover:scale-105 group-hover:border-orange-500 transition-all">
            <SumanthLogo className="w-6 h-6 sm:w-7 sm:h-7" isDarkMode={isDarkMode} />
          </div>
          <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white tracking-tight font-sans">
            Sumanth Reddy
          </p>
        </a>

        {/* Desktop Center Pill Navigation */}
        <nav aria-label="Main navigation" className="hidden md:flex bg-white/95 dark:bg-zinc-900/95 border border-zinc-200 dark:border-zinc-800 px-5 py-2 rounded-full shadow-sm backdrop-blur-md items-center gap-3 text-xs font-bold text-zinc-800 dark:text-zinc-200">
          <a 
            href="#work" 
            onClick={() => playSound('pop', soundEnabled)}
            className="px-3 py-1.5 rounded-full hover:text-orange-600 dark:hover:text-orange-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
          >
            <FolderSimple size={14} weight="bold" />
            <span>Work</span>
          </a>
          <a 
            href="#about" 
            onClick={() => playSound('pop', soundEnabled)}
            className="px-3 py-1.5 rounded-full hover:text-orange-600 dark:hover:text-orange-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
          >
            <User size={14} weight="bold" />
            <span>About</span>
          </a>
          <a 
            href="#tools" 
            onClick={() => playSound('pop', soundEnabled)}
            className="px-3 py-1.5 rounded-full hover:text-orange-600 dark:hover:text-orange-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
          >
            <Wrench size={14} weight="bold" />
            <span>Tools</span>
          </a>
        </nav>

        {/* Desktop Right Controls */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          
          {/* Dark / Light Theme Toggle */}
          <button 
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all tactile-btn"
          >
            {isDarkMode ? <Sun size={16} weight="bold" className="text-amber-400" /> : <Moon size={16} weight="bold" className="text-zinc-800" />}
          </button>

          {/* Download Resume Button */}
          <a
            href="/Sumanth_DN_Resume.pdf"
            download="Sumanth_DN_Resume.pdf"
            aria-label="Download Sumanth D N Resume PDF"
            onClick={() => playSound('success', soundEnabled)}
            className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all tactile-btn"
            title="Download Resume PDF"
          >
            <FileText size={15} weight="bold" className="text-orange-600 dark:text-orange-400" />
            <span>Resume</span>
            <DownloadSimple size={13} weight="bold" className="text-zinc-500 dark:text-zinc-400" />
          </a>

          {/* Sound Toggle */}
          <button 
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              playSound('toggle', next);
            }}
            aria-label={soundEnabled ? "Mute interface audio effects" : "Enable interface audio effects"}
            title={soundEnabled ? "Mute audio" : "Enable audio"}
            className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all tactile-btn"
          >
            {soundEnabled ? <SpeakerHigh size={17} weight="bold" className="text-orange-500" /> : <SpeakerSlash size={17} weight="bold" className="text-zinc-400" />}
          </button>

          {/* Contact CTA */}
          <button
            onClick={() => {
              playSound('success', soundEnabled);
              onOpenContact();
            }}
            aria-label="Open contact and project collaboration modal"
            className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-zinc-100 px-5 py-2.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all tactile-btn"
          >
            <span>Let's Connect</span>
            <ArrowUpRight size={13} weight="bold" className="text-orange-400 dark:text-orange-600" />
          </button>
        </div>

        {/* Mobile Right Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button 
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center text-zinc-800 dark:text-zinc-200 tactile-btn"
          >
            {isDarkMode ? <Sun size={15} weight="bold" className="text-amber-400" /> : <Moon size={15} weight="bold" className="text-zinc-800" />}
          </button>

          <button
            onClick={() => {
              const next = !mobileMenuOpen;
              setMobileMenuOpen(next);
              playSound('pop', soundEnabled);
            }}
            aria-label="Toggle navigation menu"
            className="w-9 h-9 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center shadow-sm tactile-btn"
          >
            {mobileMenuOpen ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>

      </div>

      {/* Mobile Animated Dropdown Sheet */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-6xl mx-auto bg-white/95 dark:bg-[#121216]/95 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick('#work')}
              className="w-full px-4 py-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left font-bold text-sm text-zinc-900 dark:text-white flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <FolderSimple size={17} weight="bold" className="text-orange-500" />
                <span>Selected Work</span>
              </span>
              <ArrowUpRight size={14} className="text-zinc-400" />
            </button>
            <button
              onClick={() => handleNavClick('#about')}
              className="w-full px-4 py-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left font-bold text-sm text-zinc-900 dark:text-white flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <User size={17} weight="bold" className="text-orange-500" />
                <span>Work History & About</span>
              </span>
              <ArrowUpRight size={14} className="text-zinc-400" />
            </button>
            <button
              onClick={() => handleNavClick('#tools')}
              className="w-full px-4 py-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left font-bold text-sm text-zinc-900 dark:text-white flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <Wrench size={17} weight="bold" className="text-orange-500" />
                <span>Software Arsenal</span>
              </span>
              <ArrowUpRight size={14} className="text-zinc-400" />
            </button>
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-2 gap-2">
            <a
              href="/Sumanth_DN_Resume.pdf"
              download="Sumanth_DN_Resume.pdf"
              aria-label="Download resume PDF"
              onClick={() => {
                setMobileMenuOpen(false);
                playSound('success', soundEnabled);
              }}
              className="px-3.5 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <FileText size={15} weight="bold" className="text-orange-500" />
              <span>Resume PDF</span>
            </a>

            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                playSound('toggle', next);
              }}
              aria-label={soundEnabled ? "Mute sound effects" : "Enable sound effects"}
              className="px-3.5 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs font-bold flex items-center justify-center gap-1.5"
            >
              {soundEnabled ? <SpeakerHigh size={16} weight="bold" className="text-orange-500" /> : <SpeakerSlash size={16} weight="bold" className="text-zinc-400" />}
              <span>{soundEnabled ? 'Audio: ON' : 'Audio: OFF'}</span>
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              playSound('success', soundEnabled);
              onOpenContact();
            }}
            aria-label="Open contact and project collaboration modal"
            className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black py-3.5 rounded-2xl text-xs font-bold shadow-md flex items-center justify-center gap-2"
          >
            <span>Let's Connect & Collaborate</span>
            <ArrowUpRight size={14} weight="bold" className="text-orange-400 dark:text-orange-600" />
          </button>
        </div>
      )}

    </header>
  );
};
