"use client";

import { useEffect, useRef } from "react";

/**
 * React Bits–style interactive particle constellation.
 * Dots drift, link to nearby neighbours, and reach toward the cursor —
 * lines brighten as the pointer approaches. Canvas + rAF, DPR-aware,
 * pauses when off-screen and respects reduced-motion.
 */
export function Particles({
  density = 0.00016,
  className,
}: {
  density?: number;
  className?: string;
}) {
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

    const mouse = { x: -9999, y: -9999 };
    type P = { x: number; y: number; vx: number; vy: number };
    let dots: P[] = [];
    // deep-space starfield behind the network
    type Star = { x: number; y: number; r: number; p: number };
    let stars: Star[] = [];
    let frameN = 0;

    function seed() {
      const count = Math.min(180, Math.floor(width * height * density));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
      }));
      stars = Array.from(
        { length: Math.floor((width * height) / 2600) },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.3 + 0.25,
          p: Math.random() * Math.PI * 2,
        }),
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

    const LINK = 150;
    const brand = "198, 255, 61";
    const cyan = "34, 227, 208";

    function frame() {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);

      // starfield (twinkling, drawn behind the network)
      frameN++;
      for (const s of stars) {
        const tw = 0.35 + 0.4 * Math.sin(frameN * 0.03 + s.p);
        ctx!.globalAlpha = tw;
        ctx!.fillStyle = "#a9c7bd";
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      for (const p of dots) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // gentle pull toward cursor
        const dxm = mouse.x - p.x;
        const dym = mouse.y - p.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 160 && dm > 0.5) {
          p.x += (dxm / dm) * 0.35;
          p.y += (dym / dm) * 0.35;
        }
      }

      // links
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            const o = (1 - d / LINK) * 0.75;
            ctx!.strokeStyle = `rgba(${brand}, ${o})`;
            ctx!.lineWidth = 1.2;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // glowing nodes
      ctx!.shadowBlur = 8;
      ctx!.shadowColor = `rgba(${brand}, 0.9)`;
      // cursor links + dots
      for (const p of dots) {
        const dm = Math.hypot(mouse.x - p.x, mouse.y - p.y);
        if (dm < 170) {
          const o = (1 - dm / 170) * 0.7;
          ctx!.strokeStyle = `rgba(${cyan}, ${o})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(mouse.x, mouse.y);
          ctx!.lineTo(p.x, p.y);
          ctx!.stroke();
        }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${brand}, 1)`;
        ctx!.fill();
      }
      ctx!.shadowBlur = 0;

      raf = requestAnimationFrame(frame);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    if (!reduce) {
      raf = requestAnimationFrame(frame);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerout", onLeave);
    } else {
      // draw one static frame
      frame();
      running = false;
    }
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
