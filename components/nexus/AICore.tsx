"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "./Icon";
import { orbitNodes } from "@/lib/data";

/**
 * The AI Core — a holographic reactor: a pulsing energy core wrapped in
 * counter-rotating rings, with capability nodes orbiting it, each linked to
 * the center by a live data line. Nodes are interactive (hover + click).
 */
export function AICore() {
  const reduce = useReducedMotion();
  const CX = 200;
  const CY = 200;
  const R = 168; // node orbit radius in viewBox units

  const nodes = orbitNodes.map((n, i) => {
    const angle = (-90 + (360 / orbitNodes.length) * i) * (Math.PI / 180);
    return {
      ...n,
      x: CX + Math.cos(angle) * R,
      y: CY + Math.sin(angle) * R,
      // as percentages for absolute node placement over the SVG
      leftPct: ((CX + Math.cos(angle) * R) / 400) * 100,
      topPct: ((CY + Math.sin(angle) * R) / 400) * 100,
    };
  });

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px]">
      {/* connecting lines + rings (SVG) */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent-bright)" stopOpacity="0.5" />
            <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* faint concentric guide rings */}
        {[60, 110, 168].map((r) => (
          <circle
            key={r}
            cx={CX}
            cy={CY}
            r={r}
            fill="none"
            stroke="var(--hairline)"
            strokeWidth="1"
          />
        ))}

        {/* data lines from core to each node */}
        {nodes.map((n) => (
          <line
            key={n.id}
            x1={CX}
            y1={CY}
            x2={n.x}
            y2={n.y}
            stroke="var(--accent-line)"
            strokeWidth="1"
            strokeDasharray="3 6"
            className={reduce ? "" : "nx-line"}
          />
        ))}

        {/* core aura */}
        <circle cx={CX} cy={CY} r={120} fill="url(#coreGlow)" />
      </svg>

      {/* rotating decorative rings */}
      {!reduce && (
        <>
          <div className="absolute inset-[14%] animate-spin-slow rounded-full border border-dashed border-accent/25" />
          <div className="absolute inset-[26%] animate-spin-slower rounded-full border border-cyan/20 [animation-direction:reverse]" />
        </>
      )}

      {/* centered stack — pings + core sphere (transform-free centering so
          animated transforms don't fight positioning) */}
      <div className="absolute inset-0 grid place-items-center">
        {/* ping pulses */}
        {!reduce && (
          <>
            <span
              className="col-start-1 row-start-1 h-24 w-24 rounded-full border border-accent/40"
              style={{ animation: "nx-ping 4.5s cubic-bezier(0,0,0.2,1) infinite" }}
            />
            <span
              className="col-start-1 row-start-1 h-24 w-24 rounded-full border border-accent/30"
              style={{ animation: "nx-ping 4.5s cubic-bezier(0,0,0.2,1) 2.25s infinite" }}
            />
          </>
        )}

        {/* the core sphere */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="col-start-1 row-start-1 grid aspect-square w-[26%] place-items-center overflow-hidden rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 28%, var(--accent-bright), var(--accent) 42%, #0a1024 100%)",
            boxShadow: "var(--glow), inset 0 0 30px rgba(0,0,0,0.5)",
          }}
        >
          <span className="animate-pulse-glow text-center">
            <span className="block font-mono text-[0.5rem] tracking-[0.3em] text-white/80">
              AI
            </span>
            <span className="block font-mono text-[0.5rem] tracking-[0.3em] text-white/80">
              CORE
            </span>
          </span>
          {/* internal scan */}
          {!reduce && (
            <span
              className="pointer-events-none absolute inset-x-0 h-1/3"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(255,255,255,0.25), transparent)",
                animation: "nx-scan 3.4s linear infinite",
                mixBlendMode: "screen",
              }}
            />
          )}
        </motion.div>
      </div>

      {/* orbit nodes */}
      {nodes.map((n, i) => (
        <OrbitNode key={n.id} node={n} index={i} reduce={!!reduce} />
      ))}
    </div>
  );
}

function OrbitNode({
  node,
  index,
  reduce,
}: {
  node: {
    id: string;
    label: string;
    icon: string;
    href: string;
    leftPct: number;
    topPct: number;
  };
  index: number;
  reduce: boolean;
}) {
  const external = node.href.startsWith("http");
  return (
    <motion.a
      href={node.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      aria-label={node.label}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + index * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.leftPct}%`, top: `${node.topPct}%` }}
    >
      <div className={reduce ? "" : "animate-nx-drift"} style={{ animationDelay: `${index * 0.4}s` }}>
        <div className="glass grid h-11 w-11 place-items-center rounded-full text-text-muted transition-all duration-300 group-hover:scale-110 group-hover:border-accent group-hover:text-accent group-hover:shadow-[var(--glow-sm)] sm:h-12 sm:w-12">
          <Icon name={node.icon} className="h-[18px] w-[18px]" />
        </div>
      </div>
      {/* label */}
      <span className="pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-sm border border-hairline bg-bg-2/90 px-2 py-0.5 text-[0.62rem] font-medium text-text opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
        {node.label}
      </span>
    </motion.a>
  );
}
