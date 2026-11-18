"use client";

import { SectionLayout, Row } from "../SectionHeading";
import { Icon } from "../Icon";
import { projects } from "@/lib/data";

export function Projects() {
  const ordered = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];

  return (
    <SectionLayout
      id="projects"
      index="03"
      kicker="Selected work"
      title="Things I've shipped."
      lead="A mix of AI/ML platforms, full-stack web apps, and mobile products — each solving a concrete problem."
    >
      <div className="border-b border-border">
        {ordered.map((p, i) => (
          <Row key={p.id} delay={0.04}>
            <a href={p.link} target="_blank" rel="noreferrer" className="block">
              <div className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-text-faint">
                <span className="text-brand">{String(i + 1).padStart(2, "0")}</span>
                <span>{p.category}</span>
                <span>·</span>
                <span>{p.year}</span>
                {p.featured && <span className="text-brand-2">· Featured</span>}
              </div>
              <div className="flex items-start justify-between gap-6">
                <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-brand md:text-4xl">
                  {p.title}
                </h3>
                <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center border border-border text-text-muted transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  <Icon name="ArrowUpRight" className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted">{p.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </a>
          </Row>
        ))}
      </div>
    </SectionLayout>
  );
}
