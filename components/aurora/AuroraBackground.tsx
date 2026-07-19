"use client";

/**
 * Fixed, full-viewport ambient layer for the WHOLE site: three slow-drifting
 * aurora blobs over a faint grid + scanlines + film grain. Clean and calm —
 * the interactive particle network was removed on request.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* base wash */}
      <div className="absolute inset-0 bg-bg" />

      {/* faint grid */}
      <div className="grid-bg mask-fade-edges absolute inset-0 opacity-60" />

      {/* aurora blobs */}
      <div
        className="animate-aurora absolute -left-[10%] -top-[15%] h-[55vw] w-[55vw] rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle, var(--aura-1), transparent 65%)" }}
      />
      <div
        className="animate-aurora absolute -right-[12%] top-[8%] h-[48vw] w-[48vw] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--aura-2), transparent 65%)",
          animationDelay: "-7s",
        }}
      />
      <div
        className="animate-aurora absolute bottom-[-20%] left-[25%] h-[50vw] w-[50vw] rounded-full blur-[130px]"
        style={{
          background: "radial-gradient(circle, var(--aura-3), transparent 65%)",
          animationDelay: "-14s",
        }}
      />

      {/* CRT scanlines */}
      <div className="scanlines absolute inset-0 opacity-40" />

      {/* slow scan sweep */}
      <div
        className="scan-sweep absolute inset-x-0 top-0 h-24"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(77,124,255,0.06), transparent)",
        }}
      />

      {/* soft vignette to seat content (kept above blobs, BELOW the network) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,8,13,0.35) 0%, transparent 20%, transparent 80%, rgba(6,8,13,0.6) 100%)",
        }}
      />

    </div>
  );
}
