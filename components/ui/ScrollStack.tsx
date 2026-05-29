"use client";
import {
  Children,
  ReactNode,
  useEffect,
  useRef,
} from "react";

/**
 * React Bits–style scroll stack.
 * Each child becomes a sticky card; as you scroll, cards stack and the lower
 * ones scale down + blur slightly behind the current one for a cinematic feel.
 */
export function ScrollStack({
  children,
  className = "",
  itemClassName = "",
  topOffset = 96, // px from viewport top where cards lock
  gap = 32, // visual spacing between stacked cards (px)
  scaleStep = 0.04, // amount each lower card shrinks
  blurStep = 1.5, // px blur each lower card gets
}: {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  topOffset?: number;
  gap?: number;
  scaleStep?: number;
  blurStep?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const cards = Array.from(
      wrap.querySelectorAll<HTMLDivElement>("[data-stack-card]")
    );
    if (!cards.length) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const vh = window.innerHeight;
        cards.forEach((card, i) => {
          const r = card.getBoundingClientRect();
          // distance the card has been pulled past its lock point
          const past = topOffset - r.top;
          const total = cards.length;
          // depth = how many cards stacked behind this one once it locks
          // (later cards get more depth when they reach top)
          const cardsAhead = total - 1 - i;

          if (past > 0) {
            // this card is locked / being pushed
            // Lower cards (i smaller) appear behind upper ones.
            const stackedAbove = Math.min(
              cardsAhead,
              Math.max(0, Math.floor(past / Math.max(120, vh * 0.35)))
            );
            const scale = 1 - stackedAbove * scaleStep;
            const blur = stackedAbove * blurStep;
            const y = -stackedAbove * gap;
            card.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
            card.style.filter = blur > 0 ? `blur(${blur}px)` : "none";
            card.style.opacity = String(Math.max(0.35, 1 - stackedAbove * 0.12));
          } else {
            card.style.transform = "translate3d(0,0,0) scale(1)";
            card.style.filter = "none";
            card.style.opacity = "1";
          }
        });
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [topOffset, gap, scaleStep, blurStep, items.length]);

  return (
    <div ref={wrapRef} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          data-stack-card
          className={`sticky ${itemClassName}`}
          style={{
            top: topOffset,
            zIndex: 10 + i,
            transformOrigin: "center top",
            transition:
              "transform 200ms cubic-bezier(0.16,1,0.3,1), filter 200ms ease, opacity 200ms ease",
            willChange: "transform, filter, opacity",
            marginBottom: gap,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
