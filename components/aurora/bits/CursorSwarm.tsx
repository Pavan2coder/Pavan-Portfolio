"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * "AI agents build the page" — a swarm of coloured cursors flies to every
 * element ("layer") inside <main>, drags out a frame over it like a design
 * tool (with a W × H tag), and the content fills in inside that frame.
 * Auto-tours down the page; any user scroll/key takes over. Skip / Replay.
 */

const SEL = "h1,h2,h3,h4,p,a,button,img,svg,canvas,li,input,textarea,[data-layer]";
const SCAN_MS = 120;

type Agent = {
  x: number; y: number;
  fx: number; fy: number; t0: number; dur: number;
  el: HTMLElement | null;
  phase: "idle" | "move" | "draw" | "fill";
  until: number;
  tx: number; ty: number; nextLook: number;
  hue: number;
  typing: { node: Text; r: Range }[]; chars: number;
};

// CSS Custom Highlight API: untyped text is painted transparent, layout untouched.
// ponytail: browsers without it (old Firefox/Safari) just get the instant reveal.
const HL = typeof CSS !== "undefined" && "highlights" in CSS ? new Highlight() : null;

function textNodes(el: HTMLElement) {
  const out: Text[] = [];
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) if ((w.currentNode as Text).data.trim()) out.push(w.currentNode as Text);
  return out;
}

const col = (hue: number, a = 1) => `hsl(${hue} 85% 68% / ${a})`;

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const PAD = 4; // frame sits a few px outside the element

function aim(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return { x: r.left - PAD, y: r.top - PAD, w: r.width + PAD * 2, h: r.height + PAD * 2 };
}

function onScreen(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth;
}

