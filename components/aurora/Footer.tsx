"use client";

import { Icon } from "./Icon";
import { Dock } from "./bits/Dock";
import { navItems, profile, socials } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative border-t border-hairline">
      <div className="mx-auto max-w-wide px-5 py-12 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <a href="#home" className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-border-strong bg-card font-display text-sm font-bold">
                <span className="text-gradient">P</span>
              </span>
              <span className="font-display text-sm font-semibold tracking-tight">
                {profile.name}
              </span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-text-muted">
              {profile.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navItems.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="text-sm text-text-muted transition-colors hover:text-text"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <Dock
            items={socials.map((s) => ({
              label: s.label,
              href: s.href,
              icon: <Icon name={s.icon} className="h-1/2 w-1/2" />,
            }))}
          />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-hairline pt-6 text-center sm:flex-row">
          <span className="label">© 2026 {profile.name}</span>
          <button
            onClick={() => window.dispatchEvent(new Event("replay-intro"))}
            className="label transition-colors hover:text-brand"
          >
            ↻ Replay build intro
          </button>
          <span className="label">Designed & built with Next.js + Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
