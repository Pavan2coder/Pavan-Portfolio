"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { profile, projects, skillDomains, experience, socials } from "@/lib/data";
import { useTheme } from "@/hooks/useTheme";

type Line = { id: number; kind: "in" | "out" | "sys"; node: ReactNode };

/**
 * A genuinely interactive shell that IS the portfolio's hero. Visitors type
 * commands (`help`, `about`, `projects`, `skills`, `contact`, `resume`,
 * `theme`, easter eggs…) and the terminal responds live, with command history
 * (↑/↓) and tab-completion. Side-effecting commands scroll the page, open
 * links, or toggle the theme. Everything is real data from lib/data.
 */
export function InteractiveTerminal() {
  const { toggle } = useTheme();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [ghost, setGhost] = useState("");

  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const nid = () => ++idRef.current;
  const push = useCallback((kind: Line["kind"], node: ReactNode) => {
    setLines((prev) => [...prev, { id: nid(), kind, node }]);
  }, []);

  const commandList = useMemo(
    () => [
      "help",
      "about",
      "whoami",
      "skills",
      "projects",
      "experience",
      "contact",
      "resume",
      "socials",
      "github",
      "linkedin",
      "email",
      "theme",
      "clear",
      "sudo hire-me",
      "matrix",
    ],
    [],
  );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // ---- command runner ------------------------------------------------------
  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      // echo the typed line
      push(
        "in",
        <span>
          <Prompt />
          <span className="text-text">{cmd}</span>
        </span>,
      );
      if (!cmd) return;

      const [name, ...args] = cmd.toLowerCase().split(/\s+/);
      const out = (node: ReactNode) => push("out", node);

      switch (name) {
        case "help":
          out(
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
              {[
                ["about", "who I am"],
                ["skills", "my stack"],
                ["projects", "what I built"],
                ["experience", "my journey"],
                ["contact", "reach me"],
                ["resume", "download CV"],
                ["socials", "find me online"],
                ["theme", "toggle light/dark"],
                ["clear", "clear screen"],
              ].map(([c, d]) => (
                <span key={c}>
                  <span className="text-brand">{c}</span>
                  <span className="text-text-faint"> — {d}</span>
                </span>
              ))}
              <span className="col-span-full mt-1 text-text-faint">
                tip: try <span className="text-brand-2">sudo hire-me</span> or{" "}
                <span className="text-brand-2">matrix</span> · use ↑/↓ for history,
                Tab to complete
              </span>
            </div>,
          );
          break;

        case "about":
        case "whoami":
          out(
            <div className="space-y-1">
              <p>
                <span className="text-brand-2">{profile.name}</span> — {profile.role}
              </p>
              <p className="text-text-muted">{profile.intro}</p>
              <p className="text-text-faint">
                📍 {profile.location} · run{" "}
                <span className="text-brand">experience</span> for the full journey.
              </p>
            </div>,
          );
          break;

        case "skills":
          out(
            <div className="space-y-1.5">
              {skillDomains.map((d) => (
                <div key={d.title}>
                  <span className="text-brand">{d.title.padEnd(18)}</span>
                  <span className="text-text-muted">{d.items.join(" · ")}</span>
                </div>
              ))}
            </div>,
          );
          scrollTo("skills");
          break;

        case "projects":
        case "ls":
          out(
            <div className="space-y-1.5">
              {projects.map((p) => (
                <div key={p.id}>
                  <span className="text-brand-2">{p.id}</span>
                  <span className="text-text-faint"> [{p.category}] </span>
                  <span className="text-text">{p.title}</span>
                </div>
              ))}
              <p className="pt-1 text-text-faint">
                → scroll down for the full showcase, or run{" "}
                <span className="text-brand">contact</span> to reach me.
              </p>
            </div>,
          );
          scrollTo("projects");
          break;

        case "experience":
          out(
            <div className="space-y-1.5">
              {experience.map((e) => (
                <div key={e.company}>
                  <span className="text-brand">{e.period}</span>{" "}
                  <span className="text-text">{e.role}</span>
                  <span className="text-text-faint"> @ {e.company}</span>
                </div>
              ))}
            </div>,
          );
          scrollTo("experience");
          break;

        case "contact":
          out(
            <div className="space-y-1">
              <p>
                <span className="text-brand">email </span>
                <a className="text-brand-2 underline" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </p>
              <p className="text-text-faint">opening the contact channel…</p>
            </div>,
          );
          scrollTo("contact");
          break;

        case "resume":
        case "cv":
          out(<p className="text-text-muted">Opening resume in a new tab…</p>);
          window.open(profile.resume, "_blank");
          break;

        case "socials":
          out(
            <div className="space-y-1">
              {socials.map((s) => (
                <p key={s.label}>
                  <span className="text-brand">{s.label.padEnd(10)}</span>
                  <a className="text-brand-2 underline" href={s.href} target="_blank" rel="noreferrer">
                    {s.href.replace(/^https?:\/\//, "")}
                  </a>
                </p>
              ))}
            </div>,
          );
          break;

        case "github":
          out(<p className="text-text-muted">Launching GitHub…</p>);
          window.open(profile.github, "_blank");
          break;
        case "linkedin":
          out(<p className="text-text-muted">Launching LinkedIn…</p>);
          window.open(profile.linkedin, "_blank");
          break;
        case "email":
          out(<p className="text-text-muted">Opening mail client…</p>);
          window.open(`mailto:${profile.email}`, "_blank");
          break;

        case "theme":
        case "dark":
        case "light":
          out(<p className="text-text-muted">Toggling theme…</p>);
          toggle();
          break;

        case "clear":
        case "cls":
          setLines([]);
          return;

        case "sudo":
          if (args.join(" ").includes("hire")) {
            out(
              <div className="space-y-1">
                <p className="text-brand">✔ access granted — excellent decision.</p>
                <p className="text-text-muted">
                  Athava is available for internships & freelance. Let&apos;s talk:
                </p>
                <p>
                  <a className="text-brand-2 underline" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                </p>
              </div>,
            );
          } else {
            out(
              <p className="text-text-muted">
                Nice try 😏 — the only sudo command here is{" "}
                <span className="text-brand-2">sudo hire-me</span>.
              </p>,
            );
          }
          break;

        case "matrix":
          out(<MatrixRain />);
          break;

        case "date":
          out(<p className="text-text-muted">{new Date().toString()}</p>);
          break;

        case "pwd":
          out(<p className="text-text-muted">/home/pavan/portfolio</p>);
          break;

        case "echo":
          out(<p className="text-text-muted">{args.join(" ")}</p>);
          break;

        default:
          out(
            <p className="text-text-muted">
              command not found: <span className="text-brand-3">{name}</span> — type{" "}
              <span className="text-brand">help</span>
            </p>,
          );
      }
    },
    [push, toggle],
  );

  // ---- boot sequence -------------------------------------------------------
  useEffect(() => {
    const boot: ReactNode[] = [
      <span key="b1" className="text-text-faint">
        pavan.sh v2.0 — interactive portfolio shell
      </span>,
      <span key="b2">
        <span className="text-brand">✔</span>{" "}
        <span className="text-text-muted">connection established · welcome, visitor</span>
      </span>,
      <span key="b3" className="text-text-faint">
        type <span className="text-brand">help</span> to see what I can do — or just
        explore.
      </span>,
    ];
    let i = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    boot.forEach((node, k) => {
      timers.push(
        setTimeout(() => {
          push("sys", node);
          i++;
        }, 350 + k * 420),
      );
    });
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // autoscroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // tab-complete ghost hint
  useEffect(() => {
    if (!input) return setGhost("");
    const m = commandList.find((c) => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase());
    setGhost(m ? m.slice(input.length) : "");
  }, [input, commandList]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const val = input;
      run(val);
      if (val.trim()) {
        setHistory((h) => [val, ...h].slice(0, 40));
      }
      setInput("");
      setHistIdx(-1);
      setGhost("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistIdx((i) => {
        const ni = Math.min(i + 1, history.length - 1);
        if (history[ni] !== undefined) setInput(history[ni]);
        return ni;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistIdx((i) => {
        const ni = Math.max(i - 1, -1);
        setInput(ni === -1 ? "" : history[ni] ?? "");
        return ni;
      });
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (ghost) setInput((v) => v + ghost);
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      data-cursor
      className="card-2 relative flex h-[420px] w-full flex-col overflow-hidden rounded-lg font-mono text-[13px] leading-relaxed shadow-e3 sm:text-sm"
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-brand-3" />
        <span className="h-3 w-3 rounded-full bg-[#ffb648]" />
        <span className="h-3 w-3 rounded-full bg-brand-2" />
        <span className="ml-2 text-xs text-text-faint">
          pavan@portfolio: ~
        </span>
      </div>

      {/* output */}
      <div ref={scrollRef} className="scanlines flex-1 space-y-1.5 overflow-y-auto px-4 py-3">
        {lines.map((l) => (
          <div key={l.id} className="break-words">
            {l.node}
          </div>
        ))}

        {/* live input line */}
        <div className="flex items-center">
          <Prompt />
          <div className="relative flex-1">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command input"
              className="w-full bg-transparent text-text caret-transparent outline-none"
            />
            {/* rendered caret + ghost completion */}
            <span className="pointer-events-none absolute left-0 top-0 whitespace-pre text-text">
              <span className="invisible">{input}</span>
              <span className="animate-blink text-brand">▋</span>
              <span className="text-text-faint">{ghost}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Prompt() {
  return (
    <span className="mr-2 shrink-0 select-none">
      <span className="text-brand">➜</span>{" "}
      <span className="text-brand-2">~</span>
    </span>
  );
}

/** A short matrix-rain easter egg rendered inside the terminal output. */
function MatrixRain() {
  const cols = 34;
  const glyphs = "01ｱｶｻﾀﾅ<>/{}#$%";
  const [rows, setRows] = useState<string[]>([]);
  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      setRows((r) =>
        [
          Array.from({ length: cols }, () =>
            glyphs[Math.floor(Math.random() * glyphs.length)],
          ).join(""),
          ...r,
        ].slice(0, 6),
      );
      if (++n >= 10) clearInterval(id);
    }, 90);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="text-brand">
      {rows.map((r, i) => (
        <div key={i} style={{ opacity: 1 - i * 0.14 }}>
          {r}
        </div>
      ))}
      <div className="text-text-faint">// wake up, Pavan…</div>
    </div>
  );
}
