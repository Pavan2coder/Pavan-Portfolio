"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HUDFrame } from "@/components/hud/HUDFrame";
import { useSound } from "@/hooks/useSound";
import { profile, projects } from "@/lib/data";
import { Send, Sparkles } from "lucide-react";

type Msg = { from: "user" | "jarvis"; text: string; meta?: string };

const QUICK = [
  "Show me your projects",
  "What stack do you use?",
  "Open GitHub",
  "Open LinkedIn",
  "Go to Contact",
  "What's your status?",
];

function answer(q: string): { text: string; effect?: () => void; meta?: string } {
  const s = q.toLowerCase();

  if (s.includes("github")) {
    return {
      text: "Opening GitHub repository in a new orbit...",
      meta: "ACTION / EXTERNAL",
      effect: () => window.open(profile.github, "_blank"),
    };
  }
  if (s.includes("linkedin")) {
    return {
      text: "Routing to LinkedIn channel.",
      meta: "ACTION / EXTERNAL",
      effect: () => window.open(profile.linkedin, "_blank"),
    };
  }
  if (s.includes("contact") || s.includes("email") || s.includes("hire")) {
    return {
      text: "Navigating to the Contact uplink. Open a secure channel below.",
      meta: "ACTION / NAVIGATE",
      effect: () =>
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
    };
  }
  if (s.includes("project")) {
    const list = projects
      .slice(0, 3)
      .map((p, i) => `${i + 1}. ${p.title} — ${p.tags.join(", ")}`)
      .join("\n");
    return {
      text: `Pavan has shipped ${projects.length} flagship ops. Top three:\n${list}\n\nScrolling to the Projects module.`,
      meta: "QUERY / PROJECTS",
      effect: () =>
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
    };
  }
  if (s.includes("skill") || s.includes("stack") || s.includes("tech")) {
    return {
      text:
        "Primary stack: Python, PyTorch, LangChain, FastAPI, Next.js, TypeScript, Three.js, Postgres + pgvector. Routing to the Skills module.",
      meta: "QUERY / SKILLS",
      effect: () =>
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    };
  }
  if (s.includes("experience") || s.includes("work") || s.includes("role")) {
    return {
      text: "Pulling up the mission log.",
      meta: "QUERY / EXPERIENCE",
      effect: () =>
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }),
    };
  }
  if (s.includes("about") || s.includes("who")) {
    return {
      text: `${profile.name} — ${profile.role}. Building intelligent systems. Routing to dossier.`,
      meta: "QUERY / ABOUT",
      effect: () =>
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }),
    };
  }
  if (s.includes("status") || s.includes("online")) {
    return {
      text: "All systems nominal. CPU 32%, MEM 41%, uplink stable. Awaiting next instruction.",
      meta: "QUERY / SYSTEM",
    };
  }
  if (s.includes("hello") || s.includes("hi") || s.includes("hey")) {
    return {
      text: `Hello, operator. J.A.R.V.I.S online. Pavan is currently building intelligent systems. How can I assist?`,
      meta: "GREETING",
    };
  }

  return {
    text:
      "Query parsed. I can navigate sections, open GitHub or LinkedIn, list projects, or describe the stack. Try one of the quick actions below.",
    meta: "FALLBACK",
  };
}

export function AIAssistant() {
  const { beep } = useSound();
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "jarvis",
      text:
        "J.A.R.V.I.S online. Operator profile recognized. Ask me anything about Pavan — or use a quick action.",
      meta: "BOOT / READY",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { from: "user", text: t }]);
    setInput("");
    setTyping(true);
    beep(720, 0.04, "triangle");

    setTimeout(() => {
      const a = answer(t);
      setMessages((m) => [...m, { from: "jarvis", text: a.text, meta: a.meta }]);
      setTyping(false);
      beep(520, 0.06, "sine");
      a.effect?.();
    }, 700);
  };

  return (
    <section id="assistant" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <SectionHeader
          code="05"
          title="J.A.R.V.I.S / AI Assistant"
          kicker="INTERFACE"
        />

        <div className="grid lg:grid-cols-12 gap-6">
          <HUDFrame label="LIVE TRANSCRIPT" code="05-A" glow className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary shadow-glow-sm grid place-items-center">
                <Sparkles size={14} className="text-bg" />
                <div className="absolute inset-0 rounded-full border border-primary/60 animate-spin-slow" />
              </div>
              <div>
                <div className="font-display text-sm tracking-[0.2em] text-text">
                  J.A.R.V.I.S
                </div>
                <div className="text-[10px] font-display uppercase tracking-[0.3em] text-text-muted">
                  v4.7 • LATENCY 187ms • READY
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2 text-[10px] font-display uppercase tracking-[0.3em]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                ONLINE
              </div>
            </div>

            <div
              ref={scrollRef}
              className="h-[360px] sm:h-[400px] overflow-y-auto pr-2 space-y-3 scanline relative"
            >
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-md px-3 py-2 ${
                        m.from === "user"
                          ? "bg-secondary/15 border border-secondary/40 text-text"
                          : "hud-panel-strong text-text"
                      }`}
                    >
                      {m.meta && (
                        <div className="text-[9px] font-display uppercase tracking-[0.3em] text-text-muted mb-1">
                          {m.meta}
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-line leading-relaxed">
                        {m.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-text-muted text-xs"
                >
                  <span className="font-display uppercase tracking-[0.3em] text-[10px]">
                    JARVIS processing
                  </span>
                  <span className="flex gap-1">
                    <Dot delay={0} />
                    <Dot delay={0.15} />
                    <Dot delay={0.3} />
                  </span>
                </motion.div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="mt-4 flex items-center gap-2 hud-panel rounded-md px-3 py-2 focus-within:border-primary/60 focus-within:shadow-glow-sm"
            >
              <span className="text-primary font-mono">{">"}</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask J.A.R.V.I.S..."
                className="flex-1 bg-transparent outline-none text-text placeholder:text-text-dim"
              />
              <button
                type="submit"
                className="h-8 w-8 grid place-items-center rounded-md bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30"
                aria-label="Send"
              >
                <Send size={14} />
              </button>
            </form>
          </HUDFrame>

          <HUDFrame label="QUICK ACTIONS" code="05-B" className="lg:col-span-4">
            <div className="grid grid-cols-1 gap-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-left px-3 py-2.5 rounded-md border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all text-sm text-text-muted hover:text-text"
                >
                  <span className="text-primary mr-2">›</span>
                  {q}
                </button>
              ))}
            </div>

            <div className="mt-5 hud-panel rounded-md px-3 py-3 text-[10px] font-mono leading-relaxed text-text-muted">
              <div className="font-display uppercase tracking-[0.3em] text-text mb-1">
                CAPABILITIES
              </div>
              <div>• Navigate sections</div>
              <div>• Open external links</div>
              <div>• Summarize stack & ops</div>
              <div>• Report system status</div>
            </div>
          </HUDFrame>
        </div>
      </div>
    </section>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ repeat: Infinity, duration: 1, delay }}
      className="inline-block h-1 w-1 rounded-full bg-primary"
    />
  );
}
