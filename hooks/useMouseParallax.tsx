"use client";
import { createContext, useContext, useEffect, useState, useRef, ReactNode } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

const MouseParallaxContext = createContext<MousePosition>({
  x: 0,
  y: 0,
  normalizedX: 0,
  normalizedY: 0,
});

export function useMouseParallax() {
  return useContext(MouseParallaxContext);
}

export function MouseParallaxProvider({ children }: { children: ReactNode }) {
  const [mouse, setMouse] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      // Smooth lerp animation
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.1);
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.1);

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      setMouse({
        x: currentRef.current.x,
        y: currentRef.current.y,
        normalizedX: (currentRef.current.x - centerX) / centerX,
        normalizedY: (currentRef.current.y - centerY) / centerY,
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <MouseParallaxContext.Provider value={mouse}>
      {children}
    </MouseParallaxContext.Provider>
  );
}
