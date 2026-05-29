"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  beep: (freq?: number, dur?: number, type?: OscillatorType) => void;
  playHover: () => void;
  playClick: () => void;
  playSuccess: () => void;
  playStartup: () => void;
  playAmbient: () => void;
  stopAmbient: () => void;
  playBootSequence: () => void;
  playNodeClick: () => void;
  playNeuralPulse: () => void;
  playSectionTransition: () => void;
  playHolographicScan: () => void;
  playEnergyPulse: () => void;
  playUIActivate: () => void;
  playGlitchStatic: () => void;
  playTerminalWarning: () => void;
};

export const SoundContext = createContext<SoundContextValue>({
  enabled: false,
  toggle: () => {},
  beep: () => {},
  playHover: () => {},
  playClick: () => {},
  playSuccess: () => {},
  playStartup: () => {},
  playAmbient: () => {},
  stopAmbient: () => {},
  playBootSequence: () => {},
  playNodeClick: () => {},
  playNeuralPulse: () => {},
  playSectionTransition: () => {},
  playHolographicScan: () => {},
  playEnergyPulse: () => {},
  playUIActivate: () => {},
  playGlitchStatic: () => {},
  playTerminalWarning: () => {},
});

export function useSound() {
  return useContext(SoundContext);
}

export function useSoundProvider(): SoundContextValue {
  const [enabled, setEnabled] = useState(true); // Auto-enable sound
  const ctxRef = useRef<AudioContext | null>(null);
  const ambientOscRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (enabled && !ctxRef.current) {
      const AudioCtx =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new AudioCtx();
      
      // Resume audio context on first user interaction
      const resumeAudio = () => {
        if (ctxRef.current && ctxRef.current.state === 'suspended') {
          ctxRef.current.resume();
        }
      };
      document.addEventListener('click', resumeAudio, { once: true });
      document.addEventListener('touchstart', resumeAudio, { once: true });
    }
  }, [enabled]);

  const toggle = useCallback(() => {
    setEnabled((v) => {
      if (v) {
        // Stopping - stop ambient
        if (ambientOscRef.current) {
          ambientOscRef.current.stop();
          ambientOscRef.current = null;
        }
      }
      return !v;
    });
  }, []);

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
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc.start(now);
      osc.stop(now + dur + 0.02);
    },
    [enabled]
  );

  // UI Hover - Soft holographic tick
  const playHover = useCallback(() => {
    beep(1200, 0.04, "sine");
  }, [beep]);

  // UI Click - Holographic activation
  const playClick = useCallback(() => {
    if (!enabled || !ctxRef.current) return;
    beep(1400, 0.06, "sine");
    setTimeout(() => beep(1600, 0.04, "sine"), 40);
  }, [enabled, beep]);

  // Success - 3-tone chime
  const playSuccess = useCallback(() => {
    if (!enabled || !ctxRef.current) return;
    beep(800, 0.1, "sine");
    setTimeout(() => beep(1000, 0.1, "sine"), 80);
    setTimeout(() => beep(1200, 0.15, "sine"), 160);
  }, [enabled, beep]);

  // Startup - AI initialization sequence
  const playStartup = useCallback(() => {
    if (!enabled || !ctxRef.current) return;
    beep(300, 0.2, "sine");
    setTimeout(() => beep(500, 0.2, "sine"), 150);
    setTimeout(() => beep(700, 0.25, "sine"), 300);
    setTimeout(() => beep(900, 0.3, "sine"), 450);
  }, [enabled, beep]);

  // Boot Sequence - Full JARVIS activation
  const playBootSequence = useCallback(() => {
    if (!enabled || !ctxRef.current) return;
    const ctx = ctxRef.current;
    
    // Deep startup hum
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.value = 80;
    gain1.gain.value = 0;
    osc1.connect(gain1).connect(ctx.destination);
    const now = ctx.currentTime;
    gain1.gain.linearRampToValueAtTime(0.03, now + 0.5);
    gain1.gain.linearRampToValueAtTime(0, now + 2);
    osc1.start(now);
    osc1.stop(now + 2);

    // Scanner sweeps
    setTimeout(() => beep(600, 0.15, "triangle"), 300);
    setTimeout(() => beep(800, 0.15, "triangle"), 500);
    setTimeout(() => beep(1000, 0.15, "triangle"), 700);
    
    // Activation pulse
    setTimeout(() => {
      beep(1200, 0.2, "sine");
      setTimeout(() => beep(1400, 0.15, "sine"), 100);
    }, 1000);
  }, [enabled, beep]);

  // Node Click - Neural activation
  const playNodeClick = useCallback(() => {
    if (!enabled || !ctxRef.current) return;
    beep(1000, 0.08, "sine");
    setTimeout(() => beep(1300, 0.06, "sine"), 50);
  }, [enabled, beep]);

  // Neural Pulse - Energy transmission
  const playNeuralPulse = useCallback(() => {
    if (!enabled || !ctxRef.current) return;
    const ctx = ctxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 400;
    gain.gain.value = 0;
    osc.connect(gain).connect(ctx.destination);
    const now = ctx.currentTime;
    
    // Pulse effect
    gain.gain.linearRampToValueAtTime(0.04, now + 0.02);
    gain.gain.linearRampToValueAtTime(0, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);
    
    osc.start(now);
    osc.stop(now + 0.15);
  }, [enabled]);

  // Section Transition - Cinematic sweep
  const playSectionTransition = useCallback(() => {
    if (!enabled || !ctxRef.current) return;
    const ctx = ctxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 200;
    gain.gain.value = 0;
    osc.connect(gain).connect(ctx.destination);
    const now = ctx.currentTime;
    
    gain.gain.linearRampToValueAtTime(0.02, now + 0.1);
    gain.gain.linearRampToValueAtTime(0, now + 0.6);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.6);
    
    osc.start(now);
    osc.stop(now + 0.6);
  }, [enabled]);

  // Holographic Scan - Radar sweep
  const playHolographicScan = useCallback(() => {
    if (!enabled || !ctxRef.current) return;
    beep(900, 0.12, "triangle");
    setTimeout(() => beep(1100, 0.1, "triangle"), 80);
  }, [enabled, beep]);

  // Energy Pulse - Power surge
  const playEnergyPulse = useCallback(() => {
    if (!enabled || !ctxRef.current) return;
    const ctx = ctxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.value = 100;
    gain.gain.value = 0;
    osc.connect(gain).connect(ctx.destination);
    const now = ctx.currentTime;
    
    gain.gain.linearRampToValueAtTime(0.015, now + 0.05);
    gain.gain.linearRampToValueAtTime(0, now + 0.25);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.25);
    
    osc.start(now);
    osc.stop(now + 0.25);
  }, [enabled]);

  // UI Activate - System activation
  const playUIActivate = useCallback(() => {
    if (!enabled || !ctxRef.current) return;
    beep(700, 0.1, "sine");
    setTimeout(() => beep(1000, 0.08, "sine"), 60);
    setTimeout(() => beep(1300, 0.06, "sine"), 120);
  }, [enabled, beep]);

  // Ambient - Deep neural machine hum
  const playAmbient = useCallback(() => {
    if (!enabled || !ctxRef.current || ambientOscRef.current) return;
    const ctx = ctxRef.current;
    
    // Low frequency hum
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.value = 55;
    gain1.gain.value = 0;
    osc1.connect(gain1).connect(ctx.destination);
    
    // Mid frequency layer
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.value = 110;
    gain2.gain.value = 0;
    osc2.connect(gain2).connect(ctx.destination);
    
    const now = ctx.currentTime;
    gain1.gain.linearRampToValueAtTime(0.012, now + 3);
    gain2.gain.linearRampToValueAtTime(0.008, now + 3);
    
    osc1.start(now);
    osc2.start(now);
    
    ambientOscRef.current = osc1;
    ambientGainRef.current = gain1;
    
    // Store second oscillator for cleanup
    (osc1 as any)._osc2 = osc2;
    (osc1 as any)._gain2 = gain2;
  }, [enabled]);

  const stopAmbient = useCallback(() => {
    if (!ambientOscRef.current || !ambientGainRef.current || !ctxRef.current) return;
    const ctx = ctxRef.current;
    const now = ctx.currentTime;
    
    ambientGainRef.current.gain.linearRampToValueAtTime(0, now + 2);
    
    const osc2 = (ambientOscRef.current as any)._osc2;
    const gain2 = (ambientOscRef.current as any)._gain2;
    if (gain2) {
      gain2.gain.linearRampToValueAtTime(0, now + 2);
    }
    
    setTimeout(() => {
      if (ambientOscRef.current) {
        ambientOscRef.current.stop();
        if (osc2) osc2.stop();
        ambientOscRef.current = null;
      }
    }, 2000);
  }, []);

  // Glitch Static - Digital interference
  const playGlitchStatic = useCallback(() => {
    if (!enabled || !ctxRef.current) return;
    const ctx = ctxRef.current;
    
    // Create white noise
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1500;
    filter.Q.value = 0.5;
    
    const gain = ctx.createGain();
    gain.gain.value = 0;
    
    noise.connect(filter).connect(gain).connect(ctx.destination);
    
    const now = ctx.currentTime;
    gain.gain.linearRampToValueAtTime(0.04, now + 0.01);
    gain.gain.linearRampToValueAtTime(0, now + 0.15);
    
    noise.start(now);
    noise.stop(now + 0.15);
  }, [enabled]);

  // Terminal Warning - Alert beep
  const playTerminalWarning = useCallback(() => {
    if (!enabled || !ctxRef.current) return;
    const ctx = ctxRef.current;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "square";
    osc.frequency.value = 880;
    gain.gain.value = 0;
    
    osc.connect(gain).connect(ctx.destination);
    
    const now = ctx.currentTime;
    gain.gain.linearRampToValueAtTime(0.06, now + 0.01);
    gain.gain.linearRampToValueAtTime(0, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.12);
    
    osc.start(now);
    osc.stop(now + 0.12);
  }, [enabled]);

  return {
    enabled,
    toggle,
    beep,
    playHover,
    playClick,
    playSuccess,
    playStartup,
    playAmbient,
    stopAmbient,
    playBootSequence,
    playNodeClick,
    playNeuralPulse,
    playSectionTransition,
    playHolographicScan,
    playEnergyPulse,
    playUIActivate,
    playGlitchStatic,
    playTerminalWarning,
  };
}
