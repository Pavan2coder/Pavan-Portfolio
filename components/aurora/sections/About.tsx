"use client";

import { SectionLayout } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { ScrambleReveal } from "../bits/ScrambleReveal";
import { Icon } from "../Icon";
import { about, profile } from "@/lib/data";

export function About() {
  return (
    <SectionLayout id="about" index="01" kicker="About" title={about.heading}>
      <Reveal className="mb-10 border-l-2 border-brand pl-5">
        <span className="label mb-3 block text-brand">{"// move your cursor across to decode"}</span>
        <ScrambleReveal radius={200} className="text-xl font-medium tracking-tight md:text-2xl">
          {profile.tagline}
        </ScrambleReveal>
      </Reveal>

      <div className="space-y-5">
        {about.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p className={i === 0 ? "text-xl leading-relaxed text-text md:text-2xl" : "text-base leading-relaxed text-text-muted md:text-lg"}>
              {p}
            </p>
          </Reveal>
        ))}
      </div>

      {/* facts as a spec sheet */}
      <dl className="mt-12 border-b border-border">
        {about.facts.map((f, i) => (
          <Reveal
            key={f.label}
            delay={i * 0.05}
            className="group grid grid-cols-[2rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 border-t border-border py-5 sm:grid-cols-[2rem_10rem_minmax(0,1fr)]"
          >
            <Icon name={factIcon(i)} className="h-4 w-4 translate-y-0.5 text-brand" />
            <dt className="label">{f.label}</dt>
            <dd className="col-start-2 text-base font-medium text-text transition-colors group-hover:text-brand-2 sm:col-start-3">
              {f.value}
            </dd>
          </Reveal>
        ))}
      </dl>

      <div className="mt-8 flex flex-wrap gap-2">
        <a href={profile.github} target="_blank" rel="noreferrer" className="chip hover:border-brand hover:text-text">
          <Icon name="Github" className="h-3.5 w-3.5" /> GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="chip hover:border-brand hover:text-text">
          <Icon name="Linkedin" className="h-3.5 w-3.5" /> LinkedIn
        </a>
      </div>
    </SectionLayout>
  );
}

function factIcon(i: number) {
  return ["GraduationCap", "BrainCircuit", "Code2", "MapPin"][i] ?? "Sparkles";
}
