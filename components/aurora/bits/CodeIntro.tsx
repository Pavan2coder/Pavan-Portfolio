"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile, stats } from "@/lib/data";

/* ── Script ────────────────────────────────────────────────────────────
   Each file is "typed" by one agent. A line ending in  ⟦id⟧  reveals that
   piece of the live preview once the line is finished (marker not shown). */
const FILES = [
  {
    name: "Hero.tsx",
    agent: { id: "agent-1", color: "#34d399" },
    code: `export function Hero() {
  return (
    <section id="home">
      <h1>Athava Sri <em>Pavan</em></h1>⟦name⟧
      <p className="role">${profile.role}</p>⟦role⟧
      <p>{profile.intro}</p>⟦intro⟧
      <Button href="#work">View my work</Button>⟦cta⟧
    </section>
  );
}`,
  },
  {
    name: "theme.css",
    agent: { id: "agent-2", color: "#2dd4bf" },
    code: `:root {
  --bg: #030303;⟦bg⟧
  --brand: #34d399;⟦brand⟧
  --glow: 0 0 80px rgba(52, 211, 153, .25);⟦glow⟧
}`,
  },
  {
    name: "data.ts",
    agent: { id: "agent-3", color: "#a3e635" },
    code: `export const stats = [
${stats.map((s) => `  { value: "${s.value}", label: "${s.label}" },`).join("\n")}⟦stats⟧
];`,
  },
];

type Line = { text: string; mark?: string };
type File = (typeof FILES)[number] & { lines: Line[]; start: number; len: number };

function compile(): { files: File[]; total: number; totalLines: number; full: string } {
  let start = 0;
  let totalLines = 0;
  const files = FILES.map((f) => {
    const lines = f.code.split("\n").map((raw) => {
      const m = raw.match(/⟦(\w+)⟧$/);
      return { text: m ? raw.slice(0, m.index) : raw, mark: m?.[1] };
    });
    const len = lines.reduce((n, l) => n + l.text.length + 1, 0);
    const file = { ...f, lines, start, len };
    start += len;
    totalLines += lines.length;
    return file;
  });
  const full = files.map((f) => f.lines.map((l) => l.text + "\n").join("")).join("");
  return { files, total: start, totalLines, full };
}

/* ── Tiny syntax highlighter ─────────────────────────────────────────── */
const TOKEN =
  /(\/\/.*$|"[^"]*"|\b(?:export|function|return|const|import|from)\b|<\/?[A-Za-z]\w*|\/?>|--[\w-]+|#[0-9a-fA-F]{3,6}\b|\b\d+(?:\.\d+)?\b|[{}()[\]])/g;

