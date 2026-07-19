"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { Icon } from "./Icon";
import { widgets } from "@/lib/data";

/**
 * Right-rail live widgets — meters and counters that come online when scrolled
 * into view and drift with subtle life afterward.
 */
export function WidgetRail() {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="mb-1 flex items-center justify-between">
        <span className="label">Live Telemetry</span>
        <span className="label flex items-center gap-1.5 text-online">
          <span className="h-1.5 w-1.5 rounded-full bg-online animate-pulse-glow" />
          Streaming
        </span>
      </div>
      {widgets.map((w, i) =>
        w.kind === "meter" ? (
          <MeterWidget key={w.id} w={w} delay={i * 0.06} />
        ) : (
          <StatWidget key={w.id} w={w} delay={i * 0.06} />
        )
      )}
    </div>
  );
}

function Shell({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-md px-3.5 py-3 transition-colors duration-300 hover:border-accent-line"
    >
      {children}
    </motion.div>
  );
}

function MeterWidget({ w, delay }: { w: (typeof widgets)[number]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  const [live, setLive] = useState(w.value);

  // subtle live jitter around the base value
  useEffect(() => {
    if (reduce || !inView) return;
    const t = setInterval(() => {
      const jitter = Math.round((Math.sin(Date.now() / 1400 + w.value) * 4));
      setLive(Math.max(4, Math.min(99, w.value + jitter)));
    }, 1200);
    return () => clearInterval(t);
  }, [inView, reduce, w.value]);

  return (
    <div ref={ref}>
      <Shell delay={delay}>
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-2 text-text-muted">
            <Icon name={w.icon} className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs">{w.label}</span>
          </span>
          <span className="readout text-xs text-text">
            {inView ? live : 0}
            {w.unit}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-panel-2">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent to-cyan"
            style={{ boxShadow: "var(--glow-sm)" }}
            initial={{ width: 0 }}
            animate={{ width: inView ? `${live}%` : 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </Shell>
    </div>
  );
}

function StatWidget({ w, delay }: { w: (typeof widgets)[number]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      mv.set(w.value);
      return;
    }
    const controls = animate(mv, w.value, { duration: 1.1, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [inView, reduce, mv, w.value]);

  return (
    <div ref={ref}>
      <Shell delay={delay}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-text-muted">
            <Icon name={w.icon} className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs">{w.label}</span>
          </span>
          <span className="readout flex items-baseline text-base font-semibold text-text">
            <motion.span>{rounded}</motion.span>
            {w.suffix && <span className="text-accent">{w.suffix}</span>}
          </span>
        </div>
      </Shell>
    </div>
  );
}
