"use client";

import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { TiltCard } from "../bits/TiltCard";
import { Icon } from "../Icon";
import { projects } from "@/lib/data";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-wide px-5 sm:px-8">
        <SectionHeading
          index="03"
          kicker="Selected work"
          title="Things I've shipped."
          lead="A mix of AI/ML platforms, full-stack web apps, and mobile products — each solving a concrete problem."
        />

        {/* featured — large */}
        <div className="grid gap-5 lg:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <ProjectCard project={p} large />
            </Reveal>
          ))}
        </div>

        {/* rest — compact */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  large = false,
}: {
  project: (typeof projects)[number];
  large?: boolean;
}) {
  return (
    <TiltCard>
      <div className="flex h-full flex-col p-7">
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="chip">{project.category}</span>
          <span className="label">{project.year}</span>
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="group/link flex items-start justify-between gap-4"
        >
          <h3
            className={`font-display font-semibold leading-tight tracking-tight transition-colors group-hover/link:text-brand ${
              large ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            {project.title}
          </h3>
          <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-text-muted transition-all group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:border-brand-line group-hover/link:text-brand">
            <Icon name="ArrowUpRight" className="h-4 w-4" />
          </span>
        </a>

        <p
          className={`mt-4 flex-1 leading-relaxed text-text-muted ${
            large ? "text-base" : "text-sm"
          }`}
        >
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-hairline bg-bg-3 px-2.5 py-1 font-mono text-[11px] text-text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </TiltCard>
  );
}
