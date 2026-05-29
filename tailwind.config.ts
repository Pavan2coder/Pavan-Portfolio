import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050816",
        "bg-soft": "#0a1124",
        primary: {
          DEFAULT: "#00ffff",
          50: "#e6ffff",
          glow: "#00ffff",
        },
        secondary: {
          DEFAULT: "#007cf0",
          glow: "#007cf0",
        },
        accent: {
          DEFAULT: "#7df9ff",
        },
        text: {
          DEFAULT: "#e6f1ff",
          muted: "#7a8bb3",
          dim: "#3d4f7a",
        },
        panel: "rgba(8, 16, 36, 0.6)",
        border: "rgba(0, 255, 255, 0.18)",
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        rajdhani: ["var(--font-rajdhani)", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 255, 255, 0.4), 0 0 40px rgba(0, 124, 240, 0.2)",
        "glow-sm": "0 0 10px rgba(0, 255, 255, 0.35)",
        "glow-lg": "0 0 60px rgba(0, 255, 255, 0.35), 0 0 100px rgba(0, 124, 240, 0.25)",
        "inner-glow": "inset 0 0 20px rgba(0, 255, 255, 0.15)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "spin-slow": "spin 18s linear infinite",
        "spin-reverse": "spinReverse 24s linear infinite",
        "pulse-glow": "pulseGlow 2.4s ease-in-out infinite",
        scan: "scan 3s linear infinite",
        "scan-y": "scanY 4s linear infinite",
        float: "float 6s ease-in-out infinite",
        "grid-pan": "gridPan 20s linear infinite",
        flicker: "flicker 4s linear infinite",
        "radar-sweep": "radarSweep 4s linear infinite",
        blink: "blink 1s steps(2, start) infinite",
        "fade-up": "fadeUp 0.7s ease-out both",
      },
      keyframes: {
        spinReverse: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        pulseGlow: {
          "0%,100%": {
            boxShadow:
              "0 0 20px rgba(0,255,255,0.35), 0 0 40px rgba(0,124,240,0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 40px rgba(0,255,255,0.55), 0 0 80px rgba(0,124,240,0.35)",
          },
        },
        scan: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        scanY: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gridPan: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "60px 60px" },
        },
        flicker: {
          "0%,19%,21%,23%,25%,54%,56%,100%": { opacity: "1" },
          "20%,24%,55%": { opacity: "0.65" },
        },
        radarSweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "grid-cyan":
          "linear-gradient(rgba(0,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.08) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at center, rgba(0,124,240,0.18), transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
