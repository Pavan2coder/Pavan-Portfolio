"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./Icon";
import { modules } from "@/lib/data";

/**
 * Left command panel — the OS module launcher (replaces a navbar).
 * A collapsed icon rail that expands on hover to reveal module labels + codes.
 * Tracks the active module by scroll position (glow + pulse indicator).
 * On mobile it becomes a FAB-triggered drawer.
 */
export function CommandPanel() {
  const [active, setActive] = useState(modules[0].id);
  const [expanded, setExpanded] = useState(false);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const line = () => window.innerHeight * 0.38;
    const onScroll = () => {
      let cur = modules[0].id;
      let best = Infinity;
      for (const m of modules) {
        const el = document.getElementById(m.id);
        if (!el) continue;
        const d = Math.abs(el.getBoundingClientRect().top - line());
        if (d < best) {
          best = d;
          cur = m.id;
        }
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* ---------------- desktop rail ---------------- */}
      <motion.nav
        aria-label="Command modules"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        animate={{ width: expanded ? 232 : 72 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 top-12 z-30 hidden h-[calc(100vh-3rem)] flex-col border-r border-hairline bg-bg/50 py-room backdrop-blur-xl md:flex"
      >
        <div className="mb-room px-4">
          <span className="label whitespace-nowrap">Modules</span>
        </div>
        <ul className="flex flex-1 flex-col gap-1 px-3">
          {modules.map((m) => (
            <li key={m.id}>
              <ModuleLink module={m} active={active === m.id} expanded={expanded} />
            </li>
          ))}
        </ul>
        <div className="px-4">
          <div className="label flex items-center gap-1.5 whitespace-nowrap">
            <span className="h-1.5 w-1.5 rounded-full bg-online animate-pulse-glow" />
            {expanded ? "All systems nominal" : "OK"}
          </div>
        </div>
      </motion.nav>

      {/* ---------------- mobile FAB + drawer ---------------- */}
      <button
        aria-label="Open modules"
        onClick={() => setDrawer(true)}
        className="glass-strong fixed bottom-5 left-5 z-40 grid h-12 w-12 place-items-center rounded-full text-accent md:hidden"
      >
        <Icon name="Menu" className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {drawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[70] bg-bg/85 backdrop-blur-xl md:hidden"
            onClick={() => setDrawer(false)}
          >
            <motion.nav
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex h-full w-72 max-w-[80%] flex-col border-r border-hairline bg-bg-2 p-room"
            >
              <div className="mb-room flex items-center justify-between">
                <span className="label">NEXUS / Modules</span>
                <button
                  aria-label="Close"
                  onClick={() => setDrawer(false)}
                  className="grid h-9 w-9 place-items-center rounded-sm border border-hairline"
                >
                  <Icon name="X" className="h-4 w-4" />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {modules.map((m) => (
                  <li key={m.id}>
                    <a
                      href={`#${m.id}`}
                      onClick={() => setDrawer(false)}
                      className={`flex items-center gap-3 rounded-md px-3 py-3 transition-colors ${
                        active === m.id
                          ? "bg-accent-soft text-accent"
                          : "text-text-muted hover:text-text"
                      }`}
                    >
                      <Icon name={m.icon} className="h-5 w-5" />
                      <span className="font-medium">{m.label}</span>
                      <span className="label ml-auto">{m.code}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ModuleLink({
  module: m,
  active,
  expanded,
}: {
  module: (typeof modules)[number];
  active: boolean;
  expanded: boolean;
}) {
  return (
    <a
      href={`#${m.id}`}
      aria-current={active ? "true" : undefined}
      className={`group relative flex items-center gap-3 overflow-hidden rounded-md py-2.5 pl-3 pr-2 transition-colors duration-300 ${
        active ? "text-accent" : "text-text-muted hover:text-text"
      }`}
    >
      {/* active well */}
      {active && (
        <motion.span
          layoutId="module-active"
          className="absolute inset-0 -z-10 rounded-md border border-accent-line bg-accent-soft"
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      {/* active pulse bar */}
      <span
        className={`absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full transition-all duration-300 ${
          active ? "bg-accent shadow-[var(--glow-sm)]" : "bg-transparent"
        }`}
      />
      <span className="grid h-6 w-6 shrink-0 place-items-center">
        <Icon name={m.icon} className="h-[18px] w-[18px]" />
      </span>
      <span
        className={`flex min-w-0 flex-1 items-center justify-between whitespace-nowrap transition-opacity duration-300 ${
          expanded ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-sm font-medium">{m.label}</span>
        <span className="label">{m.code}</span>
      </span>
    </a>
  );
}
