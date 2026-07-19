"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/[]{}=+*#%";

/**
 * React Bits–style DecryptedText: scrambles glyphs then resolves to the real
 * string, character by character. Re-runs each time `text` changes — perfect
 * for a rotating role. Reduced-motion shows the plain text.
 */
export function DecryptedText({
  text,
  className,
  speed = 34,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const [out, setOut] = useState(text);
  const raf = useRef<number | null>(null);
  const last = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOut(text);
      return;
    }
    let revealed = 0;
    function step(t: number) {
      if (t - last.current >= speed) {
        last.current = t;
        revealed += 0.5;
        const n = Math.floor(revealed);
        const scrambled = text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < n) return text[i];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");
        setOut(scrambled);
      }
      if (revealed < text.length) {
        raf.current = requestAnimationFrame(step);
      } else {
        setOut(text);
      }
    }
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [text, speed]);

  return (
    <span className={className} aria-label={text}>
      {out}
    </span>
  );
}
