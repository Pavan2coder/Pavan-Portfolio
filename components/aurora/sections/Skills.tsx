"use client";

import { SectionLayout, Row } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { ScrollVelocity } from "../bits/ScrollVelocity";
import { TechUniverse } from "../bits/TechUniverse";
import { Icon } from "../Icon";
import { skillDomains, techMarquee } from "@/lib/data";

export function Skills() {
  return (
    <>
      <SectionLayout
        id="skills"
        index="02"
        kicker="Toolkit"
        title="What I build with."
        lead="A full-stack toolkit spanning machine learning, web, and mobile — chosen to ship real, reliable products."
      >
        <div className="border-b border-border">
          {skillDomains.map((d, i) => (
            <Row key={d.title} delay={i * 0.05}>
              <div className="grid gap-4 sm:grid-cols-[3rem_minmax(0,1fr)]">
                <span className="font-mono text-sm text-text-faint transition-colors group-hover:text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-brand md:text-3xl">
                      {d.title}
                    </h3>
                    <Icon name={d.icon} className="h-6 w-6 shrink-0 text-text-faint transition-colors group-hover:text-brand-2" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted md:text-base">{d.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {d.items.map((it) => (
                      <span key={it} className="chip">{it}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Row>
          ))}
        </div>
      </SectionLayout>

      {/* full-bleed marquee + orbit */}
      <div className="relative border-y border-border py-7">
        <ScrollVelocity items={techMarquee} baseVelocity={1.2} />
      </div>
      <div className="mx-auto max-w-wide px-5 py-20 sm:px-8">
        <Reveal className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="label text-brand">SYS·MAP</span>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">My stack, in orbit.</h3>
          </div>
          <span className="label hidden text-brand sm:block">↔ drag to rotate · 360°</span>
        </Reveal>
        <Reveal delay={0.1}>
          <TechUniverse />
        </Reveal>
      </div>
    </>
  );
}
