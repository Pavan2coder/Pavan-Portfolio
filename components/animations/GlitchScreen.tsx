"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/hooks/useSound";

interface GlitchScreenProps {
  text?: string;
  onComplete?: () => void;
  duration?: number;
}

export function GlitchScreen({ 
  text = "!LE!TS_", 
  onComplete, 
  duration = 4000 
}: GlitchScreenProps) {
  const [visible, setVisible] = useState(true);
  const [glitchText, setGlitchText] = useState(text);
  const [intensity, setIntensity] = useState(0);
  const { playStartup } = useSound();
  const audioContextRef = useRef<AudioContext | null>(null);

  // Glitch sound effects
  const playGlitchSound = () => {
    if (typeof window === "undefined") return;
    
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }

    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Static noise
    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1000 + Math.random() * 2000;
    
    const gain = ctx.createGain();
    gain.gain.value = 0.05;
    
    noise.connect(filter).connect(gain).connect(ctx.destination);
    noise.start();
    noise.stop(ctx.currentTime + 0.1);
  };

  const playWarningBeep = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "square";
    osc.frequency.value = 800;
    gain.gain.value = 0;
    
    osc.connect(gain).connect(ctx.destination);
    
    const now = ctx.currentTime;
    gain.gain.linearRampToValueAtTime(0.08, now + 0.01);
    gain.gain.linearRampToValueAtTime(0, now + 0.15);
    
    osc.start(now);
    osc.stop(now + 0.15);
  };

  // Random glitch characters
  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
  const randomGlitch = () => {
    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
  };

  // Glitch text effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const chars = text.split("");
        const glitched = chars.map((char) => {
          if (Math.random() > 0.8) {
            return randomGlitch();
          }
          return char;
        });
        setGlitchText(glitched.join(""));
        playGlitchSound();
        
        setTimeout(() => setGlitchText(text), 50 + Math.random() * 100);
      }
    }, 150);

    return () => clearInterval(glitchInterval);
  }, [text]);

  // Intensity animation
  useEffect(() => {
    const intensityInterval = setInterval(() => {
      setIntensity(Math.random());
    }, 100);

    return () => clearInterval(intensityInterval);
  }, []);

  // Startup sequence
  useEffect(() => {
    playStartup();
    playWarningBeep();
    
    const beepInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        playWarningBeep();
      }
    }, 500);

    const timer = setTimeout(() => {
      clearInterval(beepInterval);
      setVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(beepInterval);
    };
  }, [duration, onComplete, playStartup]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at center, #0a0000 0%, #000000 100%)",
          }}
        >
          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "0% 100%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #ff0000 2px, #ff0000 4px)",
                backgroundSize: "100% 4px",
              }}
            />
          </div>

          {/* Screen flicker */}
          <motion.div
            animate={{
              opacity: [0, 0.1, 0, 0.15, 0, 0.05, 0],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
            }}
            className="absolute inset-0 bg-red-500 pointer-events-none mix-blend-screen"
          />

          {/* CRT curve effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 0%, transparent 70%, rgba(0,0,0,0.3) 100%)",
            }}
          />

          {/* Main glitch text */}
          <div className="relative">
            {/* RGB split layers */}
            <motion.div
              animate={{
                x: [-2, 2, -1, 3, -2, 0],
                opacity: [0.5, 0.7, 0.4, 0.8, 0.5],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatDelay: 0.1,
              }}
              className="absolute inset-0 text-red-500 mix-blend-screen"
              style={{
                fontSize: "clamp(4rem, 20vw, 16rem)",
                fontFamily: "monospace",
                fontWeight: 900,
                letterSpacing: "0.1em",
                textShadow: "0 0 20px #ff0000, 0 0 40px #ff0000",
                filter: "blur(1px)",
              }}
            >
              {glitchText}
            </motion.div>

            <motion.div
              animate={{
                x: [2, -2, 1, -3, 2, 0],
                opacity: [0.5, 0.6, 0.4, 0.7, 0.5],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatDelay: 0.15,
              }}
              className="absolute inset-0 text-amber-500 mix-blend-screen"
              style={{
                fontSize: "clamp(4rem, 20vw, 16rem)",
                fontFamily: "monospace",
                fontWeight: 900,
                letterSpacing: "0.1em",
                filter: "blur(1px)",
              }}
            >
              {glitchText}
            </motion.div>

            {/* Main text */}
            <motion.div
              animate={{
                opacity: [1, 0.8, 1, 0.6, 1],
                scale: [1, 1.01, 1, 0.99, 1],
                y: [0, -2, 0, 2, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
              }}
              className="relative text-red-500"
              style={{
                fontSize: "clamp(4rem, 20vw, 16rem)",
                fontFamily: "monospace",
                fontWeight: 900,
                letterSpacing: "0.1em",
                textShadow: `
                  0 0 10px #ff0000,
                  0 0 20px #ff0000,
                  0 0 40px #ff0000,
                  0 0 80px #ff0000,
                  0 0 120px rgba(255, 0, 0, ${intensity * 0.5})
                `,
                filter: `brightness(${1 + intensity * 0.3}) contrast(${1.2 + intensity * 0.3})`,
              }}
            >
              {glitchText}
            </motion.div>

            {/* Horizontal glitch bars */}
            <motion.div
              animate={{
                y: ["-100%", "100%"],
                scaleY: [1, 1.5, 1, 2, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: Math.random() * 1,
              }}
              className="absolute inset-x-0 h-8 bg-red-500 opacity-30 mix-blend-screen"
              style={{
                top: `${Math.random() * 100}%`,
              }}
            />

            <motion.div
              animate={{
                y: ["100%", "-100%"],
                scaleY: [1, 2, 1, 1.5, 1],
              }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                repeatDelay: Math.random() * 1.5,
              }}
              className="absolute inset-x-0 h-12 bg-red-500 opacity-20 mix-blend-screen"
              style={{
                top: `${Math.random() * 100}%`,
              }}
            />
          </div>

          {/* Digital noise overlay */}
          <motion.div
            animate={{
              opacity: [0, 0.05, 0, 0.08, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
            }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />

          {/* Corner indicators */}
          <motion.div
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
            className="absolute top-8 left-8 text-red-500 font-mono text-xs tracking-widest"
          >
            [SYSTEM_ALERT]
          </motion.div>

          <motion.div
            animate={{
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="absolute top-8 right-8 text-red-500 font-mono text-xs tracking-widest"
          >
            [NEURAL_CORE]
          </motion.div>

          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
            }}
            className="absolute bottom-8 left-8 text-red-500 font-mono text-xs tracking-widest"
          >
            [INITIALIZING...]
          </motion.div>

          <motion.div
            animate={{
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}
            className="absolute bottom-8 right-8 text-red-500 font-mono text-xs tracking-widest flex items-center gap-2"
          >
            <motion.span
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
              className="h-2 w-2 rounded-full bg-red-500"
            />
            [ACTIVE]
          </motion.div>

          {/* Vignette */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 200px rgba(0,0,0,0.9)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
