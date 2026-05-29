"use client";
import { motion } from "framer-motion";

export function SectionHeader({
  code,
  title,
  kicker,
}: {
  code: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="mb-10 sm:mb-14">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 text-[10px] font-display uppercase tracking-[0.4em] text-text-muted"
      >
        <span className="text-primary">/{code}</span>
        <span className="h-px w-12 bg-primary/40" />
        <span>{kicker ?? "MODULE"}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-balance text-gradient-cyan"
      >
        {title}
      </motion.h2>
    </div>
  );
}
