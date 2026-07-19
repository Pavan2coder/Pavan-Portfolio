"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { bootSequence, profile } from "@/lib/data";

/**
 * NEXUS boot — a realistic terminal init log that streams system modules
 * online, fills a progress bar, authenticates the operator, then hands off
 * to the dashboard. Skippable; instant for reduced motion.
 */
export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const total = bootSequence.length;
  const progress = Math.min(100, Math.round((step / total) * 100));

  useEffect(() => {
    if (reduce) {
      finish();
      return;
    }
    if (step < total) {
      const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 260 : 240);
      return () => clearTimeout(t);
    }
    // all modules online → welcome, then hand off
    setDone(true);
    const t = setTimeout(finish, 1100);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, reduce]);

  function finish() {
    onComplete();
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg px-base"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* faint grid + vignette for depth */}
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40 mask-fade-edges" />

      <button
        onClick={finish}
        className="label absolute right-base top-base z-10 rounded-sm border border-hairline px-3 py-2 text-text-faint transition-colors hover:border-accent hover:text-accent"
      >
        Skip →
      </button>

      <div className="relative w-full max-w-xl">
        {/* header */}
        <div className="mb-room flex items-center justify-between">
          <div className="flex items-center gap-tight">
            <BootMark />
            <div>
              <div className="font-display text-lg font-semibold tracking-tight text-text">
                NEXUS
              </div>
              <div className="label mt-1">AI Command Center</div>
            </div>
          </div>
          <div className="label text-right">
            v2.6.0
            <br />
            <span className="text-accent">SECURE</span>
          </div>
        </div>

        {/* terminal */}
        <div className="glass-strong rounded-lg p-room">
          <div className="mb-base flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-online/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
            <span className="label ml-2">/nexus/boot — tty0</span>
          </div>

          <div className="space-y-1.5 font-mono text-[0.82rem] leading-relaxed">
            {bootSequence.map((line, i) => {
              const state = i < step ? "ok" : i === step ? "run" : "idle";
              if (state === "idle") return null;
              return (
                <motion.div
                  key={line.tag + i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2"
                >
                  <span className="w-16 shrink-0 text-accent/80">[{line.tag}]</span>
                  <span className="text-text-muted">{line.text}</span>
                  <span className="mx-1 flex-1 border-b border-dotted border-hairline" />
                  {state === "ok" ? (
                    <span className="text-online">OK</span>
                  ) : (
                    <span className="text-accent">
                      <span className="animate-blink">▋</span>
                    </span>
                  )}
                </motion.div>
              );
            })}

            {done && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-2 text-text"
              >
                <span className="text-online">✓</span> Operator authenticated —{" "}
                <span className="text-accent">
                  {profile.name.split(" ").slice(-1)[0].toUpperCase()}
                </span>
                . Welcome.
              </motion.div>
            )}
          </div>

          {/* progress */}
          <div className="mt-room">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="label">System Initialization</span>
              <span className="readout text-xs text-accent">{done ? 100 : progress}%</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-panel">
              <motion.div
                className="h-full rounded-full bg-accent"
                style={{ boxShadow: "var(--glow-sm)" }}
                animate={{ width: `${done ? 100 : progress}%` }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BootMark() {
  return (
    <div className="relative grid h-11 w-11 place-items-center">
      <span className="absolute inset-0 animate-spin-slow rounded-full border border-accent/40" />
      <span className="absolute inset-1.5 animate-spin-slower rounded-full border border-cyan/30 [animation-direction:reverse]" />
      <span className="h-2.5 w-2.5 rounded-full bg-accent glow-sm" />
    </div>
  );
}
