"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedSectionHeader } from "@/components/ui/AnimatedSectionHeader";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { experience } from "@/lib/data";

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <AnimatedSectionHeader
          code="04"
          title="Experience / Mission Log"
          kicker="TIMELINE"
        />

        <div className="mt-12 space-y-6">
          {experience.map((e, i) => (
            <AnimatedCard key={`${e.company}-${i}`} delay={i * 0.15}>
              <article
                data-cursor="target"
                className="relative overflow-hidden p-6 sm:p-8"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

                <div className="relative grid md:grid-cols-12 gap-6">
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-2 text-[10px] font-display uppercase tracking-[0.32em] text-text-muted">
                      <span className="text-primary">/04·{String.fromCharCode(65 + i)}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_#a78bfa] animate-pulse" />
                    </div>
                    <div className="mt-3 text-[11px] font-display uppercase tracking-[0.25em] text-primary glow-text">
                      {e.period}
                    </div>
                  </div>

                  <div className="md:col-span-9">
                    <h3 className="font-display text-xl sm:text-2xl text-text">
                      {e.role}{" "}
                      <span className="text-primary">@ {e.company}</span>
                    </h3>
                    <ul className="mt-4 space-y-2 text-text-muted">
                      {e.bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-2">
                          <span className="text-primary mt-1 select-none">›</span>
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
