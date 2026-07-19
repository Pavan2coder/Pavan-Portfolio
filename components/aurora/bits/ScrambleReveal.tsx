"use client";

// Inspired by React Bits' ScrambledText, but INVERTED: the text renders as a
// field of dots/glyphs by default, and the real characters decode only within
// a radius of the cursor. Built without GSAP (self-contained + reliable).

import { useEffect, useRef, type ElementType } from "react";
import { cn } from "@/lib/utils";

export function ScrambleReveal({
  children,
  radius = 130,
  scrambleChars = "·.:•",
  className,
  as = "p",
}: {
  children: string;
  radius?: number;
  scrambleChars?: string;
  className?: string;
  as?: "p" | "h2" | "h3" | "span";
}) {
  const rootRef = useRef<HTMLElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const centers = useRef<{ x: number; y: number }[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });

  const chars = Array.from(children);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // reduced motion → just show the real text, always readable
    if (reduce) {
      spansRef.current.forEach((s) => {
        if (s) {
          s.textContent = s.dataset.char ?? "";
          s.style.color = "var(--text)";
        }
      });
      return;
    }

    function computeCenters() {
      centers.current = spansRef.current.map((s) => {
        if (!s) return { x: -9999, y: -9999 };
        const r = s.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
    }

    function onMove(e: PointerEvent) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }

    let raf = 0;
    let f = 0;
    function loop() {
      f++;
      if (f % 20 === 1) computeCenters(); // cheap re-sync for scroll/layout
      spansRef.current.forEach((s, i) => {
        if (!s) return;
        const real = s.dataset.char ?? "";
        if (real === " ") return;
        const c = centers.current[i];
        if (!c) return;
        const d = Math.hypot(mouse.current.x - c.x, mouse.current.y - c.y);
        if (d < radius) {
          if (s.textContent !== real) s.textContent = real;
          s.style.color = "var(--brand)";
          s.style.opacity = "1";
        } else {
          if (f % 4 === 0 || s.textContent === real) {
            s.textContent =
              scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }
          s.style.color = "var(--text-faint)";
          s.style.opacity = "0.7";
        }
      });
      raf = requestAnimationFrame(loop);
    }

    computeCenters();
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", computeCenters, { passive: true });
    window.addEventListener("resize", computeCenters);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", computeCenters);
      window.removeEventListener("resize", computeCenters);
    };
  }, [radius, scrambleChars]);

  const Tag: ElementType = as;

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={rootRef as any}
      aria-label={children}
      className={cn("font-mono leading-relaxed", className)}
    >
      {chars.map((ch, i) => (
        <span
          key={i}
          aria-hidden
          ref={(el) => {
            spansRef.current[i] = el;
          }}
          data-char={ch}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {ch === " " ? " " : "·"}
        </span>
      ))}
    </Tag>
  );
}
