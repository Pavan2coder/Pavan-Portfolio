"use client";
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  life: number;
};

export function ParticleField({ density = 0.00009 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let particles: Particle[] = [];
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      const ctx2 = canvas.getContext("2d");
      ctx2?.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.max(40, Math.min(160, Math.floor(w * h * density)));
      particles = Array.from({ length: target }, () => spawn(w, h));
    }

    function spawn(w: number, h: number): Particle {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.3,
        // violet ~262, teal ~172
        hue: Math.random() > 0.5 ? 258 + Math.random() * 12 : 168 + Math.random() * 12,
        life: Math.random() * 1,
      };
    }

    function tick() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.004;
        if (p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
          Object.assign(p, spawn(w, h));
        }
        const alpha = (0.12 + Math.abs(Math.sin(p.life * 2)) * 0.22);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${p.hue}, 70%, 75%, ${alpha})`;
        ctx!.shadowBlur = 6;
        ctx!.shadowColor = `hsla(${p.hue}, 70%, 75%, ${alpha * 0.5})`;
        ctx!.fill();
      }
      ctx!.shadowBlur = 0;

      if (!reduced) raf = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize);
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
