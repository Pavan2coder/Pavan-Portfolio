"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./Icon";
import { useTheme } from "@/hooks/useTheme";
import { navItems, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Nav() {
  const { theme, toggle, mounted } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  // Shrink/frost the bar after a little scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy across sections.
  useEffect(() => {
    const ids = navItems.map((n) => n.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Lock scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <nav className="mx-auto flex max-w-wide items-center justify-between gap-4 px-5 sm:px-8">
          {/* brand */}
          <a
            href="#home"
            className="group flex items-center gap-2.5"
            aria-label="Home"
          >
            <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-border-strong bg-card font-display text-sm font-bold">
              <span className="text-gradient">P</span>
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
              {profile.firstName}
              <span className="text-text-faint">.dev</span>
            </span>
          </a>

          {/* desktop links */}
          <div
            className={cn(
              "hidden items-center gap-1 rounded-full border border-border px-1.5 py-1.5 transition-all duration-500 md:flex",
              scrolled ? "bg-card-2 shadow-e2 backdrop-blur-xl" : "bg-card",
            )}
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm transition-colors duration-300",
                  active === item.id
                    ? "text-text"
                    : "text-text-muted hover:text-text",
                )}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-brand-soft"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </div>

          {/* actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-text-muted transition-colors hover:border-brand-line hover:text-text"
            >
              {mounted && (
                <Icon name={theme === "dark" ? "Sun" : "Moon"} className="h-4 w-4" />
              )}
            </button>

            <a
              href="#contact"
              className="btn btn-primary hidden px-5 py-2 text-sm sm:inline-flex"
            >
              Let&apos;s talk
            </a>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-text md:hidden"
            >
              <Icon name="Menu" className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </header>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 backdrop-blur-md"
              style={{ background: "rgba(7,8,12,0.72)" }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 h-full w-[78%] max-w-xs border-l border-border bg-bg-2 p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="label">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card"
                >
                  <Icon name="X" className="h-4 w-4" />
                </button>
              </div>
              <nav className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className="border-b border-hairline py-4 font-display text-2xl font-medium text-text-muted transition-colors hover:text-text"
                  >
                    <span className="mr-3 text-sm text-brand">
                      0{i + 1}
                    </span>
                    {item.label}
                  </motion.a>
                ))}
              </nav>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn btn-primary mt-8 w-full py-3"
              >
                Let&apos;s talk
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
