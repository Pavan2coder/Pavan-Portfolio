"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * React Bits–style SplitText: reveals text one character at a time with a
 * spring rise + blur. Splits on words so wrapping stays natural.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.03,
  as = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2";
}) {
  const words = text.split(" ");
  const MotionTag = motion[as] as typeof motion.span;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="visible"
      aria-label={text}
      style={{ display: "inline-block" }}
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {Array.from(word).map((char, ci) => (
            <motion.span
              key={ci}
              aria-hidden
              style={{ display: "inline-block", willChange: "transform" }}
              variants={{
                hidden: { y: "0.55em", opacity: 0, filter: "blur(8px)" },
                visible: { y: 0, opacity: 1, filter: "blur(0px)" },
              }}
              transition={{
                delay: delay + (wordOffset(words, wi) + ci) * stagger,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </MotionTag>
  );
}

function wordOffset(words: string[], index: number) {
  let n = 0;
  for (let i = 0; i < index; i++) n += words[i].length;
  return n;
}

/** SplitText variant that fires when scrolled into view (for headings). */
export function SplitTextOnView({
  text,
  className,
  stagger = 0.025,
}: {
  text: string;
  className?: string;
  stagger?: number;
}): ReactNode {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      aria-label={text}
      style={{ display: "inline-block" }}
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {Array.from(word).map((char, ci) => (
            <motion.span
              key={ci}
              aria-hidden
              style={{ display: "inline-block", willChange: "transform" }}
              variants={{
                hidden: { y: "0.5em", opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              transition={{
                delay: (wordOffset(words, wi) + ci) * stagger,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
