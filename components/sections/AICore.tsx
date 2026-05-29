"use client";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSectionHeader } from "@/components/ui/AnimatedSectionHeader";
import { useSound } from "@/hooks/useSound";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamic import with proper typing
const CinematicAICore = dynamic<{ onSkillClick?: (skill: string) => void }>(
  () => import("@/components/3d/CinematicAICore"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full flex items-center justify-center">
        <div className="text-primary animate-pulse">Initializing Neural Core...</div>
      </div>
    ),
  }
);

export function AICoreSection() {
  const { playAmbient, stopAmbient, playUIActivate, playHolographicScan, playEnergyPulse } = useSound();
  const [activated, setActivated] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Dramatic activation when section enters view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !activated) {
            // Activation sequence
            setTimeout(() => playHolographicScan(), 100);
            setTimeout(() => playUIActivate(), 300);
            setTimeout(() => {
              playAmbient();
              playEnergyPulse();
              setActivated(true);
            }, 800);
          } else if (!entry.isIntersecting && activated) {
            stopAmbient();
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("ai-core");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, [activated, playAmbient, stopAmbient, playUIActivate, playHolographicScan, playEnergyPulse]);

  const handleSkillClick = (skill: string) => {
    setSelectedSkill(skill);
  };

  return (
    <section id="ai-core" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <AnimatedSectionHeader
          code="02"
          title="Neural Core Control System"
          kicker="INTERACTIVE AI ENGINE"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12"
        >
          {/* Activation Status */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 hud-panel rounded-full px-6 py-3"
            >
              <motion.span
                animate={{
                  scale: activated ? [1, 1.2, 1] : 1,
                  opacity: activated ? [0.6, 1, 0.6] : 0.3,
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="h-2 w-2 rounded-full bg-primary shadow-glow-sm"
              />
              <span className="font-display text-sm uppercase tracking-[0.3em] text-text">
                {activated ? "Neural Core Active" : "Initializing..."}
              </span>
              <span className="text-text-muted text-xs hidden sm:inline">
                • Click Skills • Drag to Rotate • Scroll to Zoom
              </span>
            </motion.div>
          </div>

          {/* Interactive 3D Core Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative"
          >
            {/* Activation glow effect */}
            <AnimatePresence>
              {activated && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-secondary/10 blur-3xl -z-10"
                />
              )}
            </AnimatePresence>
            
            {/* Main interactive container */}
            <div className="hud-panel rounded-2xl overflow-hidden relative">
              {/* Corner indicators */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[10px] font-display uppercase tracking-[0.3em] text-primary">
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow-sm"
                />
                {activated ? "NEURAL CORE ONLINE" : "ACTIVATING..."}
              </div>
              <div className="absolute top-4 right-4 z-10 text-[10px] font-display uppercase tracking-[0.3em] text-text-muted">
                INTERACTIVE MODE
              </div>
              <div className="absolute bottom-4 left-4 z-10 text-[10px] font-display uppercase tracking-[0.3em] text-text-muted">
                10 SKILLS CONNECTED
              </div>
              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 text-[10px] font-display uppercase tracking-[0.3em] text-secondary">
                <span>LATENCY: {activated ? "8ms" : "--"}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-secondary shadow-glow-sm" />
              </div>

              {/* 3D Core */}
              <div className="h-[600px] sm:h-[700px] lg:h-[800px] relative">
                <CinematicAICore onSkillClick={handleSkillClick} />
              </div>

              {/* Scanner sweep effect */}
              <AnimatePresence>
                {activated && (
                  <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-primary/10 to-transparent pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Scanline effect */}
              <div className="absolute inset-0 pointer-events-none scanline opacity-20" />
            </div>

            {/* Skill Info Panel */}
            <AnimatePresence>
              {selectedSkill && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 hud-panel rounded-lg px-6 py-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-xl text-primary uppercase tracking-wider">
                        {selectedSkill}
                      </h3>
                      <p className="text-sm text-text-muted mt-1">
                        Neural connection established • Skill node active
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedSkill(null)}
                      className="text-text-muted hover:text-primary transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stats panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { label: "SKILL NODES", value: "10" },
                { label: "CONNECTIONS", value: activated ? "ACTIVE" : "STANDBY" },
                { label: "NEURAL SYNC", value: activated ? "100%" : "0%" },
                { label: "STATUS", value: activated ? "ONLINE" : "OFFLINE" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="hud-panel rounded-md px-4 py-3 text-center"
                >
                  <div className="text-[10px] font-display uppercase tracking-[0.3em] text-text-muted">
                    {stat.label}
                  </div>
                  <div className="mt-1 font-display text-lg text-primary glow-text">
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
