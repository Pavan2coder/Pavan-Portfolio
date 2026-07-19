"use client";

import { Reveal } from "./Reveal";
import { ScrambleReveal } from "./bits/ScrambleReveal";
import { ShinyText } from "./bits/ShinyText";

/**
 * Consistent section header: a mono index label + a large display title,
 * with an optional lead sentence underneath.
 */
export function SectionHeading({
  index,
  kicker,
  title,
  lead,
}: {
  index: string;
  kicker: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="mb-12 max-w-2xl md:mb-16">
      <Reveal>
        <div className="mb-4 flex items-center gap-3">
          <span className="label text-brand">{index}</span>
          <span className="h-px w-8 bg-brand-line" />
          <ShinyText text={kicker} className="label" speed={5} />
        </div>
      </Reveal>
      <ScrambleReveal
        as="h2"
        radius={150}
        className="text-2xl font-semibold leading-[1.15] tracking-tight text-text sm:text-3xl md:text-4xl"
      >
        {title}
      </ScrambleReveal>
      {lead && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-base leading-relaxed text-text-muted md:text-lg">
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
