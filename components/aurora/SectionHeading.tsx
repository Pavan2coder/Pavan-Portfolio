"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { ScrambleReveal } from "./bits/ScrambleReveal";
import { ShinyText } from "./bits/ShinyText";

/**
 * Sticky side-scroll section: the title column pins on the left while the
 * content scrolls past on the right (stacks on mobile).
 */
export function SectionLayout({
  id,
  index,
  kicker,
  title,
  lead,
  children,
}: {
  id: string;
  index: string;
  kicker: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-wide gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-brand">{index}</span>
              <span className="h-px w-10 bg-brand" />
              <ShinyText text={kicker} className="label" speed={5} />
            </div>
          </Reveal>
          <ScrambleReveal
            as="h2"
            radius={150}
            className="text-3xl font-semibold leading-[1.1] tracking-tight text-text sm:text-4xl lg:text-5xl"
          >
            {title}
          </ScrambleReveal>
          {lead && (
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-text-muted">{lead}</p>
            </Reveal>
          )}
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

/** One open row: a hairline on top, lights up blue on hover. */
export function Row({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <Reveal
      delay={delay}
      className={`group relative border-t border-border py-7 transition-colors duration-300 hover:border-brand md:py-9 ${className}`}
    >
      {children}
    </Reveal>
  );
}
