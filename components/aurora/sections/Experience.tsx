"use client";

import { SectionLayout, Tile, type Tone } from "../SectionHeading";
import { Icon } from "../Icon";
import { experience, achievements } from "@/lib/data";

const tones: Tone[] = ["green", "cream", "red"];

export function Experience() {
  return (
    <SectionLayout
      id="experience"
      index="04"
      kicker="Journey"
      title="Where I've been building."
      lead="Roles, mentorship, and the certifications I've picked up along the way."
      headClass="lg:col-span-12"
    >
      {experience.map((e, i) => (
        <Tile key={e.company + i} tone={tones[i % 3]} delay={i * 0.05} className="flex flex-col md:col-span-6 lg:col-span-4">
          <span className="bubble bubble-ink self-start text-sm">{e.period}</span>
          <h3 className="display mt-8 text-5xl md:text-6xl">{e.role}</h3>
          <p className="mt-2 font-mono text-xs font-semibold text-text-muted">{e.company}</p>
          <p className="mt-5 text-base leading-relaxed text-text-muted">{e.summary}</p>
          <ul className="mt-4 space-y-2">
            {e.bullets.map((b, bi) => (
              <li key={bi} className="flex gap-3 text-sm leading-relaxed text-text-muted">
                <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {b}
              </li>
            ))}
          </ul>
        </Tile>
      ))}

      {/* certifications: card-in-card on red */}
      <Tile tone="red">
        <h3 className="display mb-6 text-5xl md:text-6xl">Certifications</h3>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a) => (
            <div key={a.title} className="tile-cream rounded-[22px] bg-[#ece9ff] p-5 text-[#2a1b5c]">
              <div className="flex justify-between font-mono text-xs font-semibold text-[#3b5bff]">
                <span>{a.org}</span>
                <Icon name={a.icon} className="h-4 w-4" />
              </div>
              <h4 className="display mt-6 text-3xl italic text-[#3b5bff]">{a.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{a.description}</p>
            </div>
          ))}
        </div>
      </Tile>
    </SectionLayout>
  );
}
