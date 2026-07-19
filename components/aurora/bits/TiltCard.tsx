"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * React Bits–style Tilt + Spotlight card. Tracks the pointer to rotate the
 * card in 3D and moves a brand-coloured glow under the cursor. A subtle
 * sheen sweeps across on hover. Fine-pointer devices only feel the tilt.
 */
export function TiltCard({
  children,
  className,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 220,
    damping: 20,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 220,
    damping: 20,
  });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    px.set(nx);
    py.set(ny);
    el.style.setProperty("--mx", `${nx * 100}%`);
    el.style.setProperty("--my", `${ny * 100}%`);
  }
  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={cn(
        "group relative h-full overflow-hidden rounded-lg border border-border bg-card transition-colors duration-300 hover:border-brand-line [transform-style:preserve-3d]",
        className,
      )}
    >
      {/* cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--mx) var(--my), var(--brand-soft), transparent 70%)",
        }}
      />
      {/* sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.05) 48%, transparent 62%)",
        }}
      />
      <div className="relative z-10 h-full [transform:translateZ(30px)]">
        {children}
      </div>
    </motion.div>
  );
}
