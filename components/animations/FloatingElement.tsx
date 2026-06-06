"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingElementProps {
  children: ReactNode;
  speed?: number;
  amplitude?: number;
  rotationSpeed?: number;
  delay?: number;
  className?: string;
}

export function FloatingElement({
  children,
  speed = 1,
  amplitude = 1,
  rotationSpeed = 0,
  delay = 0,
  className = "",
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [0, -amplitude * 15, 0],
        x: [0, amplitude * 8, 0],
        rotate: rotationSpeed ? [0, rotationSpeed * 360, 0] : 0,
      }}
      transition={{
        duration: 6 / speed,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Smooth idle floating for UI elements
export function IdleFloat({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Smooth breathing effect
export function BreathingGlow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      animate={{
        opacity: [0.6, 1, 0.6],
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
