"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HUDFrame } from "@/components/hud/HUDFrame";
import { Button } from "@/components/ui/Button";
import { profile } from "@/lib/data";
import { Github, Linkedin, Mail, MapPin, Send, Twitter } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <SectionHeader
          code="07"
          title="Contact / Open Secure Channel"
          kicker="UPLINK"
        />

        <div className="grid lg:grid-cols-12 gap-6">
          <HUDFrame label="TRANSMIT" code="07-A" className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                setTimeout(() => setSent(false), 4000);
              }}
              className="space-y-4"
            >
              <Field label="OPERATOR / NAME">
                <input
                  required
                  className="w-full bg-transparent outline-none text-text placeholder:text-text-dim"
                  placeholder="enter your name"
                />
              </Field>
              <Field label="CHANNEL / EMAIL">
                <input
                  required
                  type="email"
                  className="w-full bg-transparent outline-none text-text placeholder:text-text-dim"
                  placeholder="you@orbit.com"
                />
              </Field>
              <Field label="MESSAGE / PAYLOAD">
                <textarea
                  required
                  rows={5}
                  className="w-full bg-transparent outline-none text-text placeholder:text-text-dim resize-none"
                  placeholder="initiate transmission..."
                />
              </Field>
              <div className="flex items-center gap-3">
                <Button glow type="submit">
                  <Send size={14} /> TRANSMIT
                </Button>
                <motion.span
                  initial={false}
                  animate={{ opacity: sent ? 1 : 0, x: sent ? 0 : -6 }}
                  className="text-[11px] font-display uppercase tracking-[0.3em] text-emerald-400"
                >
                  ✓ SIGNAL RECEIVED
                </motion.span>
              </div>
            </form>
          </HUDFrame>

          <HUDFrame label="DIRECT CHANNELS" code="07-B" className="lg:col-span-5">
            <ul className="space-y-3">
              <Channel
                icon={<Mail size={14} />}
                label="EMAIL"
                value={profile.email}
                href={`mailto:${profile.email}`}
              />
              <Channel
                icon={<Github size={14} />}
                label="GITHUB"
                value="@pavan"
                href={profile.github}
              />
              <Channel
                icon={<Linkedin size={14} />}
                label="LINKEDIN"
                value="/in/pavan"
                href={profile.linkedin}
              />
              <Channel
                icon={<Twitter size={14} />}
                label="X / TWITTER"
                value="@pavan"
                href={profile.twitter}
              />
              <Channel
                icon={<MapPin size={14} />}
                label="ORIGIN"
                value={profile.location}
              />
            </ul>
            <div className="mt-6 text-[10px] font-mono text-text-muted">
              <p>
                <span className="text-primary">{">"}</span> uplink: stable
              </p>
              <p>
                <span className="text-primary">{">"}</span> encryption: AES-256
              </p>
              <p>
                <span className="text-primary">{">"}</span> status: awaiting transmission
              </p>
            </div>
          </HUDFrame>
        </div>

        {/* footer line */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-display uppercase tracking-[0.3em] text-text-muted">
          <span>© {new Date().getFullYear()} PAVAN.OS — ALL SYSTEMS NOMINAL</span>
          <span>BUILT WITH NEXT.JS • FRAMER MOTION • THREE.JS</span>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block hud-panel rounded-md px-3 py-2.5 focus-within:shadow-glow-sm focus-within:border-primary/60 transition-shadow">
      <div className="text-[10px] font-display uppercase tracking-[0.3em] text-text-muted mb-1.5">
        {label}
      </div>
      {children}
    </label>
  );
}

function Channel({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const Cmp = href ? "a" : "div";
  return (
    <li>
      <Cmp
        href={href}
        target={href ? "_blank" : undefined}
        rel={href ? "noreferrer" : undefined}
        className="flex items-center gap-3 px-3 py-3 rounded-md border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all group"
      >
        <span className="h-8 w-8 grid place-items-center rounded-md bg-primary/10 text-primary border border-primary/30">
          {icon}
        </span>
        <div className="flex-1">
          <div className="text-[10px] font-display uppercase tracking-[0.3em] text-text-muted">
            {label}
          </div>
          <div className="text-text">{value}</div>
        </div>
        {href && (
          <span className="text-primary group-hover:translate-x-1 transition-transform">
            ↗
          </span>
        )}
      </Cmp>
    </li>
  );
}
