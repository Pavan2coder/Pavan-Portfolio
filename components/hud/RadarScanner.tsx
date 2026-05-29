"use client";
import { cn } from "@/lib/utils";

export function RadarScanner({
  size = 260,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("relative", className)}
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 rounded-full border border-primary/30" />
      <div className="absolute inset-[10%] rounded-full border border-primary/25" />
      <div className="absolute inset-[22%] rounded-full border border-primary/20" />
      <div className="absolute inset-[36%] rounded-full border border-primary/20" />
      <div className="absolute inset-[52%] rounded-full border border-primary/25" />

      {/* cross */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/20" />
        <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-primary/20" />
      </div>

      {/* sweep */}
      <div className="absolute inset-0 animate-radar-sweep [transform-origin:center]">
        <div
          className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-y-full origin-bottom-left"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(0,255,255,0.0) 0deg, rgba(0,255,255,0.35) 30deg, rgba(0,255,255,0) 60deg)",
            transform: "translate(-50%, -100%)",
          }}
        />
      </div>

      {/* center pulse */}
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_18px_rgba(0,255,255,0.85)] animate-pulse" />

      {/* dots */}
      <div className="absolute left-[64%] top-[28%] h-1 w-1 rounded-full bg-accent shadow-glow-sm" />
      <div className="absolute left-[24%] top-[58%] h-1 w-1 rounded-full bg-accent shadow-glow-sm" />
      <div className="absolute left-[48%] top-[80%] h-1 w-1 rounded-full bg-accent shadow-glow-sm" />
    </div>
  );
}
