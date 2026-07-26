"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import {
  SiJavascript,
  SiFlutter,
  SiMongodb,
  SiFirebase,
  SiFastapi,
} from "react-icons/si";
import type { IconType } from "react-icons";

/**
 * A rotating 3D tech "universe": a wireframe sphere (canvas, real 3D rotation)
 * with a glowing core over a starfield, ringed by orbiting stack icons, framed
 * by a live HUD status bar. Everything animates; reduced-motion draws it static.
 */

const TECHS: { Icon: IconType; color: string; ring: number }[] = [
  { Icon: FaReact, color: "#61DAFB", ring: 0 },
  { Icon: FaNodeJs, color: "#83CD29", ring: 0 },
  { Icon: FaPython, color: "#a3e635", ring: 0 },
  { Icon: SiJavascript, color: "#F7DF1E", ring: 0 },
  { Icon: SiFlutter, color: "#47C5FB", ring: 1 },
  { Icon: SiMongodb, color: "#47A248", ring: 1 },
  { Icon: SiFastapi, color: "#12b39a", ring: 1 },
  { Icon: SiFirebase, color: "#FFCA28", ring: 1 },
];

export function TechUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // fibonacci sphere points
    const N = 64;
    const pts = Array.from({ length: N }, (_, k) => {
      const phi = Math.acos(1 - (2 * (k + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * k;
      return {
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
      };
    });
    // neighbour edges (by base distance)
    const edges: [number, number][] = [];
    for (let i = 0; i < N; i++)
      for (let j = i + 1; j < N; j++) {
        const d = Math.hypot(
          pts[i].x - pts[j].x,
          pts[i].y - pts[j].y,
          pts[i].z - pts[j].z,
        );
        if (d < 0.5) edges.push([i, j]);
      }

    let stars: { x: number; y: number; r: number; p: number }[] = [];

    function resize() {
      const parent = canvas!.parentElement!;
      w = parent.clientWidth;
      h = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.floor((w * h) / 5200) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        p: Math.random() * Math.PI * 2,
      }));
    }

    let tilt = 0.42;
    let a = 0;
    let frame = 0;

    // drag-to-rotate state
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let vel = 0;

    function project(p: { x: number; y: number; z: number }) {
      // rotate Y
      const x1 = p.x * Math.cos(a) + p.z * Math.sin(a);
      const z1 = -p.x * Math.sin(a) + p.z * Math.cos(a);
      const y1 = p.y;
      // tilt X
      const y2 = y1 * Math.cos(tilt) - z1 * Math.sin(tilt);
      const z2 = y1 * Math.sin(tilt) + z1 * Math.cos(tilt);
      return { x: x1, y: y2, z: z2 };
    }

    function draw() {
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.24;
      ctx!.clearRect(0, 0, w, h);

      // starfield
      frame++;
      for (const s of stars) {
        const tw = 0.5 + 0.5 * Math.sin(frame * 0.03 + s.p);
        ctx!.globalAlpha = 0.25 + tw * 0.5;
        ctx!.fillStyle = "#9fb8c8";
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      // orbit ellipses
      ctx!.save();
      ctx!.translate(cx, cy);
      for (let o = 0; o < 3; o++) {
        const rx = R * (1.55 + o * 0.5);
        const ry = rx * 0.34;
        ctx!.strokeStyle =
          o % 2 === 0 ? "rgba(0,255,157,0.3)" : "rgba(0,242,254,0.25)";
        ctx!.lineWidth = 1;
        ctx!.save();
        ctx!.rotate(0.35 * (o + 1) + a * (0.6 - o * 0.14));
        ctx!.beginPath();
        ctx!.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.restore();
      }
      ctx!.restore();

      // core glow
      const g = ctx!.createRadialGradient(cx, cy, 0, cx, cy, R * 1.1);
      g.addColorStop(0, "rgba(240,253,250,0.95)");
      g.addColorStop(0.25, "rgba(0,255,157,0.45)");
      g.addColorStop(0.5, "rgba(0,242,254,0.25)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R * 1.1, 0, Math.PI * 2);
      ctx!.fill();

      // project points
      const proj = pts.map((p) => project(p));

      // edges
      for (const [i, j] of edges) {
        const A = proj[i];
        const B = proj[j];
        const depth = (A.z + B.z) / 2;
        ctx!.strokeStyle = `rgba(0,255,157,${0.1 + ((depth + 1) / 2) * 0.3})`;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(cx + A.x * R, cy + A.y * R);
        ctx!.lineTo(cx + B.x * R, cy + B.y * R);
        ctx!.stroke();
      }
      // points
      for (const P of proj) {
        const dz = (P.z + 1) / 2;
        ctx!.fillStyle = `rgba(${P.z > 0 ? "0,255,157" : "0,242,254"},${0.4 + dz * 0.55})`;
        ctx!.beginPath();
        ctx!.arc(cx + P.x * R, cy + P.y * R, 0.8 + dz * 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }

      // rotation: dragging (applied in onMove) → momentum → gentle auto-spin
      if (dragging) {
        /* handled by pointer move */
      } else if (Math.abs(vel) > 0.0006) {
        a += vel;
        vel *= 0.95;
      } else if (!reduce) {
        a += 0.006;
      }
      raf = requestAnimationFrame(draw);
    }

    function onDown(e: PointerEvent) {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      vel = 0;
      try {
        canvas!.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
    function onMove(e: PointerEvent) {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      a += dx * 0.01;
      vel = dx * 0.01;
      tilt = Math.max(-1.2, Math.min(1.2, tilt - dy * 0.006));
      lastX = e.clientX;
      lastY = e.clientY;
    }
    function onUp() {
      dragging = false;
    }

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    canvas.style.cursor = "grab";
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-bg-2 sm:h-[520px]">
      {/* corner ticks */}
      {[
        "left-3 top-3 border-l border-t",
        "right-3 top-3 border-r border-t",
        "left-3 bottom-3 border-b border-l",
        "right-3 bottom-3 border-b border-r",
      ].map((c) => (
        <span
          key={c}
          className={`pointer-events-none absolute h-5 w-5 border-brand-line ${c}`}
        />
      ))}

      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden />

      {/* orbiting stack icons */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <Orbits />
      </div>

      {/* HUD */}
      <Hud />
    </div>
  );
}

function Orbits() {
  const ringDefs = [
    { techs: TECHS.filter((t) => t.ring === 0), radius: 150, dur: 26, dir: 1 },
    { techs: TECHS.filter((t) => t.ring === 1), radius: 232, dur: 40, dir: -1 },
  ];
  return (
    <div className="relative h-[520px] w-[520px] max-w-full">
      {ringDefs.map((ring, ri) => (
        <motion.div
          key={ri}
          className="absolute inset-0"
          style={{ transform: `rotateX(66deg)`, transformStyle: "preserve-3d" }}
          animate={{ rotate: 360 * ring.dir }}
          transition={{ duration: ring.dur, repeat: Infinity, ease: "linear" }}
        >
          {ring.techs.map((t, i) => {
            const ang = (i / ring.techs.length) * Math.PI * 2;
            const x = 50 + (ring.radius / 5.2) * Math.cos(ang);
            const y = 50 + (ring.radius / 5.2) * Math.sin(ang);
            return (
              <motion.div
                key={i}
                className="absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border border-border-strong bg-bg-3 shadow-e2"
                style={{ left: `${x}%`, top: `${y}%` }}
                animate={{ rotate: -360 * ring.dir, rotateX: -66 }}
                transition={{ duration: ring.dur, repeat: Infinity, ease: "linear" }}
              >
                <t.Icon size={22} color={t.color} />
              </motion.div>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
}

function Hud() {
  const [stat, setStat] = useState({ cpu: 32, mem: 41, net: 1.2 });
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setStat((s) => ({
        cpu: Math.round(clamp(s.cpu + rand(), 18, 74)),
        mem: Math.round(clamp(s.mem + rand(), 30, 68)),
        net: +clamp(s.net + rand() / 10, 0.4, 2.4).toFixed(1),
      }));
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date()),
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint backdrop-blur-sm sm:text-[11px]"
      style={{ background: "rgba(8,14,11,0.55)" }}
    >
      <div className="flex items-center gap-3 sm:gap-5">
        <span className="inline-flex items-center gap-1.5 text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" /> sys / online
        </span>
        <span className="hidden sm:inline">
          cpu <span className="text-brand-2">{stat.cpu}%</span>
        </span>
        <span className="hidden sm:inline">
          mem <span className="text-brand-2">{stat.mem}%</span>
        </span>
        <span>
          net <span className="text-brand-2">{stat.net}gb/s</span>
        </span>
      </div>
      <div className="flex items-center gap-3 sm:gap-5">
        <span className="hidden sm:inline">sector / 07</span>
        <span className="hidden text-brand sm:inline">uplink / stable</span>
        <span className="text-text-muted">{time ?? "--:--:--"}</span>
      </div>
    </div>
  );
}

function rand() {
  return (Math.random() - 0.5) * 5;
}
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}
