"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { profile } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { TypingEffect } from "@/components/animations/TypingEffect";
import { RadarScanner } from "@/components/hud/RadarScanner";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const AICore = dynamic(
  () => import("@/components/3d/AICore").then((m) => m.AICore),
  { ssr: false, loading: () => <div className="absolute inset-0" /> }
);

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-24 sm:pt-32 sm:pb-32 overflow-hidden"
    >
      {/* 3D core — spreads across the whole hero as an ambient background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      >
        <AICore className="absolute inset-0" />
        {/* soft fade so text on the left stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-transparent lg:from-bg/95 lg:via-bg/40" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* left column */}
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3 text-[10px] font-display uppercase tracking-[0.4em] text-text-muted"
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
              SYSTEM ONLINE — READY FOR INPUT
              <span className="hidden sm:inline-block h-px w-12 bg-primary/40" />
              <span className="hidden sm:inline">SECTOR 00</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] leading-[0.95] font-bold text-balance"
            >
              <span className="block text-text">PAVAN</span>
              <span className="block mt-2 text-gradient-cyan glow-text">
                AI SYSTEMS
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 max-w-xl"
            >
              <div className="hud-panel rounded-md px-4 py-3 font-mono text-sm sm:text-base">
                <span className="text-primary">{">"} </span>
                <TypingEffect
                  text="AI Engineer • ML Developer • Building Intelligent Systems"
                  speed={22}
                  className="text-text"
                />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-5 max-w-xl text-text-muted leading-relaxed"
            >
              I design and ship intelligent systems — LLM agents, RAG pipelines, and
              ML services — engineered for production. Welcome to my operating
              system.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button glow onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                ENGAGE / VIEW PROJECTS
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById("assistant")?.scrollIntoView({ behavior: "smooth" })}
              >
                BOOT J.A.R.V.I.S
              </Button>
              <div className="flex items-center gap-2 ml-1">
                <IconLink href={profile.github} label="GitHub">
                  <Github size={15} />
                </IconLink>
                <IconLink href={profile.linkedin} label="LinkedIn">
                  <Linkedin size={15} />
                </IconLink>
                <IconLink href={`mailto:${profile.email}`} label="Email">
                  <Mail size={15} />
                </IconLink>
              </div>
            </motion.div>

            {/* stat strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl"
            >
              {[
                { k: "MODELS", v: "23+" },
                { k: "DEPLOYS", v: "47+" },
                { k: "AGENTS", v: "12" },
                { k: "UPTIME", v: "99.9%" },
              ].map((s) => (
                <div key={s.k} className="hud-panel rounded-md px-3 py-3">
                  <div className="text-[10px] font-display uppercase tracking-[0.3em] text-text-muted">
                    {s.k}
                  </div>
                  <div className="mt-1 font-display text-xl text-primary glow-text">
                    {s.v}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* right column — HUD overlays only (3D core is now a section-wide background) */}
          <div className="lg:col-span-5 relative h-[480px] sm:h-[560px] lg:h-[640px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="pointer-events-none absolute inset-0 grid place-items-center"
            >
              {/* concentric rings overlay */}
              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                <div className="relative h-[92%] w-[92%]">
                  <div className="absolute inset-0 rounded-full border border-primary/25 animate-spin-slow" />
                  <div className="absolute inset-[6%] rounded-full border border-primary/20 animate-spin-reverse" />
                  <div className="absolute inset-[14%] rounded-full border border-primary/15" />
                  <div className="absolute inset-[24%] rounded-full border border-primary/10" />
                  {/* radar pings */}
                  <div className="absolute inset-[18%] rounded-full border border-primary/40 radar-ping" />
                  <div
                    className="absolute inset-[18%] rounded-full border border-primary/40 radar-ping"
                    style={{ animationDelay: "1.2s" }}
                  />
                  <div
                    className="absolute inset-[18%] rounded-full border border-primary/40 radar-ping"
                    style={{ animationDelay: "2.4s" }}
                  />
                  <Notch className="top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  <Notch className="left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-90" />
                  <Notch className="right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-90" />
                  <Notch className="bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" />
                  {/* tick marks every 30 degrees */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span
                      key={i}
                      className="absolute left-1/2 top-1/2 h-[42%] w-px origin-top bg-primary/15"
                      style={{
                        transform: `translate(-50%, 0) rotate(${i * 30}deg)`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* HUD tags */}
              <HudTag
                className="top-6 left-2"
                code="01"
                title="NEURAL CORE"
                value="ONLINE"
              />
              <HudTag
                className="bottom-8 right-2"
                code="02"
                title="THROUGHPUT"
                value="2.4 TFLOPs"
              />
              <HudTag
                className="top-12 right-4"
                code="03"
                title="LATENCY"
                value="187 ms"
              />

              {/* small radar */}
              <div className="absolute bottom-4 left-2 hidden sm:block opacity-90">
                <RadarScanner size={120} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-12 flex items-center justify-center gap-2 text-[10px] font-display uppercase tracking-[0.4em] text-text-muted"
        >
          <ArrowDown size={12} className="animate-bounce text-primary" />
          SCROLL TO CONTINUE
        </motion.div>
      </div>
    </section>
  );
}

function Notch({ className }: { className?: string }) {
  return (
    <div
      className={`absolute h-3 w-3 bg-primary/80 shadow-[0_0_10px_#00ffff] rounded-sm ${className}`}
    />
  );
}

function HudTag({
  className,
  code,
  title,
  value,
}: {
  className?: string;
  code: string;
  title: string;
  value: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className={`absolute hud-panel rounded-md px-3 py-2 min-w-[140px] ${className}`}
    >
      <div className="flex items-center justify-between text-[9px] font-display uppercase tracking-[0.3em] text-text-muted">
        <span>/{code}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow-sm animate-pulse" />
      </div>
      <div className="mt-1 text-[10px] font-display uppercase tracking-[0.25em] text-text-muted">
        {title}
      </div>
      <div className="font-display text-sm text-primary glow-text">{value}</div>
    </motion.div>
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
      className="h-9 w-9 grid place-items-center rounded-md border border-primary/30 text-text-muted hover:text-primary hover:border-primary/60 hover:shadow-glow-sm transition-all"
    >
      {children}
    </a>
  );
}
