"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollStack } from "@/components/ui/ScrollStack";
import { projects } from "@/lib/data";
import { ExternalLink } from "lucide-react";

const statusColor: Record<string, string> = {
  DEPLOYED: "text-emerald-400 border-emerald-400/40 bg-emerald-400/5",
  ACTIVE: "text-primary border-primary/40 bg-primary/5",
  RESEARCH: "text-amber-300 border-amber-300/40 bg-amber-300/5",
  BETA: "text-fuchsia-300 border-fuchsia-300/40 bg-fuchsia-300/5",
};

export function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <SectionHeader
          code="03"
          title="Projects / Deployed Operations"
          kicker="MISSIONS"
        />

        {/* cinematic ScrollStack — cards lock and stack as you scroll */}
        <ScrollStack className="relative" topOffset={120} gap={28}>
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="target"
              className="holo-card relative overflow-hidden p-6 sm:p-8"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

              <div className="relative grid md:grid-cols-12 gap-6">
                <div className="md:col-span-3">
                  <div className="flex items-center gap-3 text-[10px] font-display uppercase tracking-[0.32em] text-text-muted">
                    <span className="text-primary">/OP·{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_#00ffff] animate-pulse" />
                  </div>
                  <div
                    className={`mt-3 inline-flex px-2.5 py-1 rounded-sm border text-[10px] font-display tracking-[0.25em] ${
                      statusColor[p.status] ?? "text-primary border-primary/40"
                    }`}
                  >
                    {p.status}
                  </div>
                  <div className="mt-6 hidden md:block">
                    <div className="h-px w-full bg-primary/20" />
                    <div className="mt-3 text-[10px] font-display uppercase tracking-[0.32em] text-text-muted">
                      STACK
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[10px] font-mono rounded-sm border border-primary/20 text-primary/80 bg-primary/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-9">
                  <h3 className="font-display text-2xl sm:text-3xl text-text glow-text">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-text-muted leading-relaxed">
                    {p.description}
                  </p>

                  <div className="mt-5 md:hidden flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] font-mono rounded-sm border border-primary/20 text-primary/80 bg-primary/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="target"
                      className="ml-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-primary/40 text-[11px] font-display uppercase tracking-[0.22em] text-primary hover:bg-primary/10 hover:shadow-glow-sm transition-all"
                    >
                      OPEN <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
