"use client";

import { SectionLayout, Tile, type Tone } from "../SectionHeading";
import { ScrollVelocity } from "../bits/ScrollVelocity";
import { TechUniverse } from "../bits/TechUniverse";
import { Icon } from "../Icon";
import { skillDomains, techMarquee } from "@/lib/data";

const tones: Tone[] = ["red", "cream", "cream", "green"];
const spans = ["lg:col-span-5", "lg:col-span-7", "lg:col-span-7", "lg:col-span-5"];

export function Skills() {
  return (
    <SectionLayout
      id="skills"
      index="02"
      kicker="Toolkit"
      title="What I build with."
      lead="A full-stack toolkit spanning machine learning, web, and mobile — chosen to ship real, reliable products."
    >
      <Tile tone="green" delay={0.05} className="flex flex-col justify-between gap-6 md:col-span-6 lg:col-span-4">
        <span className="bubble bubble-mint self-start text-sm">{techMarquee.length} tools · 4 domains</span>
        <Icon name="Cpu" className="h-24 w-24 text-brand" strokeWidth={1.25} />
      </Tile>

      {skillDomains.map((d, i) => (
        <Tile key={d.title} tone={tones[i]} delay={i * 0.05} className={`md:col-span-6 ${spans[i]}`}>
          <div className="flex items-start justify-between gap-4">
            <h3 className="display text-5xl md:text-6xl">{d.title}</h3>
            <Icon name={d.icon} className="h-8 w-8 shrink-0 text-brand" />
          </div>
          <p className="mt-4 text-base leading-relaxed text-text-muted">{d.blurb}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {d.items.map((it) => (
              <span key={it} className="chip">{it}</span>
            ))}
          </div>
        </Tile>
      ))}

      <Tile tone="red" className="!px-0 !py-6">
        <ScrollVelocity items={techMarquee} baseVelocity={1.2} />
      </Tile>

      <Tile tone="ink">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h3 className="display text-5xl md:text-6xl">My stack, in orbit.</h3>
          <span className="bubble bubble-mint hidden text-sm sm:inline-flex">↔ drag to rotate</span>
        </div>
        <TechUniverse />
      </Tile>
    </SectionLayout>
  );
}
