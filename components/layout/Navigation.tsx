"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all",
          scrolled ? "py-2" : "py-4"
        )}
      >
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6">
          <div
            className={cn(
              "hud-panel-strong rounded-md flex items-center justify-between px-3 sm:px-4 py-2.5 transition-shadow",
              scrolled && "shadow-glow-sm"
            )}
          >
            {/* logo */}
            <a href="#home" className="group flex items-center gap-2.5">
              <div className="relative h-7 w-7 rounded-full bg-gradient-to-br from-primary to-secondary shadow-glow-sm grid place-items-center">
                <div className="h-3 w-3 rounded-full bg-bg" />
                <div className="absolute inset-0 rounded-full border border-primary/50 animate-spin-slow" />
              </div>
              <div className="font-display tracking-[0.3em] text-xs sm:text-sm">
                <span className="text-primary">{profile.name.toUpperCase()}</span>
                <span className="text-text-muted">.OS</span>
              </div>
            </a>

            {/* desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  className={cn(
                    "group relative px-3 py-2 text-[11px] font-display uppercase tracking-[0.22em] transition-colors",
                    active === n.id ? "text-primary" : "text-text-muted hover:text-text"
                  )}
                >
                  <span className="mr-1.5 text-[9px] text-primary/60">/{n.code}</span>
                  {n.label}
                  {active === n.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                    />
                  )}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-display uppercase tracking-[0.22em] text-text-muted hover:text-primary transition-colors"
              >
                GitHub ↗
              </a>
            </div>

            {/* mobile toggle */}
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden h-9 w-9 grid place-items-center rounded-md border border-primary/30 text-primary hover:bg-primary/10"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-bg/95 backdrop-blur-md pt-20"
          >
            <div className="px-6">
              <ul className="hud-panel rounded-md divide-y divide-primary/10 overflow-hidden">
                {navItems.map((n, i) => (
                  <motion.li
                    key={n.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <a
                      href={`#${n.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 font-display uppercase tracking-[0.22em] text-sm"
                    >
                      <span className="text-primary/70 text-[10px]">/{n.code}</span>
                      <span className="text-text">{n.label}</span>
                      <span className="ml-auto text-primary">→</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
