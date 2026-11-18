"use client";

import { SectionLayout, Row } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { Icon } from "../Icon";
import { experience, achievements } from "@/lib/data";

export function Experience() {
  return (
    <SectionLayout
      id="experience"
      index="04"
      kicker="Journey"
      title="Where I've been building."
      lead="Roles, mentorship, and the certifications I've picked up along the way."
    >
      <div className="border-b border-border">
        {experience.map((e, i) => (
          <Row key={e.company + i} delay={0.04}>
            <div className="grid gap-4 md:grid-cols-[11rem_minmax(0,1fr)]">
              <div>
                <p className="font-mono text-sm text-text">{e.period}</p>
                <p className="mt-1 text-sm font-medium text-brand">{e.company}</p>
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-brand">
                  {e.role}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted md:text-base">{e.summary}</p>
                <ul className="mt-4 space-y-2">
                  {e.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-3 text-sm leading-relaxed text-text-muted">
                      <span className="mt-[0.55rem] h-px w-3 shrink-0 bg-brand-2" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Row>
        ))}
      </div>

      {/* certifications */}
      <Reveal className="mb-4 mt-14 flex items-center gap-3">
        <span className="label text-brand">Certifications</span>
        <span className="h-px flex-1 bg-border" />
      </Reveal>
      <div className="grid gap-x-10 sm:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.05} className="group flex gap-4 border-b border-border py-5">
            <Icon name={a.icon} className="mt-0.5 h-5 w-5 shrink-0 text-brand-2" />
            <div>
              <h4 className="font-display text-base font-semibold leading-tight tracking-tight transition-colors group-hover:text-brand">
                {a.title}
              </h4>
              <p className="mt-1 text-xs font-medium text-brand">{a.org}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{a.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionLayout>
  );
}
