"use client";

import { SectionLayout, Tile, type Tone } from "../SectionHeading";
import { Icon } from "../Icon";
import { projects } from "@/lib/data";

// featured pair goes big (6+6), the rest fill a row of three
const looks: { tone: Tone; span: string }[] = [
  { tone: "green", span: "lg:col-span-6" },
  { tone: "red", span: "lg:col-span-6" },
  { tone: "cream", span: "md:col-span-6 lg:col-span-4" },
  { tone: "cream", span: "md:col-span-6 lg:col-span-4" },
  { tone: "green", span: "lg:col-span-4" },
];

export function Projects() {
  const ordered = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];

  return (
    <SectionLayout
      id="projects"
      index="03"
      kicker="Selected work"
      title="Things I've shipped."
      lead="AI/ML platforms, full-stack web apps, and mobile products — each solving a concrete problem."
    >
      <Tile tone="mint" delay={0.05} className="flex flex-col justify-between gap-6 lg:col-span-4">
        <span className="font-mono text-sm font-semibold">[ projects ]</span>
        <p className="display text-[9rem] leading-[0.8]">{String(projects.length).padStart(2, "0")}</p>
        <span className="font-mono text-sm font-semibold">shipped since 2024</span>
      </Tile>

      {ordered.map((p, i) => {
        const look = looks[i] ?? looks[2];
        return (
          <Tile key={p.id} tone={look.tone} delay={(i % 3) * 0.05} className={`group ${look.span}`}>
            <a href={p.link} target="_blank" rel="noreferrer" className="flex h-full flex-col">
              <div className="flex items-center justify-between font-mono text-xs font-semibold text-text-muted">
                <span>
                  {String(i + 1).padStart(2, "0")} · {p.category} · {p.year}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-full border border-border-strong transition-all group-hover:bg-brand group-hover:text-[var(--on-brand)]">
                  <Icon name="ArrowUpRight" className="h-5 w-5" />
                </span>
              </div>
              <h3 className={`display mt-6 ${p.featured ? "text-6xl md:text-7xl" : "text-5xl"}`}>{p.title}</h3>
              <p className="mt-4 flex-1 text-base leading-relaxed text-text-muted">{p.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </a>
          </Tile>
        );
      })}
    </SectionLayout>
  );
}
