"use client";

import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { ScrambleReveal } from "../bits/ScrambleReveal";
import { Icon } from "../Icon";
import { about, profile } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-wide px-5 sm:px-8">
        <SectionHeading index="01" kicker="About" title={about.heading} />

        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          {/* narrative */}
          <Reveal className="space-y-5 rounded-lg border border-border bg-card p-7 md:p-10">
            {/* interactive decode line — dots reveal into text near the cursor */}
            <div className="mb-2 border-b border-hairline pb-5">
              <span className="label mb-3 block text-brand">
                {"// move your cursor across to decode"}
              </span>
              <ScrambleReveal
                radius={130}
                className="text-lg font-medium tracking-tight md:text-xl"
              >
                {profile.tagline}
              </ScrambleReveal>
            </div>
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-text-muted md:text-lg"
              >
                {p}
              </p>
            ))}
            <div className="flex flex-wrap gap-2 pt-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="chip hover:border-brand-line hover:text-text"
              >
                <Icon name="Github" className="h-3.5 w-3.5" />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="chip hover:border-brand-line hover:text-text"
              >
                <Icon name="Linkedin" className="h-3.5 w-3.5" />
                LinkedIn
              </a>
              <span className="chip">
                <Icon name="MapPin" className="h-3.5 w-3.5" />
                {profile.location}
              </span>
            </div>
          </Reveal>

          {/* fact cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {about.facts.map((f, i) => (
              <Reveal
                key={f.label}
                delay={i * 0.05}
                className="group flex items-start gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-brand-line"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border-strong bg-bg-3 text-brand">
                  <Icon name={factIcon(i)} className="h-5 w-5" />
                </div>
                <div>
                  <div className="label mb-1.5">{f.label}</div>
                  <div className="text-sm font-medium leading-snug text-text">
                    {f.value}
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

function factIcon(i: number) {
  return ["GraduationCap", "BrainCircuit", "Code2", "MapPin"][i] ?? "Sparkles";
}
