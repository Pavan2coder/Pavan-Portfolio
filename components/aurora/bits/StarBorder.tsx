"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * React Bits–style StarBorder: two light streaks orbit the button edge over a
 * gradient fill. Renders as a link or button depending on `href`.
 */
export function StarBorder({
  children,
  href,
  onClick,
  className,
  target,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
}) {
  const inner = (
    <>
      {/* travelling streaks */}
      <span
        aria-hidden
        className="absolute bottom-0 right-0 h-[3px] w-[62%] animate-[star-x_3s_linear_infinite] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, var(--brand-2), transparent 60%)",
        }}
      />
      <span
        aria-hidden
        className="absolute top-0 left-0 h-[3px] w-[62%] animate-[star-x-rev_3s_linear_infinite] rounded-full opacity-70"
        style={{
          background: "radial-gradient(circle, var(--brand-3), transparent 60%)",
        }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  const cls = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5",
    className,
  );
  const style = {
    background: "linear-gradient(115deg, var(--brand), var(--brand-2))",
    boxShadow: "0 12px 34px -12px var(--brand-line)",
  };

  if (href) {
    return (
      <a href={href} target={target} rel={target ? "noreferrer" : undefined} className={cls} style={style}>
        {inner}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls} style={style}>
      {inner}
    </button>
  );
}
