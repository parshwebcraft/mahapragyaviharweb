import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./services/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#fffaf1",
        foreground: "#3e2815",
        primary: {
          DEFAULT: "#F5D36A",
          foreground: "#5a3f11"
        },
        secondary: {
          DEFAULT: "#FFF7E6",
          foreground: "#593a16"
        },
        accent: {
          DEFAULT: "#7A1E1E",
          foreground: "#fff3eb"
        },
        border: "#eadfca",
        ring: "#d1a940",
        card: "#fff9ec",
        muted: "#f3ead9",
        "muted-foreground": "#806347"
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 80px rgba(115, 67, 22, 0.12)",
        glass: "0 12px 40px rgba(122, 30, 30, 0.12)"
      },
      backgroundImage: {
        aura:
          "radial-gradient(circle at top, rgba(245, 211, 106, 0.32), transparent 40%), linear-gradient(135deg, rgba(255,247,230,0.96), rgba(255,255,255,0.86))"
      }
    }
  },
  plugins: []
};

export default config;
