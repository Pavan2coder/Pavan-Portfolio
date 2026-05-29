"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedSectionHeader } from "@/components/ui/AnimatedSectionHeader";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { aboutFacts } from "@/lib/data";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <AnimatedSectionHeader code="01" title="About / Operator Profile" kicker="DOSSIER" />

        <div className="mt-12 grid lg:grid-cols-12 gap-6">
          <AnimatedCard delay={0} className="lg:col-span-7">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg uppercase tracking-wider text-primary">BIO</h3>
                <span className="text-[10px] font-display uppercase tracking-[0.3em] text-text-muted">A</span>
              </div>
              <div className="space-y-4 text-text leading-relaxed">
                <p>
                  I&apos;m <span className="text-primary font-medium">Athava Sri Pavan</span> — a 
                  Computer Science Engineering student at{" "}
                  <span className="text-accent">MLR Institute of Technology, Hyderabad</span>, 
                  specializing in AI, machine learning, and full-stack development.
                </p>
                <p className="text-text-muted">
                  I build modern web and mobile applications using the{" "}
                  <span className="text-text">MERN stack</span>,{" "}
                  <span className="text-text">Python</span>,{" "}
                  <span className="text-text">Flutter</span>, and AI technologies. 
                  I&apos;ve worked on real-world institutional platforms, machine learning systems, 
                  and collaborative student innovation projects.
                </p>
                <p className="text-text-muted">
                  I actively contribute to the{" "}
                  <span className="text-primary">Centre for Innovation and Entrepreneurship (CIE)</span>, 
                  participate in AI hackathons, and mentor students in programming and development.
                </p>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.15} className="lg:col-span-5">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg uppercase tracking-wider text-primary">META</h3>
                <span className="text-[10px] font-display uppercase tracking-[0.3em] text-text-muted">B</span>
              </div>
              <ul className="space-y-3">
                {aboutFacts.map((f, i) => (
                  <motion.li
                    key={f.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.05 }}
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
                <Mini code="YEAR" v="2nd Year" delay={0.5} isInView={isInView} />
                <Mini code="STAGE" v="Student" delay={0.55} isInView={isInView} />
                <Mini code="MODE" v="Building" delay={0.6} isInView={isInView} />
                <Mini code="VIBE" v="Futuristic" delay={0.65} isInView={isInView} />
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}

function Mini({ code, v, delay, isInView }: { code: string; v: string; delay: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay }}
      className="hud-panel rounded-md px-3 py-2"
    >
      <div className="text-[9px] font-display uppercase tracking-[0.3em] text-text-muted">
        {code}
      </div>
      <div className="text-sm text-primary font-display uppercase tracking-[0.2em]">
        {v}
      </div>
    </motion.div>
  );
}
