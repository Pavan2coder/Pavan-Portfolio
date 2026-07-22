"use client";

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { AuroraBackground } from "@/components/aurora/AuroraBackground";
import { ClickSpark } from "@/components/aurora/bits/ClickSpark";
import { CustomCursor } from "@/components/aurora/bits/CustomCursor";
import { Preloader } from "@/components/aurora/bits/Preloader";
import { Nav } from "@/components/aurora/Nav";
import { Footer } from "@/components/aurora/Footer";
import TextPressure from "@/components/aurora/bits/TextPressure";
import { Hero } from "@/components/aurora/sections/Hero";
import { About } from "@/components/aurora/sections/About";
import { Skills } from "@/components/aurora/sections/Skills";
import { Projects } from "@/components/aurora/sections/Projects";
import { Experience } from "@/components/aurora/sections/Experience";
import { Contact } from "@/components/aurora/sections/Contact";

/**
 * AURORA — modern premium portfolio for Athava Sri Pavan.
 * Intro preloader · custom cursor · aurora ground · scroll reveals.
 */
export default function Page() {
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <AuroraBackground />
      <ClickSpark />
      <CustomCursor />

      {/* scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-brand via-brand-2 to-brand-3"
      />

      <Nav />

      <motion.main
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />

        {/* interactive variable-font signature — move your cursor across it */}
        <section className="relative overflow-hidden border-t border-hairline py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-8 sm:px-14">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="label text-brand">// move your cursor across my name</span>
            </div>
            <div style={{ position: "relative", height: "clamp(70px, 15vw, 200px)" }}>
              <TextPressure
                text="PAVAN"
                flex
                width
                weight
                italic={false}
                alpha={false}
                minFontSize={28}
                textColor="#eefaf0"
              />
            </div>
          </div>
        </section>
      </motion.main>

      <Footer />
    </>
  );
}
