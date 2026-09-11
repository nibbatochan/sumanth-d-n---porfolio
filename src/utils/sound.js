// Web Audio API Synthesizer with Resilient Browser Autoplay Unlocking & Tactile Sound Design
let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

// Global browser autoplay policy unlocker on first user gesture
let isAudioUnlocked = false;

export function unlockAudio() {
  if (typeof window === 'undefined') return;
  try {
    const ctx = getAudioContext();
    if (ctx) {
      if (ctx.state === 'suspended') {
        ctx.resume().then(() => {
          isAudioUnlocked = true;
        }).catch(() => {});
      } else if (ctx.state === 'running') {
        isAudioUnlocked = true;
      }
    }
  } catch (e) {
    // Ignore
  }
}

if (typeof window !== 'undefined') {
  const interactionEvents = [
    'pointerdown', 
    'pointerup', 
    'pointermove', 
    'click', 
    'touchstart', 
    'touchend', 
    'keydown', 
    'mousedown', 
    'wheel'
  ];

  const handleFirstInteraction = () => {
    unlockAudio();
    if (!hasInitiatedWindPreload) {
      preloadWindSounds();
    }
    interactionEvents.forEach(evt => {
      window.removeEventListener(evt, handleFirstInteraction, { capture: true });
    });
  };

  interactionEvents.forEach(evt => {
    window.addEventListener(evt, handleFirstInteraction, { capture: true, passive: true });
  });
}

function synthesizeSound(ctx, type) {
  const now = ctx.currentTime;

  if (type === 'click' || type === 'tap') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.04);
    gain.gain.setValueAtTime(0.20, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.start(now);
    osc.stop(now + 0.045);
  } 
  else if (type === 'pop') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(360, now);
    osc.frequency.exponentialRampToValueAtTime(740, now + 0.06);
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.start(now);
    osc.stop(now + 0.065);
  } 
  else if (type === 'hover') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(720, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.03);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    osc.start(now);
    osc.stop(now + 0.035);
  }
  else if (type === 'toggle') {
    // 2-tone melodic switch
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(440, now);
    gain1.gain.setValueAtTime(0.18, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc1.start(now);
    osc1.stop(now + 0.045);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(660, now + 0.04);
    gain2.gain.setValueAtTime(0.18, now + 0.04);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc2.start(now + 0.04);
    osc2.stop(now + 0.095);
  }
  else if (type === 'whoosh') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.14);
    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc.start(now);
    osc.stop(now + 0.145);
  }
  else if (type === 'type') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(550 + Math.random() * 250, now);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
    osc.start(now);
    osc.stop(now + 0.03);
  }
  else if (type === 'success') {
    // 4-tone ascending celebratory arpeggio
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.05);
      gain.gain.setValueAtTime(0.14, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.22);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.23);
    });
  }
  else if (type === 'laser') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.08);
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.start(now);
    osc.stop(now + 0.085);
  }
  else if (type === 'warp') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(880, now + 0.18);
    osc.frequency.linearRampToValueAtTime(440, now + 0.36);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.36);
    osc.start(now);
    osc.stop(now + 0.365);
  }
}

export const playSound = (type = 'click', enabled = true) => {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        try {
          synthesizeSound(ctx, type);
        } catch (err) {
          // Ignore
        }
      }).catch(() => {});
    } else {
      synthesizeSound(ctx, type);
    }
  } catch (e) {
    // Fail silently if blocked by browser policy
  }
};

// ─────────────────────────────────────────────────────────────
// Organic Mellow Wind Swoosh & Tactile Air Drag System
// ─────────────────────────────────────────────────────────────
const WIND_FILES = [
  '/sounds/wind-swoosh-1.mp3', // Air woosh
  '/sounds/wind-swoosh-2.mp3', // Tunnel reverb woosh
  '/sounds/wind-swoosh-3.mp3', // Ghostly passing woosh
  '/sounds/wind-swoosh-4.mp3', // Swirling woosh
  '/sounds/wind-swoosh-5.mp3', // Fast whoosh transition
];

const USER_DRAG_FILES = [
  '/sounds/user-drag-1.mp3',   // Soft tactile air drag start/slip
  '/sounds/user-drag-2.mp3',   // Subtle textured swoosh glide
  '/sounds/user-drag-3.wav',   // Smooth organic air pull / suction
];

const windBuffers = [];
const userDragBuffers = [];
const arrayBufferCache = new Map();
let hasInitiatedWindPreload = false;

// Immediate background fetch of raw audio files into memory cache so they're instantly available
if (typeof window !== 'undefined') {
  [...WIND_FILES, ...USER_DRAG_FILES].forEach(url => {
    fetch(url)
      .then(res => res.ok ? res.arrayBuffer() : null)
      .then(buf => {
        if (buf) arrayBufferCache.set(url, buf);
      })
      .catch(() => {});
  });
}

export async function preloadWindSounds() {
  if (typeof window === 'undefined') return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (hasInitiatedWindPreload && windBuffers.length > 0) return;
  hasInitiatedWindPreload = true;

  const loadFile = async (url, bufferArray, idx) => {
    try {
      let arrayBuf = arrayBufferCache.get(url);
      if (!arrayBuf) {
        const res = await fetch(url);
        if (res.ok) {
          arrayBuf = await res.arrayBuffer();
          arrayBufferCache.set(url, arrayBuf);
        }
      }
      if (arrayBuf) {
        // Slice the buffer because decodeAudioData detaches the ArrayBuffer
        const decoded = await ctx.decodeAudioData(arrayBuf.slice(0));
        bufferArray[idx] = decoded;
      }
    } catch (err) {
      // Ignore decoding errors
    }
  };

  await Promise.all([
    ...WIND_FILES.map((url, i) => loadFile(url, windBuffers, i)),
    ...USER_DRAG_FILES.map((url, i) => loadFile(url, userDragBuffers, i))
  ]);
}

