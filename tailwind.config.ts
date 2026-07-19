import type { Config } from "tailwindcss";

/**
 * AURORA design system.
 * Tokens are CSS variables (globals.css) so a single [data-theme] switch
 * retones everything. Dark is the default ground.
 */
const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "var(--bg)",
          2: "var(--bg-2)",
          3: "var(--bg-3)",
        },
        card: {
          DEFAULT: "var(--card)",
          2: "var(--card-2)",
        },
        brand: {
          DEFAULT: "var(--brand)",
          2: "var(--brand-2)",
          3: "var(--brand-3)",
          soft: "var(--brand-soft)",
          line: "var(--brand-line)",
        },
        hairline: "var(--hairline)",
        "border-strong": "var(--border-strong)",
        text: {
          DEFAULT: "var(--text)",
          muted: "var(--text-muted)",
          faint: "var(--text-faint)",
        },
        // semantic aliases
        background: "var(--bg)",
        foreground: "var(--text)",
        border: "var(--border)",
        ring: "var(--brand)",
        primary: { DEFAULT: "var(--brand)", foreground: "#ffffff" },
        muted: { DEFAULT: "var(--card)", foreground: "var(--text-faint)" },
        input: "var(--border)",
      },
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        xl: "28px",
        "2xl": "34px",
      },
      boxShadow: {
        e1: "var(--e1)",
        e2: "var(--e2)",
        e3: "var(--e3)",
        glow: "var(--glow)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        label: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.24em" }],
      },
      maxWidth: {
        content: "1200px",
        wide: "1320px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        io: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s var(--ease-out) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
