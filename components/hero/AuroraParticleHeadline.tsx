"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Aurora particle typography.
 * The words are built from thousands of luminous violet→teal particles that
 * shimmer like an aurora, each held in place by a spring, and parted by the
 * cursor like a force field — then they stream back and reform the text.
 *
 * Real text is exposed to assistive tech via a visually-hidden heading.
 */

const LINES = ["Pavan's", "Portfolio"];
const INDENT = 0.06; // em indent of the 2nd line

// palette (violet → teal → mint) as RGB triples
const C1 = [167, 139, 250]; // #a78bfa
const C2 = [45, 212, 191]; // #2dd4bf
const C3 = [94, 234, 212]; // #5eead4

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function mix(a: number[], b: number[], t: number) {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

type P = {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  s: number;
  k: number; // per-particle spring stiffness (slight variation = organic)
  cseed: number;
};

export function AuroraParticleHeadline() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fontProbeRef = useRef<HTMLSpanElement>(null);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    if (!wrapRef.current || !canvasRef.current || !fontProbeRef.current) return;
    const wrap: HTMLDivElement = wrapRef.current;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const probe: HTMLSpanElement = fontProbeRef.current;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    let raf = 0;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let particles: P[] = [];
    let t0 = 0;
    let intro = 0; // 0..1 entrance progress
    const mouse = { x: -9999, y: -9999 };
    const REPEL = 118; // force-field radius
    let running = true;
    let lastW = -1;

    const fontFamily = () =>
      getComputedStyle(probe).fontFamily || "sans-serif";

    function build() {
      const cw = wrap.clientWidth;
      lastW = cw;
      const fontSize = Math.min(Math.max(cw * 0.135, 46), 172);
      const lineH = fontSize * 0.86;
      W = cw;
      H = Math.round(lineH + fontSize * 1.12);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // rasterize the text to sample glyph pixels
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#fff";
      ctx.textBaseline = "top";
      ctx.font = `600 ${fontSize}px ${fontFamily()}`;
      ctx.fillText(LINES[0], 0, 0);
      ctx.fillText(LINES[1], fontSize * INDENT, lineH);

      const img = ctx.getImageData(0, 0, W * dpr, H * dpr).data;
      ctx.clearRect(0, 0, W, H);

      const step = Math.max(3, Math.round(fontSize / 42)); // sampling density
      let homes: { x: number; y: number }[] = [];
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          const px = Math.floor(x * dpr);
          const py = Math.floor(y * dpr);
          const alpha = img[(py * W * dpr + px) * 4 + 3];
          if (alpha > 130) {
            // small jitter so the sample grid doesn't read as a grid
            homes.push({
              x: x + (Math.random() - 0.5) * step * 0.5,
              y: y + (Math.random() - 0.5) * step * 0.5,
            });
          }
        }
      }
      // cap for performance on dense/large headlines
      const MAX = 5200;
      if (homes.length > MAX) {
        for (let i = homes.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [homes[i], homes[j]] = [homes[j], homes[i]];
        }
        homes = homes.slice(0, MAX);
      }

      particles = homes.map((h) => {
        const ang = Math.random() * Math.PI * 2;
        const r = 80 + Math.random() * Math.max(W * 0.6, 280);
        return {
          hx: h.x,
          hy: h.y,
          x: W / 2 + Math.cos(ang) * r,
          y: H / 2 + Math.sin(ang) * r,
          vx: 0,
          vy: 0,
          s: 0.85 + Math.random() * 1.25,
          k: 0.05 + Math.random() * 0.025,
          cseed: Math.random(),
        };
      });
      intro = 0;
    }

    function frame(now: number) {
      if (!running) return;
      if (!t0) t0 = now;
      const time = (now - t0) / 1000;
      intro = Math.min(1, intro + 0.02);

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      const friction = 0.8;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // spring home (kinetic / magnetic)
        let ax = (p.hx - p.x) * p.k;
        let ay = (p.hy - p.y) * p.k;

        // cursor force field (constellation parting)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < REPEL * REPEL) {
          const d = Math.sqrt(d2) || 0.001;
          const f = (1 - d / REPEL) * 5.2;
          ax += (dx / d) * f;
          ay += (dy / d) * f;
        }

        p.vx = (p.vx + ax) * friction;
        p.vy = (p.vy + ay) * friction;
        p.x += p.vx;
        p.y += p.vy;

        // aurora colour — flows across the words over time
        const wave =
          0.5 +
          0.5 *
            Math.sin(
              (p.hx / W) * 3.2 + (p.hy / H) * 1.8 + time * 0.7 + p.cseed * 1.5
            );
        const c = wave < 0.5 ? mix(C1, C2, wave * 2) : mix(C2, C3, (wave - 0.5) * 2);
        const a = intro * (0.75 + 0.25 * Math.sin(time * 1.3 + p.cseed * 6));

        ctx.fillStyle = `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // only rebuild when the WIDTH changes (height is driven by the canvas
    // itself, so observing it would loop)
    const ro = new ResizeObserver(() => {
      const w = wrap.clientWidth;
      if (Math.abs(w - lastW) < 2) return;
      build();
    });

    const start = () => {
      build();
      setReady(true);
      ro.observe(wrap);
      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(frame);
    };

    // fonts must be loaded before we rasterize, or we sample a fallback
    if (document.fonts?.ready) {
      document.fonts.ready.then(start);
    } else {
      start();
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div className="relative">
      {/* accessible heading (canvas is decorative) */}
      <h1 className="sr-only">Pavan&apos;s Portfolio</h1>

      {/* static fallback for reduced-motion */}
      {reduced ? (
        <div
          aria-hidden
          className="font-display font-semibold tracking-tight leading-[0.84] text-[clamp(2.9rem,12vw,10.75rem)]"
        >
          <span className="block text-gradient-cyan">Pavan&apos;s</span>
          <span className="block pl-[0.06em] text-gradient-cyan">Portfolio</span>
        </div>
      ) : (
        <div ref={wrapRef} aria-hidden className="relative w-full">
          {/* hidden probe so canvas can read the resolved Sora family */}
          <span
            ref={fontProbeRef}
            className="font-display"
            style={{ position: "absolute", visibility: "hidden", pointerEvents: "none" }}
          >
            .
          </span>
          <canvas
            ref={canvasRef}
            className="block w-full"
            style={{ opacity: ready ? 1 : 0, transition: "opacity 0.4s ease" }}
          />
        </div>
      )}
    </div>
  );
}
