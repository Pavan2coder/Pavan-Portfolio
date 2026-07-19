"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * React Bits–style custom cursor: an instant center dot + a lagging ring that
 * grows and fills when hovering interactive elements. Uses mix-blend-difference
 * so it stays visible on any background. Desktop / fine-pointer only; touch and
 * reduced-motion keep the native cursor.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const interactiveSel = "a, button, [data-cursor], input, textarea, [role='button']";

    function move(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHovering(!!el?.closest(interactiveSel));
    }
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] mix-blend-difference">
      {/* lagging ring */}
      <motion.div
        className="absolute left-0 top-0 rounded-full border border-white"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          opacity: hovering ? 1 : 0.7,
          backgroundColor: hovering ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0)",
          scale: down ? 0.82 : 1,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        initial={false}
      />

      {/* instant center dot */}
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hovering ? 0 : 1 }}
      />
    </div>
  );
}
