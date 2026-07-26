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

    const mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999, active: false };

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
    }

    function step() {
      t += 0.008;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx!.clearRect(0, 0, width, height);

      // Additive blend mode for luminous light compounding
      ctx!.globalCompositeOperation = "lighter";

      // 1. Draw Liquid Chromatic Wave Fields
      const numWaves = 4;
      const baseSpacing = height / (numWaves + 1);

      for (let wIdx = 0; wIdx < numWaves; wIdx++) {
        const yCenter = baseSpacing * (wIdx + 1);
        ctx!.beginPath();

        let prevX = 0;
        let prevY = yCenter;
        ctx!.moveTo(0, yCenter);

        const stepX = 18;
        for (let x = 0; x <= width + stepX; x += stepX) {
          // Complex multi-harmonic wave equation
          const freq1 = 0.0025 * (wIdx + 1);
          const freq2 = 0.005 * (wIdx + 1);
          
          let waveOffset =
            Math.sin(x * freq1 + t * (1.2 + wIdx * 0.3)) * 45 +
            Math.cos(x * freq2 - t * 0.8) * 30 +
            Math.sin((x + yCenter) * 0.003 + t) * 25;

          // Interactive Cursor Ripple Distortion
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = yCenter - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 260 && dist > 1) {
              const ripple = Math.sin(dist * 0.04 - t * 4) * (1 - dist / 260) * 55;
              waveOffset += ripple;
            }
          }

          const currY = yCenter + waveOffset;
          ctx!.quadraticCurveTo(prevX, prevY, (prevX + x) / 2, (prevY + currY) / 2);
          prevX = x;
          prevY = currY;
        }

        // Chromatic Color Selection for each wave layer
        let strokeGradient: CanvasGradient;
        if (wIdx === 0) {
          strokeGradient = ctx!.createLinearGradient(0, 0, width, 0);
          strokeGradient.addColorStop(0, "rgba(99, 102, 241, 0.45)"); // Electric Indigo
          strokeGradient.addColorStop(0.5, "rgba(0, 245, 212, 0.55)"); // Holographic Mint
          strokeGradient.addColorStop(1, "rgba(255, 170, 0, 0.35)");  // Liquid Amber
        } else if (wIdx === 1) {
          strokeGradient = ctx!.createLinearGradient(0, 0, width, 0);
          strokeGradient.addColorStop(0, "rgba(0, 245, 212, 0.4)");
          strokeGradient.addColorStop(0.5, "rgba(244, 63, 94, 0.45)"); // Neon Rose
          strokeGradient.addColorStop(1, "rgba(99, 102, 241, 0.4)");
        } else if (wIdx === 2) {
          strokeGradient = ctx!.createLinearGradient(0, 0, width, 0);
          strokeGradient.addColorStop(0, "rgba(255, 170, 0, 0.35)");
          strokeGradient.addColorStop(0.6, "rgba(99, 102, 241, 0.5)");
          strokeGradient.addColorStop(1, "rgba(0, 245, 212, 0.35)");
        } else {
          strokeGradient = ctx!.createLinearGradient(0, 0, width, 0);
          strokeGradient.addColorStop(0, "rgba(168, 85, 247, 0.4)"); // Electric Violet
          strokeGradient.addColorStop(0.5, "rgba(0, 245, 212, 0.45)");
          strokeGradient.addColorStop(1, "rgba(99, 102, 241, 0.4)");
        }

        ctx!.strokeStyle = strokeGradient;
        ctx!.lineWidth = 3 + wIdx * 1.5;
        ctx!.stroke();
      }

      // 2. Cursor Specular Refraction Glow
      if (mouse.active) {
        const flareGlow = ctx!.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          360
        );
        flareGlow.addColorStop(0, "rgba(0, 245, 212, 0.22)");
        flareGlow.addColorStop(0.4, "rgba(99, 102, 241, 0.12)");
        flareGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx!.fillStyle = flareGlow;
        ctx!.beginPath();
        ctx!.arc(mouse.x, mouse.y, 360, 0, Math.PI * 2);
        ctx!.fill();
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
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    }

    function onLeave() {
      mouse.active = false;
    }

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
      { threshold: 0 }
    );
    io.observe(canvas);

    resize();
    if (!reduce) {
      running = true;
      raf = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerout", onLeave);
    } else {
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
