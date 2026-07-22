"use client";

// Ported from React Bits (https://reactbits.dev) · original by Juan Fuentes
// https://codepen.io/JuanFuentes/full/rgXKGQ — variable-font pressure effect.
// Adapted: font loaded via next/font (--font-pressure), no runtime <style>/@import
// (rendering a <style> here caused a Next App-Router hydration mismatch).

import { useEffect, useRef, useState, useCallback } from "react";

type Pt = { x: number; y: number };

const dist = (a: Pt, b: Pt) => Math.hypot(b.x - a.x, b.y - a.y);

const getAttr = (distance: number, maxDist: number, minVal: number, maxVal: number) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

function debounce<T extends (...args: never[]) => void>(func: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

type TextPressureProps = {
  text?: string;
  fontFamily?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  scale?: boolean;
  textColor?: string;
  className?: string;
  minFontSize?: number;
};

export default function TextPressure({
  text = "Compressa",
  fontFamily = "var(--font-pressure), sans-serif",
  width = true,
  weight = true,
  italic = false,
  alpha = false,
  flex = true,
  scale = false,
  textColor = "#FFFFFF",
  className = "",
  minFontSize = 24,
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef<Pt>({ x: 0, y: 0 });
  const cursorRef = useRef<Pt>({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.split("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    if (containerRef.current) {
      const { left, top, width: w, height } = containerRef.current.getBoundingClientRect();
      mouseRef.current = { x: left + w / 2, y: top + height / 2 };
      cursorRef.current = { ...mouseRef.current };
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;
    const { width: containerW, height: containerH } =
      containerRef.current.getBoundingClientRect();

    // leave headroom so wide (stretched) glyphs stay inside the container
    let newFontSize = containerW / (chars.length / 1.35);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();
      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    const debounced = debounce(setSize, 100);
    debounced();
    window.addEventListener("resize", debounced);
    return () => window.removeEventListener("resize", debounced);
  }, [setSize]);

  useEffect(() => {
    let rafId: number;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const maxDist = titleRef.current.getBoundingClientRect().width / 2;
        spansRef.current.forEach((span) => {
          if (!span) return;
          const rect = span.getBoundingClientRect();
          const charCenter = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
          const d = dist(mouseRef.current, charCenter);

          const wdth = width ? Math.floor(getAttr(d, maxDist, 5, 130)) : 100;
          const wght = weight ? Math.floor(getAttr(d, maxDist, 100, 900)) : 400;
          const italVal = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : "0";
          const alphaVal = alpha ? getAttr(d, maxDist, 0, 1).toFixed(2) : "1";

          const settings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
          if (span.style.fontVariationSettings !== settings) {
            span.style.fontVariationSettings = settings;
          }
          if (alpha && span.style.opacity !== alphaVal) {
            span.style.opacity = alphaVal;
          }
        });
      }
      rafId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha]);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100%", background: "transparent" }}
    >
      <h1
        ref={titleRef}
        className={className}
        style={{
          fontFamily,
          textTransform: "uppercase",
          fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: "center top",
          margin: 0,
          textAlign: "center",
          userSelect: "none",
          whiteSpace: "nowrap",
          fontWeight: 100,
          color: textColor,
          width: "100%",
          display: flex ? "flex" : "block",
          justifyContent: flex ? "space-between" : undefined,
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            style={{ display: "inline-block", color: textColor }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}
