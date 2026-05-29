"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * JARVIS-style targeting cursor.
 * - 4 rotating corner brackets lock onto interactive elements
 * - center dot follows pointer smoothly
 * - magnetic snap on hover targets via [data-cursor="target"] or buttons/links
 */
export function TargetCursor({
  targetSelector = 'a, button, [role="button"], [data-cursor="target"]',
  spinDuration = 6,
}: {
  targetSelector?: string;
  spinDuration?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!wrap || !ring || !dot) return;

    // hide native cursor at body level
    document.documentElement.classList.add("cursor-none");

    // smooth-follow tweens
    const xTo = gsap.quickTo(wrap, "x", { duration: 0.25, ease: "power3.out" });
    const yTo = gsap.quickTo(wrap, "y", { duration: 0.25, ease: "power3.out" });
    const dxTo = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dyTo = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });

    // continuous rotation of bracket ring
    const spin = gsap.to(ring, {
      rotate: 360,
      duration: spinDuration,
      ease: "none",
      repeat: -1,
    });

    let target: HTMLElement | null = null;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // dot tracks raw position fast
      dxTo(mx);
      dyTo(my);

      if (target) {
        // magnetic snap to target center
        const r = target.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        // soft pull toward center (60% magnet)
        xTo(cx + (mx - cx) * 0.35);
        yTo(cy + (my - cy) * 0.35);
      } else {
        xTo(mx);
        yTo(my);
      }
    };

    const enterTarget = (el: HTMLElement) => {
      target = el;
      const r = el.getBoundingClientRect();
      const size = Math.max(r.width, r.height) + 24;
      gsap.to(ring, {
        width: size,
        height: size,
        borderColor: "rgba(0,255,255,0.95)",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: 0.4, opacity: 0.6, duration: 0.25 });
      // speed up spin briefly
      spin.timeScale(2);
    };

    const leaveTarget = () => {
      target = null;
      gsap.to(ring, {
        width: 44,
        height: 44,
        borderColor: "rgba(0,255,255,0.7)",
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.25 });
      spin.timeScale(1);
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest(targetSelector) as
        | HTMLElement
        | null;
      if (el && el !== target) enterTarget(el);
    };

    const onOut = (e: MouseEvent) => {
      const next = (e.relatedTarget as HTMLElement | null)?.closest?.(
        targetSelector
      );
      if (!next) leaveTarget();
    };

    const onDown = () => {
      gsap.to(ring, { scale: 0.85, duration: 0.12, ease: "power2.out" });
    };
    const onUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.25, ease: "power3.out" });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // initial center
    xTo(mx);
    yTo(my);
    dxTo(mx);
    dyTo(my);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      spin.kill();
      document.documentElement.classList.remove("cursor-none");
    };
  }, [targetSelector, spinDuration]);

  return (
    <>
      {/* dot — fast tracker */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform hidden md:block"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-[#7df9ff] shadow-[0_0_10px_#00ffff]" />
      </div>

      {/* bracket ring — magnetic / locking */}
      <div
        ref={wrapRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform hidden md:block"
      >
        <div
          ref={ringRef}
          className="relative grid place-items-center"
          style={{
            width: 44,
            height: 44,
            border: "1px solid rgba(0,255,255,0.7)",
            borderRadius: 6,
            boxShadow:
              "0 0 14px rgba(0,255,255,0.35), inset 0 0 14px rgba(0,124,240,0.15)",
          }}
        >
          {/* corner brackets */}
          <Corner className="top-0 left-0 border-t border-l" />
          <Corner className="top-0 right-0 border-t border-r" />
          <Corner className="bottom-0 left-0 border-b border-l" />
          <Corner className="bottom-0 right-0 border-b border-r" />
        </div>
      </div>
    </>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute h-2.5 w-2.5 border-[#00ffff] ${className}`}
      style={{
        boxShadow: "0 0 6px rgba(0,255,255,0.85)",
      }}
    />
  );
}
