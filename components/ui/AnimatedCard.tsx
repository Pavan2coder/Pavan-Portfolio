"use client";
import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useSound } from "@/hooks/useSound";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedCard({ children, delay = 0, className = "" }: AnimatedCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { playUIActivate } = useSound();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3, delay }}
      onAnimationComplete={() => {
        if (isInView && delay < 0.5) {
          playUIActivate();
        }
      }}
      className={`relative ${className}`}
    >
      {/* Border drawing animation */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke="url(#borderGradient)"
          strokeWidth="1"
          rx="8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            pathLength: { duration: 1, delay: delay + 0.2, ease: "easeInOut" },
            opacity: { duration: 0.3, delay: delay + 0.2 },
          }}
        />
        <defs>
          <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#007cf0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Corner indicators */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: delay + 0.4 }}
        className="absolute top-0 left-0 h-2 w-2 border-l-2 border-t-2 border-primary rounded-tl-lg"
        style={{ zIndex: 2 }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: delay + 0.5 }}
        className="absolute top-0 right-0 h-2 w-2 border-r-2 border-t-2 border-primary rounded-tr-lg"
        style={{ zIndex: 2 }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: delay + 0.6 }}
        className="absolute bottom-0 left-0 h-2 w-2 border-l-2 border-b-2 border-primary rounded-bl-lg"
        style={{ zIndex: 2 }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: delay + 0.7 }}
        className="absolute bottom-0 right-0 h-2 w-2 border-r-2 border-b-2 border-primary rounded-br-lg"
        style={{ zIndex: 2 }}
      />

      {/* Scanner sweep */}
      <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={isInView ? { y: "100%", opacity: [0, 0.3, 0] } : {}}
        transition={{ duration: 1, delay: delay + 0.3, ease: "easeInOut" }}
        className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-primary/20 to-transparent pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Glow effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: [0, 0.5, 0] } : {}}
        transition={{ duration: 1.5, delay: delay + 0.2 }}
        className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-lg pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.5 }}
        className="relative hud-panel rounded-lg h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
