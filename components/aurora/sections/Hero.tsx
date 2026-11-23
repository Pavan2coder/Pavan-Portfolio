"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "../Icon";
import { SplitText } from "../bits/SplitText";
import { DecryptedText } from "../bits/DecryptedText";
import { CountUp } from "../bits/CountUp";
import { Magnet } from "../bits/Magnet";
import { InteractiveTerminal } from "../bits/InteractiveTerminal";
import { Tile } from "../SectionHeading";
import { profile, socials, stats } from "@/lib/data";

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % profile.roles.length), 2800);
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }),
      );
    tick();
    const clock = setInterval(tick, 15000);
    return () => {
      clearInterval(id);
      clearInterval(clock);
    };
  }, []);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="home" className="relative pt-24 pb-6 md:pt-28 md:pb-8">
      <div className="mx-auto grid max-w-wide grid-cols-12 gap-3.5 px-4 sm:px-8">
        {/* A — name */}
        <Tile className="flex flex-col justify-center lg:col-span-8 lg:min-h-[26rem]">
          <h1 className="display text-[19vw] sm:text-8xl lg:text-[8.5rem]">
            <SplitText text="Athava Sri" as="span" className="block" delay={0.15} />
            <span className="block overflow-hidden">
              <motion.span
                className="block text-brand"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease }}
              >
                Pavan
              </motion.span>
            </span>
          </h1>
          <div className="mt-6 flex h-8 items-center gap-2">
            <DecryptedText
              key={roleIdx}
              text={profile.roles[roleIdx]}
              className="font-mono text-base font-semibold sm:text-lg"
            />
            <span className="animate-blink font-mono text-lg text-brand">_</span>
          </div>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
            {profile.intro}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Magnet strength={0.35}>
              <a href="#projects" className="btn btn-primary px-6 py-3">
                View my work <Icon name="ArrowRight" className="h-4 w-4" />
              </a>
            </Magnet>
            <Magnet strength={0.3}>
              <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-ghost px-6 py-3">
                <Icon name="Download" className="h-4 w-4" /> Resume
              </a>
            </Magnet>
          </div>
        </Tile>

        {/* B — availability, green */}
        <Tile tone="green" delay={0.1} className="flex flex-col justify-between gap-8 md:col-span-6 lg:col-span-4">
          <Squiggle />
          <span className="bubble bubble-mint self-start">
            {profile.available && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0f4d3a] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0f4d3a]" />
              </span>
            )}
            open to work
          </span>
          <p className="display text-5xl lg:text-6xl">
            Internships &amp; <span className="text-brand">freelance</span>
          </p>
          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-12 w-12 place-items-center rounded-full border border-border-strong transition-colors hover:bg-[#8ee07a] hover:text-[#0f4d3a]"
              >
                <Icon name={s.icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </Tile>

        {/* C — card-in-card, red */}
        <Tile tone="red" delay={0.15} className="grid place-items-center md:col-span-6 lg:col-span-4">
          <div className="tile-cream w-full max-w-sm rounded-[24px] bg-[#f4efe6] p-6">
            <div className="flex justify-between font-mono text-sm font-semibold text-[#d40000]">
              <span>Hyderabad</span>
              <span>{time ?? "--:--"} IST</span>
            </div>
            <p className="display my-8 text-6xl italic text-[#d40000]">
              AI &amp; Full&#8209;Stack Engineer
            </p>
            <p className="font-mono text-sm font-semibold text-[#d40000]">B.Tech CSE · MLRIT</p>
          </div>
        </Tile>

        {/* D — the live terminal */}
        <Tile tone="ink" delay={0.2} className="lg:col-span-8">
          <div className="mb-4 flex items-center justify-between">
            <span className="bubble bubble-mint text-sm">type a command ↓</span>
            <span className="font-mono text-xs text-text-faint">try: help · sudo hire-me</span>
          </div>
          <InteractiveTerminal />
        </Tile>

        {/* E — chat bubbles */}
        <Tile delay={0.1} className="flex flex-col justify-center gap-4 md:col-span-6 lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="bubble">Hi! What are you building?</span>
            <span className="avatar h-11 w-11 shrink-0 bg-[#d40000] text-[#f4efe6]">?</span>
          </div>
          <div className="flex items-center gap-3 self-end">
            <span className="avatar h-11 w-11 shrink-0 bg-[#0f4d3a] text-[#8ee07a]">P</span>
            <span className="bubble bubble-mint">Stuff that ships.</span>
          </div>
        </Tile>

        {/* F — stats */}
        <Tile delay={0.15} className="grid grid-cols-2 gap-6 md:col-span-6 lg:col-span-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="display text-6xl text-brand lg:text-7xl">
                <CountUp value={s.value} />
              </div>
              <div className="mt-2 font-mono text-xs font-semibold text-text-muted">{s.label}</div>
            </div>
          ))}
        </Tile>
      </div>
    </section>
  );
}

/** Hand-drawn mint loop, a nod to the reference's doodles. */
function Squiggle() {
  return (
    <svg viewBox="0 0 240 70" className="pointer-events-none absolute -right-4 bottom-0 w-56 opacity-90" fill="none" aria-hidden>
      <path
        d="M4 60c30-6 40-40 70-38 26 2 14 34 36 34 26 0 22-44 56-44 30 0 26 40 70 42"
        stroke="#8ee07a"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
