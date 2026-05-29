"use client";

export function ScanlineOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] mix-blend-screen opacity-[0.07]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(0,255,255,0.6) 0px, rgba(0,255,255,0.6) 1px, transparent 1px, transparent 3px)",
      }}
    />
  );
}
