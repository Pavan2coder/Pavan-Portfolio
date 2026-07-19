"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

/**
 * Terminal-style live status line: a blinking online dot, location, and a
 * ticking IST clock. Renders time only after mount to avoid hydration
 * mismatch. Pure readout — sets the "live system" tone of the theme.
 */
export function TerminalStatus() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint">
      <span className="inline-flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-3 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-3" />
        </span>
        <span className="text-brand-3">SYSTEM ONLINE</span>
      </span>
      <span className="text-text-faint">/</span>
      <span>{profile.location}</span>
      <span className="text-text-faint">/</span>
      <span className="text-text-muted">
        {time ? `${time} IST` : "--:--:-- IST"}
        <span className="animate-blink">_</span>
      </span>
    </div>
  );
}
