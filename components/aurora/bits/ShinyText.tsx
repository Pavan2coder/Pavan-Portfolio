"use client";

import { cn } from "@/lib/utils";

/**
 * React Bits–style ShinyText: a light band sweeps across the text on a loop.
 * Uses the `.shiny-text` utility (globals.css); `speed` overrides the cycle.
 */
export function ShinyText({
  text,
  className,
  speed = 4,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  return (
    <span
      className={cn("shiny-text", className)}
      style={{ animationDuration: `${speed}s` }}
    >
      {text}
    </span>
  );
}
