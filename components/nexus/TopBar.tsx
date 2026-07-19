"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "./Icon";
import { useTheme } from "@/hooks/useTheme";
import { profile } from "@/lib/data";

/**
 * Top AI bar — live system telemetry: clock, location, and connection status
 * chips (AI core, GitHub, network) plus the theme toggle.
 */
export function TopBar() {
  const { theme, toggle, mounted } = useTheme();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const time = now
    ? now.toLocaleTimeString("en-GB", { hour12: false })
    : "--:--:--";

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-40 flex h-12 items-center justify-between gap-base border-b border-hairline bg-bg/60 px-base backdrop-blur-xl md:px-room"
    >
      {/* left — identity + clock */}
      <div className="flex items-center gap-room">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">
            NEXUS
          </span>
          <span className="label hidden sm:inline">/ {profile.name.split(" ").slice(-1)[0]}</span>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Icon name="Clock" className="h-3.5 w-3.5 text-text-faint" />
          <span className="readout text-xs text-text-muted">{time}</span>
        </div>
      </div>

      {/* right — status chips + theme */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Chip icon="MapPin" className="hidden lg:flex">
          {profile.location}
        </Chip>
        <Chip icon="Activity" tone="online" pulse>
          AI Online
        </Chip>
        <Chip icon="Github" className="hidden sm:flex">
          Synced
        </Chip>
        <Chip icon="Wifi" tone="online" className="hidden md:flex">
          Connected
        </Chip>

        <button
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          onClick={toggle}
          className="grid h-8 w-8 place-items-center rounded-sm border border-hairline text-text-muted transition-colors hover:border-accent hover:text-accent"
        >
          {mounted && theme === "dark" ? (
            <Icon name="Sun" className="h-4 w-4" />
          ) : (
            <Icon name="Moon" className="h-4 w-4" />
          )}
        </button>
      </div>
    </motion.header>
  );
}

function Chip({
  icon,
  children,
  tone,
  pulse,
  className = "",
}: {
  icon: string;
  children: React.ReactNode;
  tone?: "online";
  pulse?: boolean;
  className?: string;
}) {
  const color = tone === "online" ? "text-online" : "text-accent";
  return (
    <span
      className={`flex items-center gap-1.5 rounded-sm border border-hairline bg-panel px-2 py-1 ${className}`}
    >
      {pulse ? (
        <span className={`h-1.5 w-1.5 rounded-full bg-current ${color} animate-pulse-glow`} />
      ) : (
        <Icon name={icon} className={`h-3 w-3 ${color}`} />
      )}
      <span className="label text-[0.58rem] text-text-muted">{children}</span>
    </span>
  );
}
