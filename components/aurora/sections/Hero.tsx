"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "../Icon";
import { SplitText } from "../bits/SplitText";
import { DecryptedText } from "../bits/DecryptedText";
import { CountUp } from "../bits/CountUp";
import { Magnet } from "../bits/Magnet";
import { StarBorder } from "../bits/StarBorder";
import { TerminalStatus } from "../bits/TerminalStatus";
import { InteractiveTerminal } from "../bits/InteractiveTerminal";
import { profile, socials, stats } from "@/lib/data";

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIdx((i) => (i + 1) % profile.roles.length),
      2800,
    );
    return () => clearInterval(id);
  }, []);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      <div className="mx-auto w-full max-w-wide px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 backdrop-blur-md"
            >
              {profile.available && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-2 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-2" />
                </span>
              )}
              <span className="text-xs font-medium text-text-muted">
                Available for internships & freelance
              </span>
            </motion.div>

            <h1 className="font-display text-[13vw] font-bold leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.4rem]">
              <SplitText text="Athava Sri" as="span" className="block" delay={0.15} />
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-gradient-flow"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease }}
                >
                  Pavan
                </motion.span>
              </span>
            </h1>

            {/* role rotator — decrypt effect */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease }}
              className="mt-6 flex h-8 items-center gap-3 sm:h-9"
            >
              <span className="h-px w-8 bg-brand-line" />
              <DecryptedText
                key={roleIdx}
                text={profile.roles[roleIdx]}
                className="font-mono text-base font-medium text-brand-2 sm:text-lg"
              />
              <span className="animate-blink font-mono text-base text-brand-2 sm:text-lg">
                _
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1, ease }}
              className="mt-7 max-w-xl text-base leading-relaxed text-text-muted md:text-lg"
            >
              {profile.intro}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1, ease }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnet strength={0.4}>
                <StarBorder href="#projects">
                  View my work
                  <Icon name="ArrowRight" className="h-4 w-4" />
                </StarBorder>
              </Magnet>
              <Magnet strength={0.3}>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost px-6 py-3"
                >
                  <Icon name="Download" className="h-4 w-4" />
                  Resume
                </a>
              </Magnet>
              <div className="ml-1 flex items-center gap-1">
                {socials.map((s) => (
                  <Magnet key={s.label} strength={0.5}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-text-muted transition-all hover:border-brand-line hover:text-text"
                    >
                      <Icon name={s.icon} className="h-[18px] w-[18px]" />
                    </a>
                  </Magnet>
                ))}
              </div>
            </motion.div>

            {/* live terminal status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.4, ease }}
              className="mt-10 border-t border-hairline pt-5"
            >
              <TerminalStatus />
            </motion.div>
          </div>

          {/* right — INTERACTIVE terminal (type to explore) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="relative w-full"
          >
            <div className="mb-3 flex items-center gap-2 pl-1 font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
              live · type a command to explore
            </div>
            <InteractiveTerminal />
          </motion.div>
        </div>

        {/* stats strip — count up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3, ease }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border backdrop-blur-md sm:grid-cols-4 md:mt-20"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-bg-2 px-5 py-6 text-center sm:text-left">
              <div className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                <CountUp value={s.value} className="text-gradient" />
              </div>
              <div className="mt-1.5 text-xs text-text-muted sm:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
