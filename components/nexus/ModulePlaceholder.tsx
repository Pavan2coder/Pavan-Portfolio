"use client";

import { motion } from "framer-motion";
import { Icon } from "./Icon";

/**
 * On-brand placeholder for modules still being wired into NEXUS.
 * Keeps the command-center language coherent while sections are built.
 */
export function ModulePlaceholder({
  id,
  code,
  title,
  icon,
}: {
  id: string;
  code: string;
  title: string;
  icon: string;
}) {
  return (
    <section
      id={id}
      className="relative mx-auto flex min-h-[60vh] w-full max-w-content flex-col justify-center px-base py-margin"
    >
      <div className="mb-room flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-md border border-glass-border bg-panel text-accent">
          <Icon name={icon} className="h-5 w-5" />
        </span>
        <div>
          <div className="label text-accent">{code}</div>
          <div className="label mt-1">Module</div>
        </div>
        <div className="ml-auto h-[1px] flex-1 bg-hairline" />
        <span className="label flex items-center gap-1.5 text-warn">
          <span className="h-1.5 w-1.5 rounded-full bg-warn animate-pulse-glow" />
          Compiling
        </span>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-[clamp(2rem,6vw,4rem)] font-bold leading-[0.98] tracking-tight"
      >
        {title}
      </motion.h2>

      <p className="mt-room max-w-md font-mono text-sm text-text-muted">
        <span className="text-accent">$</span> module.status ={" "}
        <span className="text-warn">&quot;awaiting deployment&quot;</span>
      </p>
    </section>
  );
}
