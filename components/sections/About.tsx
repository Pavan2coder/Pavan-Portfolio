"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HUDFrame } from "@/components/hud/HUDFrame";
import { aboutFacts } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <SectionHeader code="01" title="About / Operator Profile" kicker="DOSSIER" />

        <div className="grid lg:grid-cols-12 gap-6">
          <HUDFrame label="BIO" code="01-A" className="lg:col-span-7">
            <div className="space-y-4 text-text leading-relaxed">
              <p>
                I&apos;m <span className="text-primary font-medium">Pavan</span> — an AI
                Engineer obsessed with building intelligent systems that feel
                inevitable. I work where{" "}
                <span className="text-accent">research meets production</span>:
                shipping LLM agents, RAG pipelines, ML services, and the boring
                infrastructure that keeps them honest.
              </p>
              <p className="text-text-muted">
                I&apos;ve trained models, evaluated them, broken them, and put them
                behind APIs that scale. I care about{" "}
                <span className="text-text">latency</span>,{" "}
                <span className="text-text">cost</span>, and{" "}
                <span className="text-text">truthfulness</span> — in that order —
                and I think great AI products are 30% modeling and 70%
                engineering.
              </p>
              <p className="text-text-muted">
                Outside of code, I read papers, ship side projects, and treat my
                terminal like a cockpit.
              </p>
            </div>
          </HUDFrame>

          <HUDFrame label="META" code="01-B" className="lg:col-span-5">
            <ul className="space-y-3">
              {aboutFacts.map((f, i) => (
                <motion.li
                  key={f.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-baseline gap-3"
                >
                  <span className="text-[10px] font-display uppercase tracking-[0.3em] text-text-muted w-20 shrink-0">
                    {f.label}
                  </span>
                  <span className="h-px flex-1 bg-primary/15" />
                  <span className="text-text">{f.value}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Mini code="AGI" v="researching" />
              <Mini code="STAGE" v="production" />
              <Mini code="MODE" v="building" />
              <Mini code="VIBE" v="cinematic" />
            </div>
          </HUDFrame>
        </div>
      </div>
    </section>
  );
}

function Mini({ code, v }: { code: string; v: string }) {
  return (
    <div className="hud-panel rounded-md px-3 py-2">
      <div className="text-[9px] font-display uppercase tracking-[0.3em] text-text-muted">
        {code}
      </div>
      <div className="text-sm text-primary font-display uppercase tracking-[0.2em]">
        {v}
      </div>
    </div>
  );
}
