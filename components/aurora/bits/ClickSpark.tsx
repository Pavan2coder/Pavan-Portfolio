"use client";

import { useEffect, useRef } from "react";

/**
 * React Bits–style click spark + soft cursor glow.
 * A full-screen canvas overlay: every click bursts a ring of brand-coloured
 * sparks, and a faint glow trails the pointer. Desktop / fine-pointer only.
 */
export function ClickSpark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    const glow = { x: -100, y: -100, tx: -100, ty: -100 };

    type Spark = {
      x: number;
      y: number;
      angle: number;
      life: number;
      speed: number;
      hue: string;
    };
    let sparks: Spark[] = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function burst(x: number, y: number) {
      const n = 14;
      const hues = ["77, 124, 255", "34, 211, 238", "124, 192, 255"];
      for (let i = 0; i < n; i++) {
        sparks.push({
          x,
          y,
          angle: (Math.PI * 2 * i) / n + Math.random() * 0.3,
          life: 1,
          speed: 3 + Math.random() * 3.5,
          hue: hues[i % hues.length],
        });
      }
    }

    function frame() {
      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // cursor glow (eased)
      glow.x += (glow.tx - glow.x) * 0.18;
      glow.y += (glow.ty - glow.y) * 0.18;
      const g = ctx!.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, 26);
      g.addColorStop(0, "rgba(77, 124, 255, 0.26)");
      g.addColorStop(1, "rgba(77, 124, 255, 0)");
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.arc(glow.x, glow.y, 26, 0, Math.PI * 2);
      ctx!.fill();

      // sparks
      sparks = sparks.filter((s) => s.life > 0);
      for (const s of sparks) {
        s.life -= 0.028;
        s.speed *= 0.92;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        const len = 6 * s.life;
        ctx!.strokeStyle = `rgba(${s.hue}, ${s.life})`;
        ctx!.lineWidth = 2;
        ctx!.lineCap = "round";
        ctx!.beginPath();
        ctx!.moveTo(s.x, s.y);
        ctx!.lineTo(
          s.x - Math.cos(s.angle) * len,
          s.y - Math.sin(s.angle) * len,
        );
        ctx!.stroke();
      }

      raf = requestAnimationFrame(frame);
    }

    function onMove(e: PointerEvent) {
      glow.tx = e.clientX;
      glow.ty = e.clientY;
    }
    function onDown(e: PointerEvent) {
      burst(e.clientX, e.clientY);
    }

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
    />
  );
}
