"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/lib/data";

/**
 * Intro preloader: a 0→100 counter with the name, then the panel splits and
 * lifts away to reveal the page. Runs once per tab (sessionStorage) and skips
 * for reduced-motion so the site is instantly usable.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("aurora-intro");
    if (reduce || seen) {
      setShow(false);
      onDone();
      return;
    }

    document.body.style.overflow = "hidden";
    let raf = 0;
    let start: number | null = null;
    const duration = 1900;

    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("aurora-intro", "1");
        setTimeout(() => {
          setShow(false);
          onDone();
          document.body.style.overflow = "";
        }, 500);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          exit={{ transition: { duration: 0.1 } }}
        >
          {/* split curtain panels */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-bg"
            exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-bg"
            exit={{ y: "100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          />

          {/* content */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="label mb-6"
            >
              {profile.role}
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-4xl font-bold tracking-tight sm:text-6xl"
              >
                Athava Sri <span className="text-gradient-flow">Pavan</span>
              </motion.h2>
            </div>

            {/* progress */}
            <div className="mt-10 flex w-64 items-center gap-4">
              <div className="relative h-px flex-1 overflow-hidden bg-border">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand via-brand-2 to-brand-3"
                  style={{ width: `${count}%` }}
                />
              </div>
              <span className="readout w-10 text-right text-sm text-text-muted">
                {count}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