export function CursorSwarm({ onReplay }: { onReplay: () => void }) {
  const count = typeof window !== "undefined" && innerWidth < 768 ? 10 : 18;
  const cursorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const layerRef = useRef<HTMLDivElement>(null);
  const layers = useRef<HTMLElement[]>([]);
  const finishRef = useRef<() => void>(() => {});
  const [total, setTotal] = useState(0);
  const [placed, setPlaced] = useState(0);
  const [touring, setTouring] = useState(true);
  const [doneIn, setDoneIn] = useState<number | null>(null);
  const [barOpen, setBarOpen] = useState(true);
  const tourRef = useRef(true);

  // Hide every layer before first paint.
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const main = document.querySelector("main");
    if (!main) return;
    const picked = new Set<HTMLElement>();
    main.querySelectorAll<HTMLElement>(`${SEL},div,span`).forEach((el) => {
      // plain div/span only count when they're leaf text (stat numbers, labels, badges)
      if ((el.tagName === "DIV" || el.tagName === "SPAN") && (el.childElementCount > 0 || (el.textContent?.trim().length ?? 0) < 2)) return;
      const r = el.getBoundingClientRect();
      if (r.width < 6 || r.height < 6) return;
      if (r.right < 0 || r.left > innerWidth) return; // off-screen marquee clones etc.
      for (let p = el.parentElement; p && p !== main; p = p.parentElement) if (picked.has(p)) return;
      picked.add(el);
    });
    layers.current = [...picked];
    layers.current.forEach((el) => el.classList.add("swarm-layer", "swarm-pending"));
    setTotal(layers.current.length);
    return () => layers.current.forEach((el) => el.classList.remove("swarm-layer", "swarm-pending"));
  }, []);

  useEffect(() => {
    const all = layers.current;
    if (!all.length) return;
    const pending = new Set(all);
    const claimed = new Set<HTMLElement>();
    const t0 = performance.now();
    let visible: HTMLElement[] = [];
    let lastScan = 0;
    let stuckSince = 0;
    let clearSince = 0;
    let screenSince = t0;
    let scrollingUntil = 0;
    let raf = 0;
    let finished = false;

    const agents: Agent[] = Array.from({ length: count }, (_, i) => {
      const x = innerWidth / 2 + (Math.random() - 0.5) * 200;
      const y = innerHeight + 40;
      return {
        x, y, fx: x, fy: y, t0: 0, dur: 0, el: null, phase: "idle", until: 0,
        tx: Math.random() * innerWidth, ty: Math.random() * innerHeight, nextLook: 0,
        hue: (i * 360) / count + 140,
        typing: [], chars: 0,
      };
    });
    if (HL) CSS.highlights.set("swarm-untyped", HL);

    const stopTyping = (a: Agent) => {
      a.typing.forEach(({ r }) => HL?.delete(r));
      a.typing = [];
    };

    const reveal = (el: HTMLElement) => {
      pending.delete(el);
      claimed.delete(el);
      el.classList.remove("swarm-pending");
      setPlaced(all.length - pending.size);
    };

    const finish = (skipped: boolean) => {
      if (finished) return;
      finished = true;
      pending.forEach((el) => el.classList.remove("swarm-pending"));
      pending.clear();
      frameRefs.current.forEach((f) => { if (f) f.style.opacity = "0"; });
      setPlaced(all.length);
      setDoneIn((performance.now() - t0) / 1000);
      // gather into a ring, then fade the swarm out
      agents.forEach((a, i) => {
        const ang = (i / agents.length) * Math.PI * 2;
        a.el = null; a.phase = "idle";
        a.tx = innerWidth / 2 + Math.cos(ang) * 70;
        a.ty = innerHeight / 2 + Math.sin(ang) * 70;
      });
      setTimeout(() => {
        if (layerRef.current) layerRef.current.style.opacity = "0";
        all.forEach((el) => el.classList.remove("swarm-layer"));
        if (!skipped && tourRef.current) window.scrollTo({ top: 0, behavior: "smooth" });
      }, skipped ? 0 : 1400);
    };
    finishRef.current = () => finish(true);

    const stopTour = () => { tourRef.current = false; setTouring(false); };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"].includes(e.key)) stopTour();
    };
    window.addEventListener("wheel", stopTour, { passive: true });
    window.addEventListener("touchstart", stopTour, { passive: true });
    window.addEventListener("keydown", onKey);

    const frame = (now: number) => {
      if (now - lastScan > SCAN_MS) {
        lastScan = now;
        // React may swap nodes out (e.g. remounted text) — drop detached ones
        pending.forEach((el) => { if (!el.isConnected) { pending.delete(el); setPlaced(all.length - pending.size); } });
        visible = [...pending].filter(onScreen);
      }

      for (let i = 0; i < agents.length; i++) {
        const a = agents[i];
        if (!finished && a.phase === "idle" && now >= a.nextLook) {
          a.nextLook = now + 90;
          let best: HTMLElement | null = null;
          let bd = Infinity;
          for (const el of visible) {
            if (claimed.has(el) || !pending.has(el)) continue;
            const p = aim(el);
            const d = (p.x - a.x) ** 2 + (p.y - a.y) ** 2;
            if (d < bd) { bd = d; best = el; }
          }
          if (best) {
            claimed.add(best);
            a.el = best; a.phase = "move";
            a.fx = a.x; a.fy = a.y; a.t0 = now;
            a.dur = Math.min(1000, Math.max(420, Math.sqrt(bd) * 1.4));
          }
        }

        if (a.phase === "move" && a.el) {
          const p = aim(a.el);
          const k = ease(Math.min((now - a.t0) / a.dur, 1));
          a.x = a.fx + (p.x - a.fx) * k;
          a.y = a.fy + (p.y - a.fy) * k;
          if (k >= 1) {
            // press → start dragging the frame
            a.phase = "draw"; a.t0 = now;
            a.dur = Math.min(950, Math.max(380, Math.hypot(p.w, p.h) * 0.9));
          }
        } else if (a.phase === "draw" && a.el) {
          const p = aim(a.el);
          const k = ease(Math.min((now - a.t0) / a.dur, 1));
          const w = p.w * k, h = p.h * k;
          a.x = p.x + w; a.y = p.y + h;
          const f = frameRefs.current[i];
          if (f) {
            f.style.transition = "opacity .15s";
            f.style.opacity = "1";
            f.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
            f.style.width = `${w}px`;
            f.style.height = `${h}px`;
            f.style.background = col(a.hue, 0.08);
            (f.firstChild as HTMLElement).textContent = `${Math.round(w)} × ${Math.round(h)}`;
          }
          if (k >= 1) {
            // release → content fills the frame, frame flashes and fades
            reveal(a.el);
            a.phase = "fill"; a.until = now + 420;
            if (f) {
              f.style.transition = "opacity .45s ease .12s, background .3s";
              f.style.background = col(a.hue, 0.2);
              f.style.opacity = "0";
            }
          }
        } else if (a.phase === "fill" && a.el) {
          const p = aim(a.el);
          a.x = p.x + p.w; a.y = p.y + p.h; // ride along with the element while it settles
          const f = frameRefs.current[i];
          if (f) f.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
          if (now >= a.until) { a.el = null; a.phase = "idle"; a.nextLook = now; }
        } else {
          // wander
          if (!finished && Math.hypot(a.tx - a.x, a.ty - a.y) < 30) {
            a.tx = innerWidth * (0.15 + Math.random() * 0.7);
            a.ty = innerHeight * (0.2 + Math.random() * 0.6);
          }
          a.x += (a.tx - a.x) * 0.035;
          a.y += (a.ty - a.y) * 0.035;
        }

        const node = cursorRefs.current[i];
        if (node) {
          const s = a.phase === "draw" ? 0.88 : 1; // "pressed" while dragging
          node.style.transform = `translate3d(${a.x}px, ${a.y}px, 0) scale(${s})`;
        }
      }

      if (!finished) {
        const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
        const nothingHere = visible.every((el) => !pending.has(el));
        if (nothingHere) clearSince ||= now;
        else clearSince = 0;
        // a screen that keeps feeding new layers (moving marquee) gets 5s max
        const overtime = now - screenSince > 5000;
        if (pending.size === 0) finish(false);
        // let the finished screen breathe for a moment, then glide on
        else if (
          tourRef.current && !atBottom && now > scrollingUntil &&
          (overtime || (nothingHere && now - clearSince > 550))
        ) {
          // screen done → glide to the next one so the whole swarm has work
          window.scrollBy({ top: innerHeight * 0.7, behavior: "smooth" });
          scrollingUntil = now + 850;
          screenSince = now + 850;
          clearSince = 0;
        }
        else if (nothingHere && atBottom) {
          // leftovers off-screen (e.g. marquee clones) — wrap up
          stuckSince ||= now;
          if (now - stuckSince > 900) finish(false);
        } else stuckSince = 0;
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", stopTour);
      window.removeEventListener("touchstart", stopTour);
      window.removeEventListener("keydown", onKey);
    };
  }, [count]);

  if (!total) return null;
  const pct = Math.round((placed / total) * 100);

  return (
    <>
      <div ref={layerRef} aria-hidden className="pointer-events-none fixed inset-0 z-[150] transition-opacity duration-700">
        {Array.from({ length: count }, (_, i) => {
          const hue = (i * 360) / count + 140;
          return (
            <div
              key={`f${i}`}
              ref={(n) => { frameRefs.current[i] = n; }}
              className="absolute left-0 top-0 rounded-[3px]"
              style={{ opacity: 0, border: `1.5px solid ${col(hue)}`, boxShadow: `0 0 12px ${col(hue, 0.35)}` }}
            >
              <span
                className="absolute -bottom-[19px] right-[-1.5px] whitespace-nowrap rounded-[3px] px-1.5 py-px text-[10px] font-semibold leading-[14px] text-black"
                style={{ background: col(hue), fontFamily: "var(--font-mono), monospace" }}
              />
            </div>
          );
        })}
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            ref={(n) => { cursorRefs.current[i] = n; }}
            className="absolute left-0 top-0 will-change-transform"
            style={{ transform: "translate3d(-100px,-100px,0)" }}
          >
            <svg width="18" height="20" viewBox="0 0 18 20" style={{ filter: `drop-shadow(0 0 6px hsl(${(i * 360) / count + 140}, 85%, 60%))` }}>
              <path
                d="M1 1 L1 16 L5.2 12.2 L8 18.5 L10.6 17.4 L7.9 11.2 L13.5 11.2 Z"
                fill={`hsl(${(i * 360) / count + 140}, 85%, 68%)`}
                stroke="#fff"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ))}
      </div>

      {barOpen && (
        <div
          className="fixed bottom-4 left-1/2 z-[160] flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-black/80 px-4 py-2 text-[12px] text-white/70 shadow-2xl backdrop-blur-md"
          style={{ fontFamily: "var(--font-mono), monospace" }}
        >
          {doneIn === null ? (
            <>
              <span className="flex -space-x-1">
                {[0, 3, 6, 9, 12].map((i) => (
                  <span key={i} className="h-3 w-3 rounded-full border border-black" style={{ background: `hsl(${(i * 360) / 18 + 140}, 85%, 68%)` }} />
                ))}
              </span>
              <span className="text-white">{count} agents</span>
              <span>{placed} / {total} layers</span>
              <span className="relative hidden h-1 w-24 overflow-hidden rounded-full bg-white/10 sm:block">
                <span className="absolute inset-y-0 left-0 rounded-full bg-[#34d399] transition-[width]" style={{ width: `${pct}%` }} />
              </span>
              <span className={touring ? "rounded bg-[#34d399]/20 px-2 py-0.5 text-[#34d399]" : "rounded bg-white/10 px-2 py-0.5"}>
                {touring ? "Touring" : "Manual"}
              </span>
              <button onClick={() => finishRef.current()} className="pointer-events-auto rounded px-2 py-0.5 text-white/60 hover:bg-white/10 hover:text-white">
                Skip
              </button>
            </>
          ) : (
            <>
              <span className="text-[#34d399]">✓ Rebuilt by {count} agents in {doneIn.toFixed(1)}s</span>
              <button
                onClick={() => { window.scrollTo({ top: 0, behavior: "instant" }); onReplay(); }}
                className="pointer-events-auto rounded bg-white/10 px-2 py-0.5 text-white hover:bg-white/20"
              >
                ↻ Replay
              </button>
              <button onClick={() => setBarOpen(false)} aria-label="Close" className="pointer-events-auto px-1 text-white/50 hover:text-white">
                ✕
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
