import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#08080f",
        "bg-soft": "#101020",
        primary: {
          DEFAULT: "#a78bfa",
          50: "#ede9fe",
          glow: "#a78bfa",
          foreground: "#0a0a14",
        },
        secondary: {
          DEFAULT: "#2dd4bf",
          glow: "#2dd4bf",
          foreground: "#0a0a14",
        },
        accent: {
          DEFAULT: "#5eead4",
          foreground: "#0a0a14",
        },
        text: {
          DEFAULT: "#eceaf6",
          muted: "#9b9ab5",
          dim: "#54546e",
        },
        panel: "rgba(255, 255, 255, 0.04)",
        border: "rgba(255, 255, 255, 0.08)",

        // shadcn/ui semantic tokens (mapped to the violet/teal dark theme)
        background: "#08080f",
        foreground: "#eceaf6",
        card: {
          DEFAULT: "#101020",
          foreground: "#eceaf6",
        },
        popover: {
          DEFAULT: "#101020",
          foreground: "#eceaf6",
        },
        muted: {
          DEFAULT: "#1a1a2b",
          foreground: "#9b9ab5",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#fef2f2",
        },
        input: "rgba(255, 255, 255, 0.12)",
        ring: "#a78bfa",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        rajdhani: ["var(--font-rajdhani)", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 18px 50px -12px rgba(167, 139, 250, 0.35)",
        "glow-sm": "0 0 12px rgba(167, 139, 250, 0.28)",
        "glow-lg": "0 30px 80px -20px rgba(45, 212, 191, 0.3), 0 18px 50px -12px rgba(167, 139, 250, 0.28)",
        "inner-glow": "inset 0 1px 0 rgba(255, 255, 255, 0.06)",
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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        spinReverse: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        pulseGlow: {
          "0%,100%": {
            boxShadow:
              "0 18px 50px -12px rgba(167,139,250,0.3)",
          },
          "50%": {
            boxShadow:
              "0 22px 60px -10px rgba(45,212,191,0.4)",
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
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      backgroundImage: {
        "grid-cyan":
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at center, rgba(167,139,250,0.16), transparent 60%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
