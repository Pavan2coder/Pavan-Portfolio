"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  beep: (freq?: number, dur?: number, type?: OscillatorType) => void;
};

export const SoundContext = createContext<SoundContextValue>({
  enabled: false,
  toggle: () => {},
  beep: () => {},
});

export function useSound() {
  return useContext(SoundContext);
}

export function useSoundProvider(): SoundContextValue {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (enabled && !ctxRef.current) {
      const AudioCtx =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new AudioCtx();
    }
  }, [enabled]);

  const toggle = useCallback(() => setEnabled((v) => !v), []);

  const beep = useCallback(
    (freq = 540, dur = 0.08, type: OscillatorType = "sine") => {
      if (!enabled || !ctxRef.current) return;
      const ctx = ctxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = 0.0001;
      osc.connect(gain).connect(ctx.destination);
      const now = ctx.currentTime;
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc.start(now);
      osc.stop(now + dur + 0.02);
    },
    [enabled]
  );

  return { enabled, toggle, beep };
}
