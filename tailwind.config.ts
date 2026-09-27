import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F5F1EA",
        cream: "#F5F1EA",
        "cream-dim": "#EDE8E0",
        paper: "#FFFFFF",
        ink: "#111111",
        "ink-soft": "#333333",
        "ink-muted": "#666666",
        line: "#DCD5CC",
        accent: "#FF4D2E",
        "accent-deep": "#E03E1F",
        deep: "#1B3A2F",
        "deep-soft": "#2D5A4A",
        lime: "#E8FF5A",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 12px 32px rgba(17, 17, 17, 0.07)",
        soft: "0 20px 60px rgba(17, 17, 17, 0.10)",
      },
      rotate: {
        "1": "1deg",
        "2": "2deg",
        "-1": "-1deg",
        "-2": "-2deg",
      },
    },
  },
  plugins: [],
};

export default config;