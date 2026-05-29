"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HUDFrame } from "@/components/hud/HUDFrame";
import { skillGroups } from "@/lib/data";

const FlyingPosters = dynamic(() => import("@/components/3d/FlyingPosters"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

const posterImages = [
  "https://picsum.photos/seed/skill-01/500/500?grayscale",
  "https://picsum.photos/seed/skill-02/600/600?grayscale",
  "https://picsum.photos/seed/skill-03/500/500?grayscale",
  "https://picsum.photos/seed/skill-04/600/600?grayscale",
  "https://picsum.photos/seed/skill-05/500/500?grayscale",
  "https://picsum.photos/seed/skill-06/600/600?grayscale",
  "https://picsum.photos/seed/skill-07/500/500?grayscale",
  "https://picsum.photos/seed/skill-08/600/600?grayscale",
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      {/* FlyingPosters ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-25"
      >
        <FlyingPosters
          items={posterImages}
          planeWidth={260}
          planeHeight={360}
          distortion={3}
          scrollEase={0.02}
          cameraFov={45}
          cameraZ={20}
          autoScrollSpeed={0.015}
        />
        {/* dark fade so skill content stays readable on top */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/70 to-bg" />
        <div className="absolute inset-0 bg-bg/55" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <SectionHeader code="02" title="Skills / Loaded Modules" kicker="CAPABILITIES" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((g, gi) => (
            <HUDFrame
              key={g.title}
              label={g.title}
              code={`02-${String.fromCharCode(65 + gi)}`}
            >
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
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary shadow-[0_0_8px_#00ffff]"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </HUDFrame>
          ))}
        </div>

        {/* tech grid */}
        <div className="mt-10 hud-panel rounded-md px-4 sm:px-6 py-5">
          <div className="text-[10px] font-display uppercase tracking-[0.3em] text-text-muted mb-3">
            ARSENAL
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Python","TypeScript","PyTorch","TensorFlow","LangChain","FastAPI",
              "Next.js","Tailwind","Three.js","Postgres","pgvector","Redis",
              "Docker","Kubernetes","AWS","GCP","Flutter","Whisper",
              "OpenCV","Pandas","NumPy","Kafka","Flink","Hugging Face",
            ].map((t) => (
              <motion.span
                key={t}
                whileHover={{ y: -2 }}
                className="px-3 py-1 rounded-md border border-primary/25 bg-bg-soft/40 text-xs text-text-muted hover:text-primary hover:border-primary/60 hover:shadow-glow-sm transition-all"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
