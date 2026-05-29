"use client";
import { motion } from "framer-motion";

export function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <motion.div
        className="absolute inset-0 grid-bg opacity-60"
        animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
      />
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg via-bg/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
    </div>
  );
}
