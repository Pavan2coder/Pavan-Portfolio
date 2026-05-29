"use client";
import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type Variant = "primary" | "ghost" | "outline";

type Props = HTMLMotionProps<"button"> & {
  variant?: Variant;
  glow?: boolean;
};

const styles: Record<Variant, string> = {
  primary:
    "bg-primary/15 text-primary border-primary/50 hover:bg-primary/25 hover:shadow-glow",
  ghost:
    "bg-transparent text-text border-primary/30 hover:bg-primary/10 hover:text-primary",
  outline:
    "bg-bg-soft/40 text-text border-primary/40 hover:border-primary hover:text-primary",
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "primary", glow, children, ...rest },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-xs sm:text-sm font-display uppercase tracking-[0.18em] transition-colors backdrop-blur",
        styles[variant],
        glow && "shadow-glow-sm",
        className
      )}
      {...rest}
    >
      <span className="absolute -inset-px rounded-md pointer-events-none opacity-0 hover:opacity-100 transition-opacity" />
      {children as React.ReactNode}
    </motion.button>
  );
});
