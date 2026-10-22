import { useEffect, useRef, useState } from 'react';

type AudioNodes = {
  context: AudioContext;
  gain: GainNode;
};

export function useSoundscape() {
  const [enabled, setEnabled] = useState(false);
  const nodes = useRef<AudioNodes | null>(null);

  const stop = () => {
    const current = nodes.current;
    if (!current) return;
    const now = current.context.currentTime;
    current.gain.gain.cancelScheduledValues(now);
    current.gain.gain.setValueAtTime(current.gain.gain.value, now);
    current.gain.gain.linearRampToValueAtTime(0, now + 0.25);
    window.setTimeout(() => void current.context.close(), 300);
    nodes.current = null;
  };

  const start = async () => {
    const AudioContextClass = window.AudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    const low = context.createOscillator();
    const harmonic = context.createOscillator();
    const harmonicGain = context.createGain();

    low.type = 'sine';
    low.frequency.value = 46;
    harmonic.type = 'triangle';
    harmonic.frequency.value = 92;
    harmonicGain.gain.value = 0.16;
    filter.type = 'lowpass';
    filter.frequency.value = 220;
    filter.Q.value = 0.8;
    gain.gain.value = 0;

    low.connect(filter);
    harmonic.connect(harmonicGain).connect(filter);
    filter.connect(gain).connect(context.destination);
    low.start();
    harmonic.start();
    await context.resume();
    gain.gain.linearRampToValueAtTime(0.055, context.currentTime + 0.7);
    nodes.current = { context, gain };
  };

  const toggle = () => {
    if (enabled) {
      stop();
      setEnabled(false);
    } else {
      void start().then(() => setEnabled(true)).catch(() => setEnabled(false));
    }
  };

  useEffect(() => {
    const onVisibility = () => {
      const context = nodes.current?.context;
      if (!context) return;
      if (document.hidden) void context.suspend();
      else void context.resume();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      stop();
    };
  }, []);

  return { enabled, toggle };
}
