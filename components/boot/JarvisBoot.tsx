"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { systemBootLines } from "@/lib/data";
import { useSound } from "@/hooks/useSound";
import { cn } from "@/lib/utils";

const LINE_INTERVAL = 720;
const FINAL_HOLD = 900;

export function JarvisBoot({ onComplete }: { onComplete: () => void }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [finishing, setFinishing] = useState(false);
  const { beep, playBootSequence } = useSound();

  const lines = systemBootLines;

  // Play boot sequence sound on mount
  useEffect(() => {
    playBootSequence();
  }, [playBootSequence]);

  useEffect(() => {
    const total = lines.length;
    if (lineIndex < total) {
      beep(420 + lineIndex * 60, 0.05, "square");
      const t = setTimeout(() => setLineIndex((i) => i + 1), LINE_INTERVAL);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setFinishing(true), FINAL_HOLD);
    return () => clearTimeout(t);
  }, [lineIndex, lines.length, beep]);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = lines.length * LINE_INTERVAL + FINAL_HOLD - 200;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [lines.length]);

  useEffect(() => {
    if (finishing) {
      const t = setTimeout(onComplete, 900);
      return () => clearTimeout(t);
    }
  }, [finishing, onComplete]);

  const ticks = useMemo(
    () =>
      Array.from({ length: 48 }).map((_, i) => ({
        angle: (i * 360) / 48,
        active: i / 48 < progress,
      })),
    [progress]
  );

  return (
    <AnimatePresence>
      {!finishing || progress < 1 ? (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
          transition={{ duration: 0.85, ease: [0.7, 0, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-bg overflow-hidden"
        >
          {/* background grid */}
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 bg-radial-fade" />
          <div className="absolute inset-0 noise opacity-[0.06]" />

          {/* scanline */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: 2.4, ease: "linear", repeat: Infinity }}
            className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
          />

          {/* corner brackets */}
          <CornerBrackets />

          {/* center stage */}
          <div className="absolute inset-0 grid place-items-center px-6">
            <div className="relative flex flex-col items-center w-full max-w-[820px]">
              {/* outer pulse ring */}
              <BootCore progress={progress} />

              {/* tick ring */}
              <div className="absolute -inset-8 sm:-inset-12">
                <div className="relative h-full w-full">
                  {ticks.map((t, i) => (
                    <div
                      key={i}
                      className="absolute left-1/2 top-1/2 origin-center"
                      style={{
                        transform: `rotate(${t.angle}deg) translateY(-${
                          typeof window !== "undefined" && window.innerWidth < 640
                            ? 130
                            : 190
                        }px)`,
                      }}
                    >
                      <div
                        className={cn(
                          "h-2 w-[2px] rounded-sm",
                          t.active
                            ? "bg-primary shadow-[0_0_8px_#a78bfa]"
                            : "bg-text-dim/50"
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* terminal */}
              <div className="mt-10 sm:mt-14 w-full max-w-md text-left">
                <div className="hud-panel rounded-md px-4 py-3 font-mono text-[11px] sm:text-xs">
                  <div className="flex items-center gap-2 border-b border-primary/15 pb-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-primary shadow-glow-sm" />
                    <span className="font-display tracking-[0.2em] text-[10px] text-text-muted">
                      pavan.portfolio
                    </span>
                    <span className="ml-auto text-text-muted">loading</span>
                  </div>
                  <div className="space-y-1.5">
                    {lines.slice(0, lineIndex).map((l, i) => (
                      <BootLine key={i} text={l} />
                    ))}
                    {lineIndex < lines.length && (
                      <BootLine key={`active-${lineIndex}`} text={lines[lineIndex]} active />
                    )}
                  </div>
                </div>

                {/* progress bar */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-[10px] font-display uppercase tracking-[0.3em] text-text-muted">
                    BOOT
                  </span>
                  <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-text-dim/20">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary shadow-[0_0_10px_#a78bfa]"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-primary w-8 text-right">
                    {Math.round(progress * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* corner stats */}
          <div className="pointer-events-none absolute top-6 left-6 right-6 flex justify-between text-[11px] tracking-[0.2em] text-text-muted">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Pavan — Portfolio
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-6 left-6 right-6 flex justify-center text-[11px] tracking-[0.2em] text-text-dim">
            <span>Welcome</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function BootLine({ text, active }: { text: string; active?: boolean }) {
  return (
    <div className="flex gap-2 items-baseline">
      <span className="text-primary">{">"}</span>
      {active ? (
        <TypingLine text={text} />
      ) : (
        <span className="text-text">
          {text}{" "}
          <span className="ml-2 text-emerald-400/90 text-[10px] uppercase font-display tracking-[0.25em]">
            [ ok ]
          </span>
        </span>
      )}
    </div>
  );
}

function TypingLine({ text }: { text: string }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const speed = Math.max(14, Math.floor(LINE_INTERVAL / Math.max(text.length, 1)));
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text]);
  return (
    <span className="text-text">
      {out}
      <span className="ml-0.5 inline-block animate-blink text-primary">▍</span>
    </span>
  );
}

function BootCore({ progress }: { progress: number }) {
  return (
    <div className="relative h-[260px] w-[260px] sm:h-[320px] sm:w-[320px]">
      {/* glow */}
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl animate-pulse" />
      <div className="absolute inset-[18%] rounded-full bg-secondary/30 blur-2xl" />

      {/* outer arc */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 animate-spin-slow">
        <defs>
          <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="url(#arcGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
        />
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke="#a78bfa"
          strokeOpacity="0.25"
          strokeWidth="0.6"
        />
      </svg>

      {/* mid ring reverse */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 animate-spin-reverse">
        <circle
          cx="100"
          cy="100"
          r="62"
          fill="none"
          stroke="#a78bfa"
          strokeOpacity="0.6"
          strokeWidth="1"
          strokeDasharray="20 6 6 6"
        />
      </svg>

      {/* progress ring */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-90">
        <circle
          cx="100"
          cy="100"
          r="46"
          fill="none"
          stroke="rgba(167,139,250,0.12)"
          strokeWidth="3"
        />
        <circle
          cx="100"
          cy="100"
          r="46"
          fill="none"
          stroke="url(#arcGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 46}
          strokeDashoffset={2 * Math.PI * 46 * (1 - progress)}
          style={{ transition: "stroke-dashoffset 0.2s ease-out" }}
        />
      </svg>

      {/* inner radar */}
      <div className="absolute inset-[26%] rounded-full border border-primary/30 grid place-items-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(167,139,250,0) 0deg, rgba(167,139,250,0.45) 40deg, rgba(167,139,250,0) 80deg)",
            animation: "radarSweep 2.6s linear infinite",
          }}
        />
        <div className="relative font-display text-primary">
          <div className="text-center text-5xl sm:text-6xl font-semibold tracking-tight text-gradient-cyan">
            P
          </div>
        </div>
      </div>
    </div>
  );
}

function CornerBrackets() {
  return (
    <>
      <Bracket className="top-4 left-4" />
      <Bracket className="top-4 right-4 rotate-90" />
      <Bracket className="bottom-4 left-4 -rotate-90" />
      <Bracket className="bottom-4 right-4 rotate-180" />
    </>
  );
}
function Bracket({ className }: { className?: string }) {
  return (
    <div className={cn("absolute h-8 w-8", className)}>
      <div className="absolute inset-0 border-l border-t border-primary/60" />
    </div>
  );
}
