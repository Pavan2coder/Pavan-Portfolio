"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedSectionHeader } from "@/components/ui/AnimatedSectionHeader";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { achievements } from "@/lib/data";
import { Award, Zap, Trophy, Cog } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "🎓": <Award size={20} className="text-primary" />,
  "🚀": <Zap size={20} className="text-secondary" />,
  "🏆": <Trophy size={20} className="text-accent" />,
  "⚙️": <Cog size={20} className="text-primary" />,
};

export function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="achievements" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <AnimatedSectionHeader
          code="06"
          title="Achievements / Recognition"
          kicker="HONORS"
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, i) => (
            <AnimatedCard key={achievement.title} delay={i * 0.1}>
              <div className="p-6 flex flex-col items-center text-center space-y-3 h-full">
                <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/40 grid place-items-center">
                  {iconMap[achievement.icon]}
                  <div className="absolute inset-0 rounded-full border border-primary/30 animate-spin-slow" />
                </div>
                
                <div>
                  <h3 className="font-display text-sm tracking-[0.2em] text-text uppercase">
                    {achievement.title}
                  </h3>
                  <p className="mt-2 text-xs text-text-muted leading-relaxed">
                    {achievement.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[9px] font-display uppercase tracking-[0.3em] text-primary">
                  <span className="h-1 w-1 rounded-full bg-primary shadow-glow-sm animate-pulse" />
                  VERIFIED
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Achievement counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <div className="hud-panel rounded-md px-6 py-4 inline-flex items-center gap-4">
            <div className="text-center">
              <div className="font-display text-3xl text-primary glow-text">
                {achievements.length}
              </div>
              <div className="text-[10px] font-display uppercase tracking-[0.3em] text-text-muted mt-1">
                ACHIEVEMENTS
              </div>
            </div>
            <div className="h-12 w-px bg-primary/20" />
            <div className="text-center">
              <div className="font-display text-3xl text-secondary glow-text">
                100%
              </div>
              <div className="text-[10px] font-display uppercase tracking-[0.3em] text-text-muted mt-1">
                COMPLETION
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
