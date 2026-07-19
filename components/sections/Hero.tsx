"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile, heroRoles } from "@/lib/data";
import { AICore } from "@/components/nexus/AICore";
import { WidgetRail } from "@/components/nexus/WidgetRail";
import { Magnetic } from "@/components/system/Magnetic";
import { Icon } from "@/components/nexus/Icon";

/**
 * SYS-00 · AI CORE
 * The dashboard hero: greeting + identity with a rotating role readout, the
 * holographic AI Core with orbiting capability nodes, and live telemetry.
 */
export function Hero() {
  return (
    <section
      id="core"
      className="relative flex min-h-[100svh] w-full items-center px-base pb-gutter pt-20 md:pt-24"
    >
      <div className="mx-auto grid w-full max-w-content grid-cols-1 items-center gap-gutter lg:grid-cols-[1.05fr_1.15fr_0.8fr]">
        {/* left — identity */}
        <div className="order-2 lg:order-1">
          <Identity />
        </div>

        {/* center — core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 lg:order-2"
        >
          <AICore />
        </motion.div>

        {/* right — widgets */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="order-3 hidden lg:block"
        >
          <WidgetRail />
        </motion.div>
      </div>
    </section>
  );
}

function Identity() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-base flex items-center gap-2"
      >
        <span className="label flex items-center gap-2 rounded-full border border-hairline bg-panel px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-online animate-pulse-glow" />
          System Online · SYS-00
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="font-mono text-sm text-text-muted"
      >
        <span className="text-accent">$</span> Hello. I am
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-2 font-display text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[0.95] tracking-tight"
      >
        Sri <span className="text-accent text-glow">Pavan</span>
      </motion.h1>

      <RoleRotator />

      {/* mission line */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="mt-room max-w-md text-text-muted"
      >
        {profile.tagline} — designing neural systems, full-stack platforms, and
        intelligent products from {profile.location}.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-gutter flex flex-wrap items-center gap-3"
      >
        <Magnetic strength={0.35}>
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white shadow-[var(--glow-sm)] transition-transform duration-300"
          >
            Explore Modules
            <Icon
              name="ArrowRight"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
        </Magnetic>
        <Magnetic strength={0.35}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md border border-glass-border bg-panel px-5 py-3 text-sm font-medium text-text transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            <Icon name="Radio" className="h-4 w-4" />
            Open Channel
          </a>
        </Magnetic>
      </motion.div>
    </div>
  );
}

function RoleRotator() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % heroRoles.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div className="mt-3 flex h-8 items-center gap-2 font-mono text-lg text-text sm:text-xl">
      <span className="text-accent">▸</span>
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={heroRoles[i]}
            initial={{ y: reduce ? 0 : "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: reduce ? 0 : "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block whitespace-nowrap"
          >
            {heroRoles[i]}
          </motion.span>
        </AnimatePresence>
      </div>
      {!reduce && <span className="h-5 w-[2px] animate-blink bg-accent" />}
    </div>
  );
}
