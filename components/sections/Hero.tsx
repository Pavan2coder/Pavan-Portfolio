"use client";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { AuroraParticleHeadline } from "@/components/hero/AuroraParticleHeadline";
import dynamic from "next/dynamic";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const JARVISMultiversalCore = dynamic(() => import("@/components/hero/JARVISMultiversalCore"), {
  ssr: false,
});

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-28"
    >
      {/* JARVIS Multiversal Core - complete cinematic AI environment */}
      <JARVISMultiversalCore />

      {/* Additional atmospheric overlay */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {/* Deep space gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000510]/90 via-bg/70 to-bg" />
        
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-bg/60" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-12">
        {/* availability pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="inline-flex items-center gap-2.5 rounded-full hud-panel px-4 py-1.5 text-[11px] tracking-[0.2em] text-text-muted"
        >
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
          AVAILABLE FOR WORK
        </motion.div>

        {/* giant editorial headline + cursor lens */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.1, ease }}
          className="mt-7 sm:mt-9"
        >
          <AuroraParticleHeadline />
        </motion.div>

        {/* role line */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease }}
          className="mt-8 max-w-xl text-sm sm:text-base tracking-wide text-text-muted"
        >
          {profile.role}
        </motion.p>

        {/* understated actions */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease }}
          className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <TextLink onClick={() => scrollTo("projects")}>View Work</TextLink>
          <TextLink onClick={() => scrollTo("contact")}>Get in Touch</TextLink>
          <div className="flex items-center gap-2">
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
      </div>

      {/* bottom meta strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9, ease }}
        className="absolute inset-x-0 bottom-7 sm:bottom-9 px-5 sm:px-8 lg:px-12"
      >
        <div className="mx-auto flex w-full max-w-[1500px] items-end justify-between gap-8">
          <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-[10.5px] uppercase leading-relaxed tracking-[0.16em] text-text-muted">
            <div>
              <p className="text-text/80">AI / ML / Full-Stack</p>
              <p className="mt-3">Currently available
                <br />for work worldwide</p>
            </div>
            <div>
              <p className="text-text/80">Based in Hyderabad</p>
              <p className="mt-3">{profile.name}</p>
            </div>
          </div>

          {/* scroll cue */}
          <div className="hidden sm:flex flex-col items-center gap-3 text-text-muted">
            <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
            <span className="relative h-16 w-px overflow-hidden bg-white/10">
              <motion.span
                animate={{ y: ["-100%", "120%"] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-primary to-transparent"
              />
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function TextLink({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group inline-flex items-center gap-1 text-sm tracking-wide text-text transition-colors hover:text-primary"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-current opacity-40 transition-opacity group-hover:opacity-100" />
      </span>
      <ArrowUpRight
        size={14}
        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </button>
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
      className="grid h-10 w-10 place-items-center rounded-full hud-panel text-text-muted transition-colors hover:text-primary"
    >
      {children}
    </a>
  );
}
