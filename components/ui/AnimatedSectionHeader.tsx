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
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.32em] text-secondary mb-4"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
          <span className="text-text-muted">{kicker}</span>
          <span className="text-text-dim">/{code}</span>
        </motion.div>
      )}

      {/* Title */}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.9rem] font-semibold tracking-tight leading-[1.05]">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: i * 0.02,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block text-gradient-cyan"
            style={{ display: letter === " " ? "inline" : "inline-block" }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </h2>

      {/* thin rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 h-px max-w-[120px] bg-gradient-to-r from-primary/60 to-transparent origin-left"
      />
    </div>
  );
}
