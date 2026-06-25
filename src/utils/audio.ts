// Web Audio API Synthesizer for Physics Rally
// Creates custom 8-bit retro sounds and background music loops dynamically!

let audioCtx: AudioContext | null = null;
let bgmInterval: number | null = null;
let bgmNodes: AudioNode[] = [];
let isMuted = false;

// Initialize Audio Context lazily to satisfy browser autoplay policies
function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const setMutedState = (muted: boolean) => {
  isMuted = muted;
  if (muted) {
    stopBGM();
  } else {
    // Resume context if needed
    getAudioContext();
  }
};

export const getMutedState = () => {
  return isMuted;
};

// Play a short retro click sound
export function playClickSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.08);
}

// Play a sparkling sound for unlocking a car
export function playUnlockSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.08);

    gain.gain.setValueAtTime(0.1, now + idx * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.2);

    osc.start(now + idx * 0.08);
    osc.stop(now + idx * 0.08 + 0.2);
  });
}

// Play a cheerful ascending sound for correct answers
export function playCorrectSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [329.63, 440.00, 523.25, 659.25]; // E4, A4, C5, E5 (ascending chord)

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.07);

    gain.gain.setValueAtTime(0.12, now + idx * 0.07);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);

    osc.start(now + idx * 0.07);
    osc.stop(now + idx * 0.07 + 0.25);
  });
}

// Play a buzzing descending sound for wrong answers
export function playWrongSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.linearRampToValueAtTime(80, now + 0.35);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.linearRampToValueAtTime(0.001, now + 0.35);

  osc.start(now);
  osc.stop(now + 0.35);
}

// Play a celebratory grand fanfare for level victory
export function playVictorySound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // C major arpeggio followed by high sustain chord
  const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; 

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = idx === notes.length - 1 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.08);

    const dur = idx === notes.length - 1 ? 1.0 : 0.4;
    gain.gain.setValueAtTime(0.1, now + idx * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + dur);

    osc.start(now + idx * 0.08);
    osc.stop(now + idx * 0.08 + dur);
  });
}

// Energetic synthesized 8-bit rally theme background music
export function startBGM() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Stop any currently playing BGM first
  stopBGM();

  // Simple step sequencer sequence: Bassline & simple arpeggio
  // 130 BPM -> ~230ms per step
  const stepTime = 0.23;
  let step = 0;

  // C Pentatonic theme progression
  // Notes: C3, D3, E3, G3, A3, C4
  const bassline = [130.81, 130.81, 164.81, 196.00, 220.00, 220.00, 196.00, 164.81];
  const treble = [
    523.25, 0, 587.33, 659.25, 
    0, 783.99, 880.00, 1046.50,
    783.99, 659.25, 0, 587.33,
    659.25, 523.25, 392.00, 0
  ];

  bgmInterval = window.setInterval(() => {
    const now = ctx.currentTime;

    // 1. Play Bass Note (every second step)
    if (step % 2 === 0) {
      const bassFreq = bassline[(step / 2) % bassline.length];
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();

      bassOsc.connect(bassGain);
      bassGain.connect(ctx.destination);

      bassOsc.type = 'triangle';
      bassOsc.frequency.setValueAtTime(bassFreq, now);

      bassGain.gain.setValueAtTime(0.06, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + stepTime * 1.8);

      bassOsc.start(now);
      bassOsc.stop(now + stepTime * 1.8);

      // Save references to cleanup later if needed
      bgmNodes.push(bassOsc);
      bgmNodes.push(bassGain);
    }

    // 2. Play Treble Note (occasional melody)
    const trebleFreq = treble[step % treble.length];
    if (trebleFreq > 0 && Math.random() > 0.3) {
      const melOsc = ctx.createOscillator();
      const melGain = ctx.createGain();

      melOsc.connect(melGain);
      melGain.connect(ctx.destination);

      melOsc.type = 'sine';
      melOsc.frequency.setValueAtTime(trebleFreq, now);

      melGain.gain.setValueAtTime(0.03, now);
      melGain.gain.exponentialRampToValueAtTime(0.001, now + stepTime * 0.9);

      melOsc.start(now);
      melOsc.stop(now + stepTime * 0.9);

      bgmNodes.push(melOsc);
      bgmNodes.push(melGain);
    }

    // Limit active nodes array size to avoid memory accumulation
    if (bgmNodes.length > 50) {
      bgmNodes = bgmNodes.slice(bgmNodes.length - 20);
    }

    step++;
  }, stepTime * 1000);
}

export function stopBGM() {
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
  // Disconnect any active synth sounds
  bgmNodes.forEach((node) => {
    try {
      (node as any).disconnect();
    } catch (e) {}
  });
  bgmNodes = [];
}
