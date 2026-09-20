import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F1EA",
        "cream-dim": "#EAE3D7",
        ink: "#111111",
        "ink-soft": "#3A3A3A",
        accent: "#FF4D2E",
        "accent-deep": "#E63A1D",
        deep: "#1B3A2F",
        "deep-soft": "#2C5647",
        lime: "#E8FF5A",
        paper: "#FFFDF8",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest2: "-0.05em",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "blob-pop": {
          "0%": { transform: "scale(0.85) rotate(-4deg)" },
          "50%": { transform: "scale(1.05) rotate(2deg)" },
          "100%": { transform: "scale(0.95) rotate(-1deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        "grain-shift": {
          "0%, 100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(-4%,3%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "marquee-slow": "marquee 40s linear infinite",
        "spin-slow": "spin-slow 14s linear infinite",
        "blob-pop": "blob-pop 5s ease-in-out infinite",
        "pulse-ring": "pulse-ring 1.6s cubic-bezier(0.2,0.6,0.35,1) infinite",
        "grain-shift": "grain-shift 9s steps(6) infinite",
      },
      boxShadow: {
        sticker: "4px 6px 0 rgba(17,17,17,0.9)",
        "sticker-sm": "3px 4px 0 rgba(17,17,17,0.9)",
        hard: "6px 6px 0 rgba(17,17,17,0.95)",
        "hard-sm": "4px 4px 0 rgba(17,17,17,0.95)",
      },
    },
  },
  plugins: [],
};

export default config;