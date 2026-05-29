"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HUDFrame } from "@/components/hud/HUDFrame";
import { profile } from "@/lib/data";

type Line =
  | { type: "input"; text: string }
  | { type: "output"; text: string }
  | { type: "system"; text: string };

const COMMANDS: Record<string, () => string> = {
  help: () =>
    [
      "available commands:",
      "  whoami         — operator identity",
      "  role           — current role",
      "  education      — academic info",
      "  skills         — primary stack",
      "  projects       — list deployed ops",
      "  experience     — show mission log",
      "  status         — system status",
      "  contact        — open uplink info",
      "  socials        — links",
      "  date           — local time",
      "  clear          — clear terminal",
    ].join("\n"),
  whoami: () => `Athava Sri Pavan`,
  role: () => `AI Engineer | ML Developer | Full Stack Developer`,
  education: () => `B.Tech CSE — MLR Institute of Technology, Hyderabad\n2nd Year Student`,
  skills: () =>
    "Python, MERN Stack (MongoDB, Express, React, Node.js), Flutter, Dart, AI/ML, Scikit-learn, FastAPI, Streamlit, Firebase, Tailwind CSS",
  projects: () =>
    [
      "» mlrit-portal           [DEPLOYED]  Student counseling platform",
      "» campus-companion       [ACTIVE]    Campus management system",
      "» traffic-intelligence   [AI ACTIVE] ML traffic prediction",
      "» aerosense             [ONLINE]    Air quality monitoring",
      "» catering-app          [DEPLOYED]  Flutter food ordering app",
    ].join("\n"),
  experience: () =>
    [
      "2024 — present  MLRIT CIE                     Web Intern",
      "2023 — present  Centre for Innovation         Technical Member",
      "2023 — present  MLR Institute of Technology   Student Mentor",
    ].join("\n"),
  status: () => "Building intelligent systems...",
  contact: () =>
    `email:    ${profile.email}\ngithub:   ${profile.github}\nlinkedin: ${profile.linkedin}`,
  socials: () =>
    `github:   ${profile.github}\nlinkedin: ${profile.linkedin}`,
  date: () => new Date().toString(),
  ls: () =>
    "about/   skills/   projects/   experience/   assistant/   contact/",
  pwd: () => "/home/pavan/portfolio",
  echo: () => "",
};

const BOOT_LINES: Line[] = [
  { type: "system", text: "pavan@jarvis:~$ session opened" },
  { type: "system", text: "type 'help' to view available commands" },
];

const AUTO_DEMO = ["whoami", "role", "status"];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(BOOT_LINES);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState<number>(-1);
  const [demoDone, setDemoDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // auto-demo on mount (once visible)
  useEffect(() => {
    if (demoDone) return;
    let i = 0;
    let cancelled = false;
    const playNext = () => {
      if (cancelled || i >= AUTO_DEMO.length) {
        setDemoDone(true);
        return;
      }
      const cmd = AUTO_DEMO[i++];
      typeCommand(cmd, () => setTimeout(playNext, 700));
    };
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          playNext();
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    const el = document.getElementById("terminal");
    if (el) obs.observe(el);
    return () => {
      cancelled = true;
      obs.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
  }, [lines]);

  function runCommand(cmd: string) {
    const trimmed = cmd.trim();
    if (!trimmed) {
      setLines((l) => [...l, { type: "input", text: "" }]);
      return;
    }
    setHistory((h) => [...h, trimmed]);
    setHIndex(-1);

    if (trimmed === "clear") {
      setLines(BOOT_LINES);
      return;
    }
    const [head, ...rest] = trimmed.split(/\s+/);
    let out = "";
    if (head === "echo") {
      out = rest.join(" ");
    } else if (head in COMMANDS) {
      out = COMMANDS[head]();
    } else {
      out = `command not found: ${head} — try 'help'`;
    }
    setLines((l) => [
      ...l,
      { type: "input", text: trimmed },
      { type: "output", text: out },
    ]);
  }

  function typeCommand(cmd: string, onDone?: () => void) {
    let i = 0;
    setInput("");
    const id = setInterval(() => {
      i++;
      setInput(cmd.slice(0, i));
      if (i >= cmd.length) {
        clearInterval(id);
        setTimeout(() => {
          runCommand(cmd);
          setInput("");
          onDone?.();
        }, 220);
      }
    }, 55);
  }

  return (
    <section id="terminal" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <SectionHeader
          code="06"
          title="Terminal / Command Interface"
          kicker="CONSOLE"
        />

        <HUDFrame label="TTY / 01" code="06-A" glow>
          {/* window chrome */}
          <div className="flex items-center justify-between mb-3 border-b border-primary/15 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="font-display text-[10px] uppercase tracking-[0.3em] text-text-muted">
              pavan@jarvis: ~ /portfolio
            </span>
            <span className="font-display text-[10px] uppercase tracking-[0.3em] text-primary">
              SECURE
            </span>
          </div>

          <div
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
            className="font-mono text-[13px] sm:text-sm h-[360px] sm:h-[400px] overflow-y-auto cursor-text"
          >
            {lines.map((l, i) => (
              <LineRow key={i} line={l} />
            ))}
            {/* current prompt */}
            <div className="flex items-baseline gap-2">
              <Prompt />
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    runCommand(input);
                    setInput("");
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    if (!history.length) return;
                    const next = hIndex < 0 ? history.length - 1 : Math.max(0, hIndex - 1);
                    setHIndex(next);
                    setInput(history[next] ?? "");
                  } else if (e.key === "ArrowDown") {
                    e.preventDefault();
                    if (hIndex < 0) return;
                    const next = hIndex + 1;
                    if (next >= history.length) {
                      setHIndex(-1);
                      setInput("");
                    } else {
                      setHIndex(next);
                      setInput(history[next]);
                    }
                  }
                }}
                spellCheck={false}
                autoComplete="off"
                className="flex-1 bg-transparent outline-none text-text caret-primary"
                aria-label="Terminal input"
              />
              <span className="inline-block w-2 animate-blink text-primary">▍</span>
            </div>
          </div>

          {/* quick chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {["help", "whoami", "role", "skills", "projects", "status", "clear"].map((c) => (
              <button
                key={c}
                onClick={() => {
                  inputRef.current?.focus();
                  typeCommand(c);
                }}
                className="px-2 py-1 text-[10px] font-mono rounded-sm border border-primary/25 text-primary/80 hover:border-primary/60 hover:bg-primary/10 transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        </HUDFrame>
      </div>
    </section>
  );
}

function Prompt() {
  return (
    <span className="font-mono text-primary shrink-0">
      <span className="text-emerald-400">pavan@jarvis</span>
      <span className="text-text-muted">:</span>
      <span className="text-secondary">~</span>
      <span className="text-text-muted">$ </span>
    </span>
  );
}

function LineRow({ line }: { line: Line }) {
  if (line.type === "system") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-text-muted"
      >
        # {line.text}
      </motion.div>
    );
  }
  if (line.type === "input") {
    return (
      <div className="flex items-baseline gap-2">
        <Prompt />
        <span className="text-text">{line.text}</span>
      </div>
    );
  }
  return (
    <motion.pre
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="whitespace-pre-wrap text-text-muted ml-0 mb-1"
    >
      {line.text}
    </motion.pre>
  );
}
