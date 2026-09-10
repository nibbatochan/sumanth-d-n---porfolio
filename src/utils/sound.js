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

// Global browser autoplay policy unlocker on first user interaction
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    try {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }
    } catch (e) {
      // Ignore
    }
  };

  const interactionEvents = ['click', 'touchstart', 'touchend', 'keydown', 'pointerdown', 'mousedown'];
  const handleFirstInteraction = () => {
    unlockAudio();
    interactionEvents.forEach(evt => {
      window.removeEventListener(evt, handleFirstInteraction);
    });
  };

  interactionEvents.forEach(evt => {
    window.addEventListener(evt, handleFirstInteraction, { passive: true });
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
// Organic Mellow Wind Swoosh System (Audio buffers + Pink noise fallback)
// ─────────────────────────────────────────────────────────────
const WIND_FILES = [
  '/sounds/wind-swoosh-1.mp3', // Air woosh
  '/sounds/wind-swoosh-2.mp3', // Tunnel reverb woosh
  '/sounds/wind-swoosh-3.mp3', // Ghostly passing woosh
  '/sounds/wind-swoosh-4.mp3', // Swirling woosh
  '/sounds/wind-swoosh-5.mp3', // Fast whoosh transition
];

const windBuffers = [];
let hasInitiatedWindPreload = false;

export async function preloadWindSounds() {
  if (typeof window === 'undefined' || hasInitiatedWindPreload) return;
  hasInitiatedWindPreload = true;
  const ctx = getAudioContext();
  if (!ctx) return;

  for (let i = 0; i < WIND_FILES.length; i++) {
    try {
      const res = await fetch(WIND_FILES[i]);
      if (res.ok) {
        const arrayBuf = await res.arrayBuffer();
        ctx.decodeAudioData(arrayBuf, (decoded) => {
          windBuffers[i] = decoded;
        }, () => {});
      }
    } catch (err) {
      // Ignore network errors
    }
  }
}

function synthesizeMellowWind(ctx, variant = 'soft', volume = 0.12) {
  const now = ctx.currentTime;
  const sampleRate = ctx.sampleRate;
  const duration = variant === 'depth' ? 0.85 : variant === 'focus' ? 0.65 : 0.40;
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
  filter.Q.setValueAtTime(1.2, now);

  const startFreq = variant === 'depth' ? 180 : 240;
  const peakFreq = variant === 'fling' ? 580 : variant === 'focus' ? 460 : 360;

  filter.frequency.setValueAtTime(startFreq, now);
  filter.frequency.linearRampToValueAtTime(peakFreq, now + duration * 0.35);
  filter.frequency.exponentialRampToValueAtTime(140, now + duration);

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
 * Plays very mellow, organic wind swooshes at a subtle, low volume.
 * Zero electronic tones or beeps.
 * @param {'fling' | 'depth' | 'focus' | 'soft' | 'random'} variant
 * @param {{ volume?: number, soundEnabled?: boolean }} options
 */
export const playWindSwoosh = (variant = 'random', options = {}) => {
  const enabled = options.soundEnabled !== undefined ? options.soundEnabled : true;
  if (!enabled) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    if (!hasInitiatedWindPreload) {
      preloadWindSounds();
    }

    let index = 0;
    if (variant === 'fling') {
      // Light, fast airy swooshes (1 or 5)
      index = Math.random() > 0.5 ? 0 : 4;
    } else if (variant === 'depth') {
      // Atmospheric swirling wind from the tunnel (2 or 3)
      index = Math.random() > 0.5 ? 1 : 3;
    } else if (variant === 'focus') {
      // Resonant soft air glide
      index = 1;
    } else if (variant === 'soft') {
      // Very gentle whisper breeze
      index = 0;
    } else {
      index = Math.floor(Math.random() * WIND_FILES.length);
    }

    const baseVol = options.volume !== undefined ? options.volume : 0.12;
    const now = ctx.currentTime;

    const buffer = windBuffers[index];
    if (buffer) {
      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Subtle organic pitch variation (±6%)
      source.playbackRate.value = 0.94 + Math.random() * 0.12;

      // Low-pass filter to keep sound warm, soft and mellow
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(baseVol, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + Math.min(buffer.duration, 1.8));

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      source.start(now);
      source.stop(now + 1.85);
    } else {
      synthesizeMellowWind(ctx, variant, baseVol);
    }
  } catch (e) {
    // Fail silently
  }
};
