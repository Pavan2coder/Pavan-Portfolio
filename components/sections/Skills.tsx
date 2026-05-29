"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedSectionHeader } from "@/components/ui/AnimatedSectionHeader";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { skillGroups } from "@/lib/data";

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <AnimatedSectionHeader code="03" title="Skills / Loaded Modules" kicker="CAPABILITIES" />

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((g, gi) => (
            <AnimatedCard key={g.title} delay={gi * 0.15}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-lg uppercase tracking-wider text-primary">
                    {g.title}
                  </h3>
                  <span className="text-[10px] font-display uppercase tracking-[0.3em] text-text-muted">
                    {String.fromCharCode(65 + gi)}
                  </span>
                </div>
                <ul className="space-y-4">
                  {g.items.map((s, i) => (
                    <li key={s.name}>
                      <div className="flex items-baseline justify-between">
                        <span className="text-text font-medium">{s.name}</span>
                        <span className="font-mono text-[11px] text-primary">
                          {s.level}%
                        </span>
                      </div>
                      <div className="mt-1.5 relative h-[3px] overflow-hidden rounded-full bg-text-dim/15">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${s.level}%` } : {}}
                          transition={{ duration: 0.9, delay: gi * 0.15 + 0.5 + 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary shadow-[0_0_8px_#00ffff]"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* tech grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 hud-panel rounded-md px-4 sm:px-6 py-5"
        >
          <div className="text-[10px] font-display uppercase tracking-[0.3em] text-text-muted mb-3">
            ARSENAL
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Python","TypeScript","PyTorch","TensorFlow","LangChain","FastAPI",
              "Next.js","Tailwind","Three.js","Postgres","pgvector","Redis",
              "Docker","Kubernetes","AWS","GCP","Flutter","Whisper",
              "OpenCV","Pandas","NumPy","Kafka","Flink","Hugging Face",
            ].map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.9 + i * 0.02 }}
                whileHover={{ y: -2, scale: 1.05 }}
                className="px-3 py-1 rounded-md border border-primary/25 bg-bg-soft/40 text-xs text-text-muted hover:text-primary hover:border-primary/60 hover:shadow-glow-sm transition-all cursor-pointer"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
