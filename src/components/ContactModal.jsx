import React, { useState, useEffect } from 'react';
import { 
  X, 
  PaperPlaneTilt, 
  EnvelopeSimple, 
  PhoneCall, 
  Copy, 
  Check, 
  ChatCircleDots, 
  MapPin 
} from '@phosphor-icons/react';
import confetti from 'canvas-confetti';
import { designerProfile } from '../data/portfolioData';
import { playSound } from '../utils/sound';

export const ContactModal = ({ isOpen, onClose, soundEnabled }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState('UI/UX Project Collaboration');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(designerProfile.email);
    setCopiedEmail(true);
    playSound('success', soundEnabled);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(designerProfile.phone);
    setCopiedPhone(true);
    playSound('success', soundEnabled);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    playSound('success', soundEnabled);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-4xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 relative space-y-6 text-zinc-900 dark:text-white"
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono text-orange-600 dark:text-orange-400 font-bold uppercase flex items-center gap-1.5">
              <ChatCircleDots size={15} weight="fill" />
              <span>Get In Touch</span>
            </span>
            <h3 id="contact-modal-title" className="text-2xl font-bold font-sans text-zinc-900 dark:text-white mt-1">
              Let’s Work Together
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1">
              <MapPin size={13} weight="bold" />
              <span>{designerProfile.location} • Available for roles</span>
            </p>
          </div>
          <button
            onClick={() => {
              playSound('click', soundEnabled);
              onClose();
            }}
            aria-label="Close contact dialog"
            className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center tactile-btn border border-zinc-200 dark:border-zinc-700"
          >
            <X size={17} weight="bold" />
          </button>
        </div>

        {/* Quick Contact Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            onClick={handleCopyEmail}
            className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 text-left flex items-center justify-between group hover:border-orange-500/50 transition-colors"
          >
            <div className="flex items-center gap-2.5 truncate">
              <EnvelopeSimple size={18} className="text-orange-500 shrink-0" />
              <div className="truncate">
                <p className="text-[10px] text-zinc-400 uppercase font-mono">Email</p>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">{designerProfile.email}</p>
              </div>
            </div>
            {copiedEmail ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} className="text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-white" />}
          </button>

          <button
            onClick={handleCopyPhone}
            className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 text-left flex items-center justify-between group hover:border-orange-500/50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <PhoneCall size={18} className="text-emerald-500 shrink-0" />
              <div>
                <p className="text-[10px] text-zinc-400 uppercase font-mono">Phone</p>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{designerProfile.phone}</p>
              </div>
            </div>
            {copiedPhone ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} className="text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-white" />}
          </button>
        </div>

        {/* Direct Form */}
        <form onSubmit={handleSendMessage} className="space-y-4 pt-2">
          <div>
            <label htmlFor="contact-email" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Your Email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. hiring@company.com"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="contact-subject" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Subject
            </label>
            <select
              id="contact-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
            >
              <option value="UI/UX Project Collaboration">UI/UX Project Collaboration</option>
              <option value="Full-time Role Opportunity">Full-time Role Opportunity</option>
              <option value="Brand Identity / Graphic Design">Brand Identity / Graphic Design</option>
              <option value="General Inquiry / Coffee Chat">General Inquiry / Coffee Chat</option>
            </select>
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project, timeline, or team..."
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-orange-500 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs sm:text-sm shadow-md hover:bg-black dark:hover:bg-zinc-100 flex items-center justify-center gap-2 tactile-btn transition-all"
          >
            {sent ? (
              <>
                <Check size={16} weight="bold" className="text-emerald-500" />
                <span>Message Received!</span>
              </>
            ) : (
              <>
                <PaperPlaneTilt size={16} weight="bold" className="text-orange-400 dark:text-orange-600" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
