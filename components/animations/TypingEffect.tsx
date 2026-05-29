"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TypingEffect({
  text,
  speed = 28,
  className,
  cursor = true,
  onDone,
}: {
  text: string;
  speed?: number;
  className?: string;
  cursor?: boolean;
  onDone?: () => void;
}) {
  const [out, setOut] = useState("");

  useEffect(() => {
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, onDone]);

  return (
    <span className={cn("font-mono", className)}>
      {out}
      {cursor && (
        <span className="inline-block w-2 -translate-y-[1px] animate-blink text-primary">
          ▍
        </span>
      )}
    </span>
  );
}
