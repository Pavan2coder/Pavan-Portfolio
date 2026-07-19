"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  wrap,
} from "framer-motion";

/**
 * React Bits–style ScrollVelocity marquee. The row drifts continuously; scroll
 * velocity speeds it up, reverses its direction, and skews it slightly for a
 * kinetic feel. Content is repeated 4× so it never shows a gap.
 */
export function ScrollVelocity({
  items,
  baseVelocity = 3,
  className,
}: {
  items: string[];
  baseVelocity?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const skew = useTransform(smoothVelocity, [-1000, 0, 1000], [-6, 0, 6], {
    clamp: true,
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const row = [...items, ...items, ...items, ...items];

  return (
    <motion.div
      style={{ skewX: skew }}
      className={`flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] ${className ?? ""}`}
    >
      <motion.div className="flex shrink-0 items-center gap-10 pr-10" style={{ x }}>
        {row.map((t, i) => (
          <span
            key={i}
            className="font-display text-2xl font-semibold text-text-faint transition-colors hover:text-text sm:text-3xl"
          >
            {t}
            <span className="ml-10 text-brand">✦</span>
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
