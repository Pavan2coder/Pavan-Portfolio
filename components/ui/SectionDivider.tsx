"use client";
import { motion } from "framer-motion";
import { useSound } from "@/hooks/useSound";
import { useEffect, useRef } from "react";

export function SectionDivider() {
  const { playSectionTransition } = useSound();
  const hasPlayed = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed.current) {
            playSectionTransition();
            hasPlayed.current = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    const divider = document.querySelector('[data-section-divider]');
    if (divider) observer.observe(divider);

    return () => observer.disconnect();
  }, [playSectionTransition]);

  return (
    <div data-section-divider className="relative h-24 flex items-center justify-center overflow-hidden">
      {/* Animated line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
      
      {/* Center diamond */}
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 45 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-10 h-3 w-3 bg-primary/60 shadow-glow-sm"
      >
        <div className="absolute inset-0 bg-primary/40 animate-ping" />
      </motion.div>

      {/* Scanning effect */}
      <motion.div
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
        className="absolute h-8 w-32 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm"
      />
    </div>
  );
}
