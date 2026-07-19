"use client";

import { useEffect, useRef } from "react";

/**
 * NEXUS ambient background.
 * Canvas layer: a drifting particle constellation whose nearby nodes link into
 * a live neural mesh, with a soft mouse parallax. CSS layers above/below add
 * the grid, moving gradients, stars, scanline and noise for depth.
 * GPU-friendly (single canvas, capped nodes), reduced-motion aware, pauses when
 * the tab is hidden.
 */
export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const cnv: HTMLCanvasElement = canvasRef.current;
    const maybeCx = cnv.getContext("2d", { alpha: true });
    if (!maybeCx) return;
    const cx: CanvasRenderingContext2D = maybeCx;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let raf = 0;

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: P[] = [];

    // #rrggbb -> rgba with alpha
    function hexA(hex: string, a: number) {
      let h = hex.replace("#", "");
      if (h.length === 3) h = h.split("").map((c) => c + c).join("");
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      return `rgba(${r},${g},${b},${a})`;
    }

    function readAccent() {
      const s = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();
      return s || "#3b76ff";
    }
    let accent = readAccent();

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cnv.width = width * dpr;
      cnv.height = height * dpr;
      cnv.style.width = width + "px";
      cnv.style.height = height + "px";
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(90, Math.round((width * height) / 22000));
      nodes = new Array(target).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.6,
      }));
    }

    const LINK = 128;

    function frame() {
      cx.clearRect(0, 0, width, height);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const px = (mouse.x - 0.5) * 26;
      const py = (mouse.y - 0.5) * 26;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            const o = (1 - dist / LINK) * 0.32;
            cx.strokeStyle = hexA(accent, o);
            cx.lineWidth = 0.7;
            cx.beginPath();
            cx.moveTo(a.x + px, a.y + py);
            cx.lineTo(b.x + px, b.y + py);
            cx.stroke();
          }
        }
      }

      for (const n of nodes) {
        cx.beginPath();
        cx.fillStyle = hexA(accent, 0.7);
        cx.arc(n.x + px, n.y + py, n.r, 0, Math.PI * 2);
        cx.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    function frameStatic() {
      cx.clearRect(0, 0, width, height);
      for (const n of nodes) {
        cx.beginPath();
        cx.fillStyle = hexA(accent, 0.6);
        cx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        cx.fill();
      }
    }

    function onMove(e: PointerEvent) {
      mouse.tx = e.clientX / width;
      mouse.ty = e.clientY / height;
    }
    function onVisibility() {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduce) raf = requestAnimationFrame(frame);
    }
    const themeObserver = new MutationObserver(() => {
      accent = readAccent();
    });

    resize();
    if (reduce) frameStatic();
    else raf = requestAnimationFrame(frame);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base gradient wells */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 78% 18%, var(--accent-soft), transparent 60%)," +
            "radial-gradient(55% 45% at 12% 88%, rgba(77,224,255,0.05), transparent 62%)," +
            "radial-gradient(90% 70% at 50% 50%, rgba(59,118,255,0.03), transparent 75%)",
        }}
      />
      {/* moving gradient sheen */}
      <div
        className="absolute inset-0 animate-nx-drift opacity-70"
        style={{
          background:
            "radial-gradient(40% 30% at 30% 30%, var(--accent-soft), transparent 60%)",
        }}
      />
      {/* grid */}
      <div className="grid-bg absolute inset-0 opacity-70 mask-fade-edges" />
      {/* stars */}
      <Stars />
      {/* neural canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* scanline */}
      <div
        className="absolute inset-x-0 top-0 h-[38vh] opacity-40"
        style={{
          background:
            "linear-gradient(180deg, transparent, var(--accent-soft) 60%, transparent)",
          animation: "nx-scan 9s linear infinite",
          mixBlendMode: "screen",
        }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 40%, transparent 55%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      {/* noise */}
      <div className="grain absolute inset-0" />
    </div>
  );
}

function Stars() {
  return (
    <div
      className="absolute inset-0 opacity-50"
      style={{
        backgroundImage:
          "radial-gradient(1px 1px at 20% 30%, var(--text-faint), transparent)," +
          "radial-gradient(1px 1px at 70% 20%, var(--text-faint), transparent)," +
          "radial-gradient(1px 1px at 40% 70%, var(--text-faint), transparent)," +
          "radial-gradient(1px 1px at 85% 60%, var(--text-faint), transparent)," +
          "radial-gradient(1px 1px at 55% 45%, var(--text-faint), transparent)," +
          "radial-gradient(1px 1px at 10% 80%, var(--text-faint), transparent)," +
          "radial-gradient(1px 1px at 90% 85%, var(--text-faint), transparent)",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
