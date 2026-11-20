"use client";

import { useState } from "react";
import { Reveal } from "../Reveal";
import { Icon } from "../Icon";
import { profile, socials } from "@/lib/data";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-wide px-5 sm:px-8">
        <div className="swiss lg:grid-cols-[2fr_1fr]">
          <Reveal className="cell md:!p-12">
            <span className="label text-brand">05 — Contact</span>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl md:text-7xl">
              Let&apos;s build something <span className="text-brand">worth shipping.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
              Open to internships, freelance builds, and collaborations. Drop me a line — I usually
              reply within a day.
            </p>
          </Reveal>

          <div className="grid gap-px" style={{ background: "var(--grid-line)" }}>
            <a
              href={`mailto:${profile.email}`}
              className="cell group flex items-center justify-between bg-brand text-[var(--on-brand)] transition-colors hover:brightness-110"
            >
              <span className="font-display text-xl font-semibold">Send an email</span>
              <Icon name="ArrowUpRight" className="h-6 w-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              className="cell cell-hover flex items-center justify-between gap-3 bg-bg text-left"
            >
              <span className="min-w-0">
                <span className="tag block">{copied ? "Copied!" : "Copy email"}</span>
                <span className="mt-2 block truncate font-mono text-sm text-text">{profile.email}</span>
              </span>
              <Icon name={copied ? "Check" : "Copy"} className="h-4 w-4 shrink-0 text-brand" />
            </button>
            <div className="grid grid-cols-3 gap-px" style={{ background: "var(--grid-line)" }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="cell cell-hover grid place-items-center bg-bg text-text-muted hover:text-brand"
                >
                  <Icon name={s.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
