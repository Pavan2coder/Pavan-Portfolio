"use client";

import { Icon } from "./Icon";
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

          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-text-muted transition-all hover:border-brand-line hover:text-text"
              >
                <Icon name={s.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-hairline pt-6 text-center sm:flex-row">
          <span className="label">© 2026 {profile.name}</span>
          <span className="label">Designed & built with Next.js + Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
