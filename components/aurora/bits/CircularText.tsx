"use client";

import { motion } from "framer-motion";

/** React Bits — CircularText: letters spun around a ring. */
export function CircularText({
  text,
  duration = 18,
  className = "",
}: {
  text: string;
  duration?: number;
  className?: string;
}) {
  const letters = Array.from(text);
  return (
    <motion.div
      aria-label={text}
      className={`relative h-36 w-36 rounded-full font-mono text-sm font-bold uppercase ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
    >
      {letters.map((l, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute inset-0 text-center"
          style={{ transform: `rotate(${(360 / letters.length) * i}deg)` }}
        >
          {l}
        </span>
      ))}
    </motion.div>
  );
}
