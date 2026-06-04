"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { JarvisBoot } from "@/components/boot/JarvisBoot";
import { ParticleField } from "@/components/hud/ParticleField";
import { MouseGlow } from "@/components/hud/MouseGlow";
import { StatusBar } from "@/components/hud/StatusBar";

import { Navigation } from "@/components/layout/Navigation";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { TargetCursor } from "@/components/ui/TargetCursor";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { AICoreSection } from "@/components/sections/AICore";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Terminal } from "@/components/terminal/Terminal";
import { Contact } from "@/components/sections/Contact";

export default function Page() {
  const [booted, setBooted] = useState(false);

  // lock scroll while booting
  useEffect(() => {
    if (!booted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [booted]);

  return (
    <>
      {/* smooth scroll + custom cursor — global */}
      <SmoothScroll />
      <TargetCursor />

      {/* background layers — always mounted */}
      <ParticleField />
      <MouseGlow />

      {/* Boot sequence only - NO GLITCH SCREEN */}
      <AnimatePresence>
        {!booted && (
          <JarvisBoot key="boot" onComplete={() => setBooted(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {booted && (
          <motion.main
            key="main"
            initial={{ opacity: 0, y: 16, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <ScrollProgress />
            <Navigation />
            <StatusBar />

            <Hero />
            <About />
            <AICoreSection />
            <Projects />
            <Experience />
            <Terminal />
            <Contact />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
