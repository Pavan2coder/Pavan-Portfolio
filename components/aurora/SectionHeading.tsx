"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { ScrambleReveal } from "./bits/ScrambleReveal";

/**
 * Bento section: a 12-col grid of rounded tiles. The first tile is the
 * headline; `children` are more <Tile>s that fill out the mosaic.
 */
export function SectionLayout({
  id,
  index,
  kicker,
  title,
  lead,
  headClass = "lg:col-span-8",
  tone = "cream",
  children,
}: {
  id: string;
  index: string;
  kicker: string;
  title: string;
  lead?: string;
  headClass?: string;
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative py-6 md:py-8">
      <div className="bento mx-auto grid max-w-wide grid-cols-12 gap-3.5 px-4 sm:px-8">
        <Tile tone={tone} className={`flex flex-col justify-between gap-10 ${headClass}`}>
          <div className="flex items-center justify-between font-mono text-sm font-semibold text-text-muted">
            <span>{kicker}</span>
            <span>[ {index} ]</span>
          </div>
          <div>
            <h2 className="display text-6xl sm:text-7xl lg:text-8xl">{title}</h2>
            {lead && (
              <ScrambleReveal radius={170} className="mt-6 max-w-2xl text-sm text-text-muted md:text-base">
                {lead}
              </ScrambleReveal>
            )}
          </div>
        </Tile>
        {children}
      </div>
    </section>
  );
}

export type Tone = "cream" | "green" | "red" | "mint" | "ink";

/** One rounded bento tile. Full width on mobile; pass lg:col-span-* for desktop. */
export function Tile({
  tone = "cream",
  className = "",
  delay = 0,
  children,
}: {
  tone?: Tone;
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <Reveal delay={delay} className={`tile tile-${tone} col-span-12 ${className}`}>
      {children}
    </Reveal>
  );
}
