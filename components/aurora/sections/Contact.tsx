"use client";

import { useState } from "react";
import { Tile } from "../SectionHeading";
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
    <section id="contact" className="relative py-6 md:py-8">
      <div className="mx-auto grid max-w-wide grid-cols-12 gap-3.5 px-4 sm:px-8">
        {/* big headline tile */}
        <Tile className="flex flex-col justify-between gap-10 lg:col-span-8 lg:row-span-3">
          <div className="flex items-center justify-between font-mono text-sm font-semibold text-text-muted">
            <span>Contact</span>
            <span>[ 05 ]</span>
          </div>
          <div>
            <h2 className="display text-6xl text-brand sm:text-7xl lg:text-[8rem]">
              Let&apos;s build something worth shipping.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
              Open to internships, freelance builds, and collaborations. Drop me a line — I usually reply
              within a day.
            </p>
          </div>
        </Tile>

        {/* solid "send an email" block */}
        <Tile tone="green" delay={0.05} className="!p-0 md:col-span-6 lg:col-span-4">
          <a
            href={`mailto:${profile.email}`}
            className="group flex h-full min-h-[9rem] flex-col justify-between p-6 md:p-8"
          >
            <span className="bubble bubble-ink self-start text-sm">I&apos;ll be in touch</span>
            <span className="flex items-center justify-between">
              <span className="display text-5xl">Send an email</span>
              <Icon name="ArrowUpRight" className="h-8 w-8 text-brand transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </span>
          </a>
        </Tile>

        {/* copy cell */}
        <Tile tone="mint" delay={0.1} className="!p-0 md:col-span-6 lg:col-span-4">
          <button
            onClick={copyEmail}
            aria-label="Copy email address"
            className="flex h-full w-full items-center justify-between gap-3 p-6 text-left md:p-8"
          >
            <span className="min-w-0">
              <span className="block font-mono text-xs font-semibold uppercase tracking-widest text-text-faint">
                {copied ? "Copied!" : "Copy email"}
              </span>
              <span className="mt-2 block truncate font-mono text-sm font-semibold">{profile.email}</span>
            </span>
            <Icon name={copied ? "Check" : "Copy"} className="h-5 w-5 shrink-0" />
          </button>
        </Tile>

        {/* icon grid */}
        <div className="col-span-12 grid grid-cols-3 gap-3.5 lg:col-span-4">
          {socials.map((s, i) => (
            <Tile key={s.label} tone={i === 1 ? "red" : "cream"} delay={0.15} className="!col-span-1 !p-0">
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-full min-h-[6rem] place-items-center transition-transform hover:scale-110"
              >
                <Icon name={s.icon} className="h-7 w-7" />
              </a>
            </Tile>
          ))}
        </div>
      </div>
    </section>
  );
}
