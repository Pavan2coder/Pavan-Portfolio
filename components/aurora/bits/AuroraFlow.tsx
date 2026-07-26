"use client";

import { useEffect, useRef } from "react";

/**
 * AuroraFlow — Liquid Chromatic Refraction & Interactive Fluid Mesh Canvas.
 *
 * Renders organic multi-frequency liquid waves with holographic color dispersion,
 * glowing specular highlights, and mouse-reactive fluid ripples.
 */
export function AuroraFlow({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let running = true;
    let t = 0;

    // emerald · teal · lime
    const palette = ["52, 211, 153", "45, 212, 191", "163, 230, 53"];
    const mouse = { x: -9999, y: -9999, active: false };

    // each particle keeps a short trail (recent positions) so it draws as a
    // luminous streak, not a single-frame dot
    const TRAIL = 20;
    type P = {
      x: number;
      y: number;
      xs: number[];
      ys: number[];
      c: string;
      life: number;
      max: number;
    };
    let ps: P[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function reset(p: P) {
      p.x = Math.random() * width;
      p.y = Math.random() * height;
      p.xs = [p.x];
      p.ys = [p.y];
      p.c = palette[(Math.random() * palette.length) | 0];
      p.life = 0;
      p.max = rand(160, 420);
      return p;
    }

    function seed() {
      const count = Math.min(300, Math.floor(width * height * 0.00014));
      ps = Array.from({ length: count }, () =>
        reset({ x: 0, y: 0, xs: [], ys: [], c: "", life: 0, max: 0 }),
      );
    }

    function resize() {
      const parent = canvas!.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    // smooth animated vector field → angle at (x, y)
    function angleAt(x: number, y: number) {
      const s = 0.0016;
      const n =
        Math.sin(x * s + t) +
        Math.cos(y * s * 1.3 - t * 0.8) +
        Math.sin((x + y) * s * 0.7 + t * 0.5);
      return n * Math.PI;
    }

    const SPEED = 1.15;
    const SWIRL_R = 210;

    function step() {
      t += 0.0016;
      ctx!.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "lighter";
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";

      for (const p of ps) {
        let a = angleAt(p.x, p.y);

        // cursor swirl — bend the heading tangentially near the pointer
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < SWIRL_R && d > 0.5) {
            const f = (1 - d / SWIRL_R) * 1.5;
            a += (Math.atan2(dy, dx) + Math.PI / 2 - a) * f * 0.5;
          }
        }

        p.x += Math.cos(a) * SPEED;
        p.y += Math.sin(a) * SPEED;
        p.life++;

        // extend the trail
        p.xs.push(p.x);
        p.ys.push(p.y);
        if (p.xs.length > TRAIL) {
          p.xs.shift();
          p.ys.shift();
        }

        // fade in then out over the particle's lifetime
        const fade = Math.sin(Math.min(1, p.life / p.max) * Math.PI);
        const alpha = 0.06 + fade * 0.5;

        // draw the trail as a tapering, brightening polyline (head is brightest)
        const n = p.xs.length;
        for (let k = 1; k < n; k++) {
          const seg = k / n; // 0 → tail, 1 → head
          ctx!.strokeStyle = `rgba(${p.c}, ${alpha * seg})`;
          ctx!.lineWidth = 0.5 + seg * 1.4;
          ctx!.beginPath();
          ctx!.moveTo(p.xs[k - 1], p.ys[k - 1]);
          ctx!.lineTo(p.xs[k], p.ys[k]);
          ctx!.stroke();
        }

        // respawn when spent or off-screen
        if (
          p.life > p.max ||
          p.x < -30 ||
          p.x > width + 30 ||
          p.y < -30 ||
          p.y > height + 30
        ) {
          reset(p);
        }
      }

      ctx!.globalCompositeOperation = "source-over";
    }

    function loop() {
      if (!running) return;
      step();
      raf = requestAnimationFrame(loop);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }
    function onLeave() {
      mouse.active = false;
    }

    // pause when the tab / element is off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running && !reduce) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    resize();
    if (!reduce) {
      running = true;
      raf = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerout", onLeave);
    } else {
      // draw a few static frames for a soft still image
      running = false;
      for (let i = 0; i < 90; i++) step();
    }
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
