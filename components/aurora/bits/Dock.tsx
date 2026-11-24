"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";

type Item = { label: string; href: string; icon: React.ReactNode };

/** React Bits — Dock: macOS-style magnifying icon dock. */
export function Dock({ items, base = 48, magnified = 72 }: { items: Item[]; base?: number; magnified?: number }) {
  const mouseX = useMotionValue(Infinity);
  return (
    <div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex items-end gap-3 rounded-2xl border border-border-strong bg-card px-3 pb-2 pt-2"
      style={{ height: magnified + 16 }}
    >
      {items.map((it) => (
        <DockItem key={it.label} item={it} mouseX={mouseX} base={base} magnified={magnified} />
      ))}
    </div>
  );
}

function DockItem({ item, mouseX, base, magnified }: { item: Item; mouseX: MotionValue<number>; base: number; magnified: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const dist = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect();
    return r ? x - (r.left + window.scrollX) - r.width / 2 : Infinity;
  });
  const size = useSpring(useTransform(dist, [-150, 0, 150], [base, magnified, base]), {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  return (
    <motion.a
      ref={ref}
      href={item.href}
      target="_blank"
      rel="noreferrer"
      aria-label={item.label}
      title={item.label}
      style={{ width: size, height: size }}
      className="grid place-items-center rounded-xl border border-border bg-bg-3 text-text transition-colors hover:border-brand-line hover:text-brand"
    >
      {item.icon}
    </motion.a>
  );
}
