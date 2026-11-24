"use client";

import { SectionLayout, Tile } from "../SectionHeading";
import { ScrambleReveal } from "../bits/ScrambleReveal";
import { Icon } from "../Icon";
import { about, profile } from "@/lib/data";

const factIcons = ["GraduationCap", "BrainCircuit", "Code2", "MapPin"];

export function About() {
  return (
    <SectionLayout id="about" index="01" kicker="About" title="AI meets product.">
      <Tile tone="red" delay={0.05} className="flex flex-col justify-between gap-8 lg:col-span-4">
        <span className="font-mono text-sm font-semibold">{"// hover to decode"}</span>
        <ScrambleReveal radius={200} className="display !font-display text-5xl !leading-[0.9]">
          {profile.tagline}
        </ScrambleReveal>
        <span className="font-mono text-sm font-semibold">[ {profile.location} ]</span>
      </Tile>

      <Tile delay={0.05} className="space-y-5 lg:col-span-7">
        <p className="text-xl font-medium leading-relaxed md:text-2xl">{about.paragraphs[0]}</p>
        {about.paragraphs.slice(1).map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-text-muted md:text-lg">
            {p}
          </p>
        ))}
      </Tile>

      <Tile tone="green" delay={0.1} className="lg:col-span-5">
        <dl className="divide-y divide-[rgba(236, 233, 255,0.14)]">
          {about.facts.map((f, i) => (
            <div key={f.label} className="flex gap-4 py-4 first:pt-0 last:pb-0">
              <Icon name={factIcons[i] ?? "Sparkles"} className="mt-1 h-5 w-5 shrink-0 text-brand" />
              <div>
                <dt className="font-mono text-xs font-semibold uppercase tracking-widest text-text-faint">{f.label}</dt>
                <dd className="mt-1 text-lg font-medium">{f.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </Tile>
    </SectionLayout>
  );
}
