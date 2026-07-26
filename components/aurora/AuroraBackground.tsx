"use client";

import { AuroraFlow } from "./bits/AuroraFlow";

/**
 * Fixed, full-viewport ambient background layer:
 * High-octane 3D Constellation Laser Field + luminous Quantum Aurora blobs,
 * perspective grid matrix, and neon scanlines.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base ground wash */}
      <div className="absolute inset-0 bg-bg" />

      {/* 3D grid plane illusion */}
      <div 
        className="grid-bg mask-fade-edges absolute inset-0 opacity-75"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      />

      {/* Aurora blobs — Neon Mint, Turquoise Cyan, Electric Violet */}
      <div
        className="animate-aurora absolute -left-[12%] -top-[18%] h-[60vw] w-[60vw] rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, var(--aura-1), transparent 65%)" }}
      />
      <div
        className="animate-aurora absolute -right-[15%] top-[10%] h-[55vw] w-[55vw] rounded-full blur-[150px]"
        style={{
          background: "radial-gradient(circle, var(--aura-2), transparent 65%)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="animate-aurora absolute bottom-[-22%] left-[20%] h-[58vw] w-[58vw] rounded-full blur-[160px]"
        style={{
          background: "radial-gradient(circle, var(--aura-3), transparent 65%)",
          animationDelay: "-12s",
        }}
      />

      {/* Signature: 3D Constellation Laser Lattice & Interactive Particles */}
      <AuroraFlow className="absolute inset-0 h-full w-full opacity-95" />

      {/* CRT scanlines */}
      <div className="scanlines absolute inset-0 opacity-25" />

      {/* Slow cyber scan sweep */}
      <div
        className="scan-sweep absolute inset-x-0 top-0 h-36"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(99,102,241,0.12), rgba(0,245,212,0.1), transparent)",
        }}
      />

      {/* Soft vignette to seat content */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,9,20,0.35) 0%, transparent 20%, transparent 80%, rgba(8,9,20,0.7) 100%)",
        }}
      />
    </div>
  );
}
