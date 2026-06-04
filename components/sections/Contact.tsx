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
          code="06"
          title="Let's build something"
          kicker="CONTACT"
        />

        <div className="grid lg:grid-cols-12 gap-6">
          <HUDFrame label="Send a message" code="06-A" className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                setTimeout(() => setSent(false), 4000);
              }}
              className="space-y-4"
            >
              <Field label="Name">
                <input
                  required
                  className="w-full bg-transparent outline-none text-text placeholder:text-text-dim"
                  placeholder="Your name"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  className="w-full bg-transparent outline-none text-text placeholder:text-text-dim"
                  placeholder="you@email.com"
                />
              </Field>
              <Field label="Message">
                <textarea
                  required
                  rows={5}
                  className="w-full bg-transparent outline-none text-text placeholder:text-text-dim resize-none"
                  placeholder="Tell me about your project..."
                />
              </Field>
              <div className="flex items-center gap-3">
                <Button glow type="submit">
                  <Send size={14} /> Send Message
                </Button>
                <motion.span
                  initial={false}
                  animate={{ opacity: sent ? 1 : 0, x: sent ? 0 : -6 }}
                  className="text-[12px] text-emerald-400"
                >
                  ✓ Message sent
                </motion.span>
              </div>
            </form>
          </HUDFrame>

          <HUDFrame label="Find me at" code="06-B" className="lg:col-span-5">
            <ul className="space-y-3">
              <Channel
                icon={<Mail size={15} />}
                label="Email"
                value={profile.email}
                href={`mailto:${profile.email}`}
              />
              <Channel
                icon={<Github size={15} />}
                label="GitHub"
                value="@Pavan2coder"
                href={profile.github}
              />
              <Channel
                icon={<Linkedin size={15} />}
                label="LinkedIn"
                value="a-sripavan"
                href={profile.linkedin}
              />
              <Channel
                icon={<Twitter size={15} />}
                label="X / Twitter"
                value="@pavan"
                href={profile.twitter}
              />
              <Channel
                icon={<MapPin size={15} />}
                label="Location"
                value={profile.location}
              />
            </ul>
            <p className="mt-6 text-[13px] text-text-muted leading-relaxed">
              Open to internships, freelance projects, and collaboration.
              I usually reply within a day.
            </p>
          </HUDFrame>
        </div>

        {/* footer line */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] tracking-wide text-text-muted">
          <span>© {new Date().getFullYear()} Athava Sri Pavan</span>
          <span>Built with Next.js & Framer Motion</span>
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
    <label className="block hud-panel rounded-xl px-4 py-3 focus-within:border-primary/40 transition-colors">
      <div className="text-[12px] text-text-muted mb-1.5">
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
        className="flex items-center gap-3 px-3 py-3 rounded-xl border border-white/8 hover:border-primary/40 hover:bg-white/[0.03] transition-all group"
      >
        <span className="h-9 w-9 grid place-items-center rounded-xl bg-white/5 text-primary border border-white/10">
          {icon}
        </span>
        <div className="flex-1">
          <div className="text-[11px] text-text-muted">
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
