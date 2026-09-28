import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import animate from "tailwindcss-animate";

// Dark "glass" theme: deep navy background, electric-blue glows, frosted cards.
// Exported so non-CSS places (social images, web manifest, browser theme colour) use the same values.
export const palette = {
  background: "#050A15",
  surface: "#0B1323",
  tint: "#081122",
  primary: "#2563EB", // fills (buttons, badges). White text passes AA.
  primaryHover: "#1D4ED8",
  primaryLight: "#3B82F6",
  accent: "#60A5FA", // blue for text, icons, and highlights on dark backgrounds
  heading: "#F1F5F9",
  body: "#94A3B8",
  border: "#1C2940",
  white: "#FFFFFF",
};

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px" },
    },
    extend: {
      colors: {
        background: palette.background,
        surface: palette.surface,
        tint: palette.tint,
        primary: {
          DEFAULT: palette.primary,
          hover: palette.primaryHover,
          light: palette.primaryLight,
          foreground: palette.white,
        },
        accent: {
          DEFAULT: palette.accent,
          foreground: palette.background,
        },
        heading: palette.heading,
        body: palette.body,
        border: palette.border,
        teal: "#2DD4BF",
        danger: {
          DEFAULT: "#F87171",
          soft: "#2A1116",
        },
        whatsapp: {
          DEFAULT: "#128C7E",
          hover: "#075E54",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        heading: ["var(--font-jakarta)", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "brand-gradient": `linear-gradient(135deg, ${palette.primaryHover} 0%, ${palette.primary} 45%, ${palette.primaryLight} 100%)`,
        "brand-text": `linear-gradient(90deg, ${palette.accent} 0%, #BFDBFE 100%)`,
        "heading-gradient": `linear-gradient(135deg, ${palette.white} 35%, #8A99B3 100%)`,
        "hero-glow": "radial-gradient(70% 55% at 70% 0%, rgb(37 99 235 / 0.28) 0%, transparent 70%)",
        "section-glow": "radial-gradient(60% 50% at 50% 100%, rgb(37 99 235 / 0.18) 0%, transparent 70%)",
        "card-glow": "radial-gradient(120% 70% at 50% 115%, rgb(37 99 235 / 0.6) 0%, transparent 65%)",
        beam: "linear-gradient(115deg, transparent 42%, rgb(59 130 246 / 0.16) 50%, transparent 58%)",
        glyphs: "url('/images/glyphs.svg')",
      },
      boxShadow: {
        soft: "inset 0 1px 0 0 rgb(255 255 255 / 0.05), 0 20px 40px -24px rgb(0 0 0 / 0.8)",
        "soft-lg": "inset 0 1px 0 0 rgb(255 255 255 / 0.07), 0 30px 60px -20px rgb(0 0 0 / 0.9)",
        glow: "0 0 0 1px rgb(59 130 246 / 0.35), 0 10px 40px -8px rgb(37 99 235 / 0.65)",
        button: "inset 0 1px 0 0 rgb(255 255 255 / 0.25), 0 8px 24px -6px rgb(37 99 235 / 0.7)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
