"use client";

import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { SpotlightCard } from "../SpotlightCard";
import { ScrollVelocity } from "../bits/ScrollVelocity";
import { TechUniverse } from "../bits/TechUniverse";
import { Icon } from "../Icon";
import { skillDomains, techMarquee } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-wide px-5 sm:px-8">
        <SectionHeading
          index="02"
          kicker="Toolkit"
          title="What I build with."
          lead="A full-stack toolkit spanning machine learning, web, and mobile — chosen to ship real, reliable products."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {skillDomains.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.06}>
              <SpotlightCard className="h-full p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-border-strong bg-bg-3 text-brand">
                    <Icon name={d.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {d.title}
                  </h3>
                </div>
                <p className="mb-5 text-sm leading-relaxed text-text-muted">
                  {d.blurb}
                </p>
                <div className="flex flex-wrap gap-2">
                  {d.items.map((it) => (
                    <span key={it} className="chip">
                      {it}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* scroll-velocity marquee */}
      <div className="relative mt-14 border-y border-hairline py-7">
        <ScrollVelocity items={techMarquee} baseVelocity={2.5} />
      </div>

      {/* rotating tech universe */}
      <div className="mx-auto mt-20 max-w-wide px-5 sm:px-8">
        <Reveal>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="label text-brand">SYS·MAP</span>
                <span className="h-px w-8 bg-brand-line" />
              </div>
              <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                My stack, in orbit.
              </h3>
            </div>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-brand sm:block">
              ↔ drag to rotate · 360°
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <TechUniverse />
        </Reveal>
      </div>
    </section>
  );
}