function synthesizeMellowWind(ctx, variant = 'soft', volume = 0.28) {
  const now = ctx.currentTime;
  const sampleRate = ctx.sampleRate;
  const duration = variant === 'depth' ? 0.95 : variant === 'focus' ? 0.75 : 0.50;
  const bufferSize = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
  const output = buffer.getChannelData(0);

  // Generate pink/brownian noise for pure organic air displacement
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99 * b0 + white * 0.05;
    b1 = 0.95 * b1 + white * 0.05;
    b2 = 0.85 * b2 + white * 0.05;
    output[i] = (b0 + b1 + b2) * 0.8;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.Q.setValueAtTime(1.0, now);

  const startFreq = variant === 'depth' ? 260 : 350;
  const peakFreq = variant === 'fling' ? 820 : variant === 'focus' ? 680 : 520;

  filter.frequency.setValueAtTime(startFreq, now);
  filter.frequency.linearRampToValueAtTime(peakFreq, now + duration * 0.35);
  filter.frequency.exponentialRampToValueAtTime(180, now + duration);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(volume, now + duration * 0.25);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  whiteNoise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  whiteNoise.start(now);
  whiteNoise.stop(now + duration + 0.05);
}

/**
 * Plays very mellow, organic wind swooshes at an audible yet smooth volume.
 * Zero electronic tones or beeps.
 * @param {'fling' | 'depth' | 'focus' | 'soft' | 'drag-start' | 'drag-move' | 'drag-center' | 'cruise-arrive' | 'random'} variant
 * @param {{ volume?: number, soundEnabled?: boolean }} options
 */
export const playWindSwoosh = (variant = 'random', options = {}) => {
  const enabled = options.soundEnabled !== undefined ? options.soundEnabled : true;
  if (!enabled) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const play = () => {
      let buffer = null;
      let filterCutoff = 2400;
      let playbackRate = 0.94 + Math.random() * 0.12;
      let durationCap = 2.2;
      // Default volume with +10% boost across the board
      let defaultVol = 0.38;

      if (variant === 'drag-start') {
        // Subtle tactile grab sound from uploaded tracks
        buffer = userDragBuffers[0] || windBuffers[0];
        defaultVol = 0.24;
        filterCutoff = 2600;
        durationCap = 0.8;
      } else if (variant === 'drag-move') {
        // Gentle airy rustle while moving towards center
        buffer = userDragBuffers[1] || windBuffers[4];
        defaultVol = 0.22;
        filterCutoff = 2200;
        durationCap = 0.9;
      } else if (variant === 'drag-center') {
        // Mellow air pull / lock into center drop zone
        buffer = userDragBuffers[2] || userDragBuffers[1] || windBuffers[1];
        defaultVol = 0.28;
        filterCutoff = 2000;
        durationCap = 1.6;
      } else if (variant === 'cruise-arrive') {
        // Soft mellow arrival breeze when cruise advances a new card to front
        buffer = userDragBuffers[2] || windBuffers[1];
        defaultVol = 0.26;
        playbackRate = 0.88 + Math.random() * 0.08; // slightly deeper pitch for arrival
        filterCutoff = 1900;
        durationCap = 1.8;
      } else if (variant === 'fling') {
        // Fast airy swoosh
        buffer = Math.random() > 0.5 ? windBuffers[0] : windBuffers[4];
        defaultVol = 0.39;
        filterCutoff = 2500;
      } else if (variant === 'depth') {
        // Tunnel reverberant swoosh
        buffer = Math.random() > 0.5 ? windBuffers[1] : windBuffers[3];
        defaultVol = 0.35;
        filterCutoff = 2200;
      } else if (variant === 'focus') {
        // Resonant soft air glide for center view
        buffer = userDragBuffers[2] || windBuffers[1];
        defaultVol = 0.39;
        filterCutoff = 2300;
      } else if (variant === 'soft') {
        // Delicate whisper breeze
        buffer = userDragBuffers[0] || windBuffers[0];
        defaultVol = 0.28;
        filterCutoff = 2100;
      } else {
        const pool = [...windBuffers, ...userDragBuffers].filter(Boolean);
        buffer = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : null;
        defaultVol = 0.35;
      }

      // Allow caller to override volume (scaled by 1.1x for +10% boost)
      const baseVol = (options.volume !== undefined ? options.volume * 1.1 : defaultVol);
      const now = ctx.currentTime;

      if (buffer) {
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.playbackRate.value = playbackRate;

        // Low-pass filter to keep sound warm, soft and mellow
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(filterCutoff, now);

        const playDuration = Math.min(buffer.duration, durationCap);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(baseVol, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + playDuration);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        source.start(now);
        source.stop(now + playDuration + 0.05);
      } else {
        synthesizeMellowWind(ctx, variant, baseVol);
      }
    };

    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        try { play(); } catch (e) {}
      }).catch(() => {});
    } else {
      play();
    }

    if (!hasInitiatedWindPreload) {
      preloadWindSounds();
    }
  } catch (e) {
    // Fail silently
  }
};
