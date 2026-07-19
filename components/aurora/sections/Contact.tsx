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
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-card-2 p-8 text-center md:p-16">
            {/* glow */}
            <div className="pointer-events-none absolute -top-1/3 left-1/2 h-[60%] w-[70%] -translate-x-1/2 rounded-full bg-brand-soft blur-3xl" />

            <div className="relative z-10">
              <span className="label text-brand">05 — Contact</span>
              <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                Let&apos;s build something{" "}
                <span className="text-gradient">worth shipping.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
                Open to internships, freelance builds, and collaborations. Drop me
                a line — I usually reply within a day.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="btn btn-primary px-6 py-3"
                >
                  <Icon name="Send" className="h-4 w-4" />
                  Send an email
                </a>
                <button
                  onClick={copyEmail}
                  className="btn btn-ghost px-6 py-3"
                  aria-label="Copy email address"
                >
                  <Icon name={copied ? "Check" : "Copy"} className="h-4 w-4" />
                  {copied ? "Copied!" : profile.email}
                </button>
              </div>

              <div className="mt-10 flex items-center justify-center gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-border bg-bg-3 text-text-muted transition-all hover:-translate-y-0.5 hover:border-brand-line hover:text-text"
                  >
                    <Icon name={s.icon} className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
