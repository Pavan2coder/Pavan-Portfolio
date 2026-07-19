"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * React Bits–style CountUp: eases a number from 0 → target the first time it
 * scrolls into view. Preserves any non-digit prefix/suffix in the label
 * (e.g. "5+", "4+"). Reduced-motion jumps straight to the value.
 */
export function CountUp({
  value,
  duration = 1600,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  // pull the numeric core + surrounding symbols out of e.g. "5+"
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  const numeric = !!match;
  const prefix = match?.[1] ?? "";
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match?.[3] ?? "";

  // NOTE: deps are primitives only — `match`/`value` produce a fresh array each
  // render, which would restart the animation every frame and freeze it at 0.
  useEffect(() => {
    if (!numeric) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(String(target));
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(String(Math.round(eased * target)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target, numeric, duration]);

  return (
    <span ref={ref} className={className}>
      {numeric ? `${prefix}${display}${suffix}` : value}
    </span>
  );
}
