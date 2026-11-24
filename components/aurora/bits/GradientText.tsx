"use client";

/** React Bits — GradientText: animated multi-stop gradient fill. */
export function GradientText({
  children,
  colors = ["#c6ff3d", "#8b7bff", "#3b5bff", "#c6ff3d"],
  speed = 6,
  className = "",
}: {
  children: React.ReactNode;
  colors?: string[];
  speed?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
        backgroundSize: "300% 100%",
        animation: `gradient-flow ${speed}s linear infinite`,
      }}
    >
      {children}
    </span>
  );
}