function paint(text: string): ReactNode[] {
  return text.split(TOKEN).map((t, i) => {
    if (!t) return null;
    let c = "";
    if (t.startsWith("//")) c = "#5c6370";
    else if (t.startsWith('"')) c = "#a3e635";
    else if (/^(export|function|return|const|import|from)$/.test(t)) c = "#c678dd";
    else if (/^<\/?[A-Za-z]|^\/?>$/.test(t)) c = "#61afef";
    else if (t.startsWith("--")) c = "#2dd4bf";
    else if (/^#|^\d/.test(t)) c = "#e5c07b";
    else if (/^[{}()[\]]$/.test(t)) c = "#7f848e";
    return c ? <span key={i} style={{ color: c }}>{t}</span> : t;
  });
}

/* ── Component ───────────────────────────────────────────────────────── */
const SEEN_KEY = "aurora-intro";

export function CodeIntro({ onDone, replay = false }: { onDone: (played: boolean) => void; replay?: boolean }) {
  const { files, total, totalLines, full } = useMemo(compile, []);
  const [pos, setPos] = useState(0);
  const [show, setShow] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  const finished = pos >= total;

  // Typing loop
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!replay && (reduce || sessionStorage.getItem(SEEN_KEY))) {
      setShow(false);
      doneRef.current(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const t0 = performance.now();
    let p = 0;
    let pauseUntil = 0;
    const id = window.setInterval(() => {
      const now = performance.now();
      setElapsed((now - t0) / 1000);
      if (now < pauseUntil) return;
      const step = 2 + ((Math.random() * 3) | 0);
      // stop at the end of each file and pause → "agent hand-off"
      let next = Math.min(p + step, total);
      for (const f of files) {
        if (next > f.start + f.len - 1 && p < f.start + f.len) {
          next = f.start + f.len; // finish file, then "agent hand-off" pause
          pauseUntil = now + 450;
          break;
        }
      }
      // small human pause at line breaks
      if (pauseUntil < now && full.slice(p, next).includes("\n")) pauseUntil = now + 60 + Math.random() * 110;
      p = next;
      setPos(p);
      if (p >= total) window.clearInterval(id);
    }, 24);
    return () => {
      window.clearInterval(id);
      document.body.style.overflow = "";
    };
  }, [files, total, full, replay]);

  // Finish → hold a beat → exit
  useEffect(() => {
    if (!finished || !show) return;
    const t = setTimeout(() => close(true), 1100);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished, show]);

  function close(played = false) {
    sessionStorage.setItem(SEEN_KEY, "1");
    document.body.style.overflow = "";
    setShow(false);
    doneRef.current(played);
  }

  // Esc to skip
  useEffect(() => {
    if (!show) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && close(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  // Derived view state
  const active = files.find((f) => pos < f.start + f.len) ?? files[files.length - 1];
  const local = Math.max(0, pos - active.start);
  const marks = new Set<string>();
  let linesDone = 0;
  for (const f of files) {
    let c = f.start;
    for (const l of f.lines) {
      c += l.text.length + 1;
      if (pos >= c - 1) {
        linesDone++;
        if (l.mark) marks.add(l.mark);
      }
    }
  }
  const pct = Math.round((pos / total) * 100);

  // Visible text of the active file
  let budget = local;
  const visible: string[] = [];
  for (const l of active.lines) {
    if (budget <= 0) break;
    visible.push(l.text.slice(0, budget));
    budget -= l.text.length + 1;
  }
  if (visible.length === 0) visible.push("");

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col bg-[#030303] text-[13px] text-[#abb2bf]"
          exit={{ opacity: 0, scale: 1.03, filter: "blur(6px)", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          style={{ fontFamily: "var(--font-mono), ui-monospace, monospace" }}
          role="dialog"
          aria-label="Intro animation: building the site"
        >
          {/* glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-[-30vh] h-[70vh] w-[110vw] -translate-x-1/2"
            style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(52,211,153,0.12), transparent 70%)" }}
          />

          {/* title bar */}
          <div className="relative flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-[12px] text-white/40">~/pavan.dev — building</span>
            <button
              onClick={() => close(false)}
              className="ml-auto rounded-md border border-white/10 px-3 py-1 text-[12px] text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              Skip ⏎ <span className="text-white/35">esc</span>
            </button>
          </div>

          <div className="relative grid min-h-0 flex-1 grid-rows-[1fr_auto] md:grid-cols-[1.1fr_1fr] md:grid-rows-1">
            {/* editor */}
            <div className="flex min-h-0 flex-col border-white/[0.06] md:border-r">
              <div className="flex border-b border-white/[0.06] text-[12px]">
                {files.map((f) => (
                  <div
                    key={f.name}
                    className="flex items-center gap-2 border-r border-white/[0.06] px-4 py-2"
                    style={{
                      color: f === active ? "#e6e6e6" : "rgba(255,255,255,0.35)",
                      background: f === active ? "rgba(255,255,255,0.03)" : undefined,
                      boxShadow: f === active ? `inset 0 -2px 0 ${f.agent.color}` : undefined,
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: f.agent.color }} />
                    {f.name}
                  </div>
                ))}
              </div>
              <pre className="min-h-0 flex-1 overflow-hidden px-0 py-4 leading-6">
                {visible.map((text, i) => {
                  const last = i === visible.length - 1;
                  return (
                    <div key={i} className="flex">
                      <span className="w-12 shrink-0 select-none pr-4 text-right text-white/20">{i + 1}</span>
                      <span className="whitespace-pre">
                        {paint(text)}
                        {last && !finished && (
                          <span className="relative">
                            <span
                              className="ml-px inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse"
                              style={{ background: active.agent.color }}
                            />
                            <span
                              className="absolute left-2 top-[-1.35em] whitespace-nowrap rounded px-1.5 py-px text-[10px] font-semibold text-black"
                              style={{ background: active.agent.color }}
                            >
                              {active.agent.id}
                            </span>
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </pre>
            </div>

            {/* live preview */}
            <Preview marks={marks} />
          </div>

          {/* status bar */}
          <div className="relative flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/[0.06] px-4 py-2 text-[12px]">
            {finished ? (
              <span className="text-[#34d399]">
                ✓ Built by {files.length} agents in {elapsed.toFixed(1)}s
              </span>
            ) : (
              <>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#34d399]" />
                  {files.length} agents
                </span>
                <span className="text-white/40">
                  {linesDone}/{totalLines} lines
                </span>
                <span className="hidden text-white/40 sm:inline">{active.agent.id} › {active.name}</span>
              </>
            )}
            <span className="ml-auto flex items-center gap-3">
              <span className="relative h-1 w-32 overflow-hidden rounded-full bg-white/10">
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#34d399] via-[#2dd4bf] to-[#a3e635]"
                  style={{ width: `${pct}%` }}
                />
              </span>
              <span className="w-9 text-right text-white/60">{pct}%</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Mini site that assembles as lines land. */
function Preview({ marks }: { marks: Set<string> }) {
  const on = (id: string) => marks.has(id);
  const appear = (id: string) => ({
    initial: false as const,
    animate: on(id) ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 10, filter: "blur(4px)" },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <div className="relative hidden min-h-0 overflow-hidden md:block" style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <div className="absolute inset-0 flex flex-col p-4">
        <div className="mb-3 flex items-center gap-2 rounded-md bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/40" style={{ fontFamily: "var(--font-mono), monospace" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]" /> localhost:3000 — live preview
        </div>
        <div
          className="relative flex-1 overflow-hidden rounded-xl border border-white/[0.06] p-8 transition-colors duration-700"
          style={{ background: on("bg") ? "#030303" : "#16161a" }}
        >
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[-40%] h-[80%] w-[140%] -translate-x-1/2"
            style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(52,211,153,0.22), transparent 70%)" }}
            initial={false}
            animate={{ opacity: on("glow") ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
          <div className="relative">
            <motion.h1 {...appear("name")} className="text-4xl font-bold leading-[1.05] text-white lg:text-5xl" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
              Athava Sri
              <br />
              <span
                className="transition-colors duration-700"
                style={on("brand") ? { color: "#34d399", textShadow: "0 0 40px rgba(52,211,153,.35)" } : undefined}
              >
                Pavan
              </span>
            </motion.h1>
            <motion.p {...appear("role")} className="mt-4 text-sm font-medium" style={{ color: on("brand") ? "#2dd4bf" : "#cbd5e1" }}>
              — {profile.role}
            </motion.p>
            <motion.p {...appear("intro")} className="mt-3 max-w-sm text-[13px] leading-relaxed text-white/55">
              {profile.intro}
            </motion.p>
            <motion.div {...appear("cta")} className="mt-6 flex gap-3">
              <span
                className="rounded-full px-4 py-2 text-[12px] font-bold transition-colors duration-700"
                style={on("brand") ? { background: "#34d399", color: "#04160f" } : { background: "#e2e8f0", color: "#111" }}
              >
                View my work →
              </span>
              <span className="rounded-full border border-white/15 px-4 py-2 text-[12px] text-white/80">Resume</span>
            </motion.div>
            <motion.div {...appear("stats")} className="mt-8 grid grid-cols-4 gap-2">
              {stats.map((s) => (
                <div key={s.label} className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
                  <div className="text-lg font-bold text-[#34d399]">{s.value}</div>
                  <div className="text-[10px] leading-tight text-white/45">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
