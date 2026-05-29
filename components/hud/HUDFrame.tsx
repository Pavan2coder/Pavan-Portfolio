"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HUDFrame({
  children,
  label,
  code,
  className,
  glow = false,
}: {
  children?: React.ReactNode;
  label?: string;
  code?: string;
  className?: string;
  glow?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "corner-frame relative hud-panel rounded-md p-5 sm:p-6",
        glow && "shadow-glow",
        className
      )}
    >
      {(label || code) && (
        <div className="mb-4 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-text-muted font-display">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-glow-sm" />
            {label}
          </span>
          {code && <span className="text-primary/70">{code}</span>}
        </div>
      )}
      {children}
    </motion.div>
  );
}
