"use client";

import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { Icon } from "../Icon";
import { experience, achievements } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-wide px-5 sm:px-8">
        <SectionHeading
          index="04"
          kicker="Journey"
          title="Where I've been building."
          lead="Roles, mentorship, and the certifications I've picked up along the way."
        />

        {/* timeline */}
        <div className="relative">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border md:left-[19px]" />
          <div className="space-y-6">
            {experience.map((e, i) => (
              <Reveal key={e.company + i} delay={i * 0.06} className="relative pl-12 md:pl-16">
                {/* node */}
                <div className="absolute left-0 top-1.5 grid h-8 w-8 place-items-center rounded-full border border-border-strong bg-bg-3 text-brand md:h-10 md:w-10">
                  <Icon name="Briefcase" className="h-4 w-4" />
                </div>

                <div className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-brand-line">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {e.role}
                    </h3>
                    <span className="chip">{e.period}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-brand">{e.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {e.summary}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {e.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="flex gap-2.5 text-sm leading-relaxed text-text-muted"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* achievements */}
        <div className="mt-16">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="label text-brand">Certifications</span>
              <span className="h-px flex-1 bg-hairline" />
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.05} className="h-full">
                <div className="conic-border group h-full">
                  <div className="relative z-10 h-full p-5">
                    <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-border-strong bg-bg-3 text-brand transition-transform duration-300 group-hover:-translate-y-0.5">
                      <Icon name={a.icon} className="h-5 w-5" />
                    </div>
                    <h4 className="font-display text-base font-semibold leading-tight tracking-tight">
                      {a.title}
                    </h4>
                    <p className="mt-1 text-xs font-medium text-brand">{a.org}</p>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {a.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
