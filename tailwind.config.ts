import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Base
        paper: "#F5F1EA",
        "paper-subtle": "#EDE8E0",
        "paper-deep": "#E5DFD4",
        // Ink
        ink: "#111111",
        "ink-muted": "#4A4A4A",
        "ink-subtle": "#8A8A8A",
        // Accent - Flame
        flame: "#FF4D2E",
        "flame-hover": "#E63E1F",
        "flame-subtle": "#FFE5DE",
        // Secondary - Forest
        forest: "#1B3A2F",
        "forest-subtle": "#E5EDE8",
        // Highlight
        lime: "#E8FF5A",
        // Border
        border: "rgba(17,17,17,0.08)",
        "border-strong": "rgba(17,17,17,0.16)",
        // Glass
        glass: "rgba(245,241,234,0.72)",
        // Dark mode overrides (applied via .dark class)
        dark: {
          paper: "#0A0A0A",
          "paper-subtle": "#1A1A1A",
          "paper-deep": "#222222",
          ink: "#F5F1EA",
          "ink-muted": "#B0B0B0",
          "ink-subtle": "#7A7A7A",
          border: "rgba(245,241,234,0.12)",
          "border-strong": "rgba(245,241,234,0.24)",
          glass: "rgba(10,10,10,0.72)",
          "flame-subtle": "#3D1A12",
          "forest-subtle": "#0D2018",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(4rem, 8vw, 7rem)", { lineHeight: "0.9", letterSpacing: "-0.04em", fontWeight: "500" }],
        "display-lg": ["clamp(3rem, 6vw, 5rem)", { lineHeight: "0.95", letterSpacing: "-0.035em", fontWeight: "500" }],
        "display-md": ["clamp(2.25rem, 4vw, 3.5rem)", { lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "500" }],
        "display-sm": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "500" }],
        "heading-lg": ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "heading-md": ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "heading-sm": ["1.125rem", { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7", letterSpacing: "0" }],
        "body": ["1rem", { lineHeight: "1.7", letterSpacing: "0" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6", letterSpacing: "0" }],
"caption": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.02em" }],
"mono-sm": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.02em" }],
"mono-xs": ["0.625rem", { lineHeight: "1.5", letterSpacing: "0.04em" }],
      },
      spacing: {
        "space-0": "0",
        "space-1": "4px",
        "space-2": "8px",
        "space-3": "12px",
        "space-4": "16px",
        "space-5": "20px",
        "space-6": "24px",
        "space-8": "32px",
        "space-10": "40px",
        "space-12": "48px",
        "space-16": "64px",
        "space-20": "80px",
        "space-24": "96px",
        "space-32": "128px",
        "space-40": "160px",
        "space-48": "192px",
      },
      borderRadius: {
        none: "0",
        sharp: "0",
        soft: "8px",
        pill: "9999px",
        blob: "32px",
      },
      boxShadow: {
        "layer-1": "0 1px 2px rgba(0,0,0,0.04)",
        "layer-2": "0 1px 2px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.04)",
        "layer-3": "0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
        "glow-flame": "0 0 0 1px rgba(255,77,46,0.2), 0 4px 16px rgba(255,77,46,0.15)",
        "glow-flame-dark": "0 0 0 1px rgba(255,77,46,0.3), 0 4px 16px rgba(255,77,46,0.2)",
      },
      borderWidth: {
        "hairline": "1px",
      },
      transitionDuration: {
        "micro": "150ms",
        "standard": "300ms",
        "complex": "600ms",
        "page": "800ms",
      },
      transitionTimingFunction: {
        "enter": "cubic-bezier(0.22, 1, 0.36, 1)",
        "exit": "cubic-bezier(0.4, 0, 1, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      animation: {
        "fade-in": "fadeIn 300ms cubic-bezier(0.22, 1, 0.36, 1)",
        "fade-out": "fadeOut 200ms cubic-bezier(0.4, 0, 1, 1)",
        "slide-up": "slideUp 400ms cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-down": "slideDown 300ms cubic-bezier(0.22, 1, 0.36, 1)",
        "scale-in": "scaleIn 200ms cubic-bezier(0.22, 1, 0.36, 1)",
        "reveal": "reveal 600ms cubic-bezier(0.22, 1, 0.36, 1)",
        "shimmer": "shimmer 2s infinite",
        "pulse-soft": "pulseSoft 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        reveal: {
          "0%": { clipPath: "inset(100% 0 0 0)" },
          "100%": { clipPath: "inset(0 0 0 0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      backgroundImage: {
        "gradient-flame": "linear-gradient(135deg, #FF4D2E 0%, #FF6B3E 100%)",
        "gradient-lime": "linear-gradient(135deg, #E8FF5A 0%, #D4FF2E 100%)",
        "gradient-flame-lime": "linear-gradient(135deg, rgba(255,77,46,0.08) 0%, rgba(232,255,90,0.06) 50%, rgba(27,58,47,0.08) 100%)",
        "gradient-mesh": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,77,46,0.15), transparent), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(232,255,90,0.1), transparent)",
        "gradient-dark-mesh": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,77,46,0.1), transparent), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(232,255,90,0.08), transparent)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "24px",
          sm: "32px",
          lg: "48px",
          xl: "64px",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1440px",
        },
      },
    },
  },
  plugins: [],
};

export default config;