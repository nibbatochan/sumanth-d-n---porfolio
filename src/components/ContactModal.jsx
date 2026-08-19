import React, { useState } from 'react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-4xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 relative animate-fade-in space-y-6 text-zinc-900 dark:text-white"
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono text-orange-600 dark:text-orange-400 font-bold uppercase flex items-center gap-1.5">
              <ChatCircleDots size={15} weight="fill" />
              <span>Get In Touch</span>
            </span>
            <h3 className="text-2xl font-bold font-sans text-zinc-900 dark:text-white mt-1">Let’s Work Together</h3>
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
            className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center tactile-btn border border-zinc-200 dark:border-zinc-700"
          >
            <X size={17} weight="bold" />
          </button>
        </div>

        <div className="space-y-2.5">
          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <EnvelopeSimple size={18} weight="bold" className="text-orange-500" />
              <span className="text-xs font-mono text-zinc-900 dark:text-white font-semibold">{designerProfile.email}</span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl text-xs font-medium text-zinc-900 dark:text-white flex items-center gap-1 border border-zinc-200 dark:border-zinc-700 tactile-btn"
            >
              {copiedEmail ? <Check size={13} weight="bold" className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={13} weight="bold" className="text-zinc-400" />}
              <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <PhoneCall size={18} weight="bold" className="text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-mono text-zinc-900 dark:text-white font-semibold">{designerProfile.phone} / {designerProfile.secondaryPhone}</span>
            </div>
            <button
              onClick={handleCopyPhone}
              className="px-3 py-1 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl text-xs font-medium text-zinc-900 dark:text-white flex items-center gap-1 border border-zinc-200 dark:border-zinc-700 tactile-btn"
            >
              {copiedPhone ? <Check size={13} weight="bold" className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={13} weight="bold" className="text-zinc-400" />}
              <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {sent ? (
          <div className="p-8 bg-zinc-50 dark:bg-zinc-800 rounded-3xl border border-zinc-200 dark:border-zinc-700 text-center space-y-2">
            <span className="text-3xl">✨</span>
            <h4 className="text-lg font-bold text-zinc-900 dark:text-white">Thank you!</h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-300">Message received. Sumanth will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-zinc-600 dark:text-zinc-300 block mb-1">Your Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-600 dark:text-zinc-300 block mb-1">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-500"
              >
                <option>Full-time UI/UX Designer Opportunity</option>
                <option>UI/UX Product Design Project</option>
                <option>Brand Identity & Graphic Design</option>
                <option>General Inquiry</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-600 dark:text-zinc-300 block mb-1">Message</label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share project details or role description..."
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-zinc-900 dark:bg-white hover:bg-black dark:hover:bg-zinc-100 text-white dark:text-zinc-900 py-3 rounded-2xl text-xs font-bold shadow-sm flex items-center justify-center gap-2 tactile-btn font-sans"
            >
              <span>Send Message</span>
              <PaperPlaneTilt size={15} weight="bold" className="text-orange-400 dark:text-orange-600" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
