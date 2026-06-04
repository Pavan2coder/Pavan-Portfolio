"use client";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { TypingEffect } from "@/components/animations/TypingEffect";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-36 pb-24 sm:pt-40 sm:pb-32 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* left column */}
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2.5 rounded-full hud-panel px-4 py-1.5 text-[11px] tracking-[0.18em] text-text-muted"
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
              AVAILABLE FOR WORK
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-7 font-display text-5xl sm:text-7xl lg:text-[5.6rem] leading-[0.95] font-semibold tracking-tight text-balance"
            >
              <span className="block text-text">Pavan</span>
              <span className="block mt-1 text-gradient-cyan">Portfolio</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-7 max-w-xl text-base sm:text-lg text-text-muted"
            >
              <TypingEffect
                text="AI Engineer · ML Developer · Full-Stack"
                speed={28}
                className="text-text"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-5 max-w-xl text-text-muted leading-relaxed"
            >
              B.Tech Computer Science student building intelligent systems,
              scalable web applications, and refined digital experiences — where
              machine learning meets thoughtful design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button glow onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                View Projects
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get in Touch
              </Button>
              <div className="flex items-center gap-2 ml-1">
                <IconLink href={profile.github} label="GitHub">
                  <Github size={16} />
                </IconLink>
                <IconLink href={profile.linkedin} label="LinkedIn">
                  <Linkedin size={16} />
                </IconLink>
                <IconLink href={`mailto:${profile.email}`} label="Email">
                  <Mail size={16} />
                </IconLink>
              </div>
            </motion.div>

            {/* stat strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 grid grid-cols-3 gap-4 max-w-lg"
            >
              {[
                { k: "Projects", v: "5+" },
                { k: "Tech Stack", v: "15+" },
                { k: "Experience", v: "2 yrs" },
              ].map((s) => (
                <div key={s.k} className="hud-panel rounded-2xl px-4 py-4">
                  <div className="font-display text-2xl text-text">{s.v}</div>
                  <div className="mt-1 text-[12px] tracking-wide text-text-muted">
                    {s.k}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* right column — calm floating glass orb */}
          <div className="lg:col-span-5 relative h-[420px] sm:h-[520px] lg:h-[600px] hidden md:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 grid place-items-center"
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                className="relative h-[78%] w-[78%]"
              >
                {/* soft ambient bloom */}
                <div className="absolute inset-[-12%] rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute inset-[10%] rounded-full bg-secondary/20 blur-3xl" />

                {/* glass sphere */}
                <div className="absolute inset-0 rounded-full hud-panel-strong overflow-hidden">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-transparent to-secondary/25" />
                  {/* top highlight */}
                  <div className="absolute left-[18%] top-[12%] h-[30%] w-[40%] rounded-full bg-white/15 blur-2xl" />
                  {/* thin orbit rings */}
                  <div className="absolute inset-[14%] rounded-full border border-white/10" />
                  <div className="absolute inset-[30%] rounded-full border border-white/10" />
                </div>

                {/* orbiting ring */}
                <div className="absolute inset-[-6%] rounded-full border border-primary/20 animate-spin-slow" />
                <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-secondary shadow-glow-sm" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-16 flex items-center gap-2 text-[11px] tracking-[0.22em] text-text-muted"
        >
          <ArrowDown size={13} className="animate-bounce text-primary" />
          SCROLL
        </motion.div>
      </div>
    </section>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="h-10 w-10 grid place-items-center rounded-full hud-panel text-text-muted hover:text-primary transition-colors"
    >
      {children}
    </a>
  );
}
