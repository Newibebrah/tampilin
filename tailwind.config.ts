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
        canvas: "#F7F7F3",
        cream: "#F7F7F3",
        "cream-dim": "#EEF0E9",
        paper: "#FFFFFF",
        ink: "#15211E",
        "ink-soft": "#35433E",
        "ink-muted": "#63716C",
        line: "#DCE4DF",
        accent: "#F05A3C",
        "accent-deep": "#D9472E",
        deep: "#173B33",
        "deep-soft": "#28584A",
        lime: "#DDF26B",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 12px 32px rgba(21, 33, 30, 0.07)",
        soft: "0 20px 60px rgba(21, 33, 30, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
