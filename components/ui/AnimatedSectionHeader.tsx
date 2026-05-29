"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedSectionHeaderProps {
  code: string;
  title: string;
  kicker?: string;
}

export function AnimatedSectionHeader({ code, title, kicker }: AnimatedSectionHeaderProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const letters = title.split("");

  return (
    <div ref={ref} className="relative">
      {/* Kicker */}
      {kicker && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 text-[10px] font-display uppercase tracking-[0.4em] text-text-muted mb-4"
        >
          <motion.span
            animate={isInView ? {
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
            className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow-sm"
          />
          {kicker}
          <span className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
        </motion.div>
      )}

      {/* Code + Title */}
      <div className="flex items-baseline gap-4">
        {/* Code */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display text-sm text-primary/60 tracking-[0.3em]"
        >
          /{code}
        </motion.span>

        {/* Animated Title */}
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={isInView ? {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.03,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block text-gradient-cyan glow-text"
              style={{ display: letter === " " ? "inline" : "inline-block" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </h2>
      </div>

      {/* Scanner line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-4 h-px bg-gradient-to-r from-primary via-secondary to-transparent origin-left"
      />

      {/* Holographic corners */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -left-2 top-0 h-8 w-8 border-l-2 border-t-2 border-primary/40"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute -right-2 top-0 h-8 w-8 border-r-2 border-t-2 border-primary/40"
      />
    </div>
  );
}
