import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "rgb(var(--ink-950) / <alpha-value>)",
          900: "rgb(var(--ink-900) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
          600: "rgb(var(--ink-600) / <alpha-value>)",
        },
        // Theme-aware foreground. Every existing text-white / bg-white/5 /
        // border-white/10 utility resolves through --c-fg, so the whole site
        // flips between themes without touching each component.
        white: "rgb(var(--c-fg) / <alpha-value>)",
        // Literal white for text/controls that always sit on a dark scrim
        // (video captions, lightbox chrome, gradient buttons).
        snow: "#ffffff",
        offwhite: "#f3f4f7",
        // Primary interactive family — deep indigo. Replaces the old
        // "electric" blue; still reads as tech/AI but leans richer/darker.
        flare: {
          400: "rgb(var(--flare-400) / <alpha-value>)",
          500: "#6247ff",
          600: "#4b2fe0",
        },
        // Secondary accent — hot magenta/fuchsia. Deliberately not the
        // typical AI-brand violet; carries more energy.
        magenta: {
          400: "rgb(var(--magenta-400) / <alpha-value>)",
          500: "#e024c0",
          600: "#b915a0",
        },
        // Tertiary highlight — warm amber/gold. Ties back to the real
        // "Hall of Fame" event gold branding already used by Athenix.
        amber: {
          400: "rgb(var(--amber-400) / <alpha-value>)",
          500: "#ffb020",
          600: "#e08e00",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        "athenix-glow":
          "radial-gradient(60% 60% at 50% 0%, rgba(224,36,192,var(--glow-a)) 0%, rgba(98,71,255,var(--glow-b)) 40%, rgb(var(--ink-950) / 0) 70%)",
        "athenix-line":
          "linear-gradient(90deg, #4b2fe0 0%, #e024c0 55%, #ffb020 100%)",
        "athenix-line-animated":
          "linear-gradient(110deg, #4b2fe0 0%, #e024c0 35%, #ffb020 65%, #4b2fe0 100%)",
        grain: "url('/images/noise.svg')",
      },
      boxShadow: {
        glow: "0 0 40px rgba(224,36,192,0.28)",
        glowAmber: "0 0 40px rgba(255,176,32,0.25)",
        card: "0 8px 30px rgba(0,0,0,var(--shadow-card-a))",
      },
      animation: {
        pulseSlow: "pulseSlow 3s ease-in-out infinite",
        floatY: "floatY 6s ease-in-out infinite",
        gradientShift: "gradientShift 6s ease infinite",
        marquee: "marquee 28s linear infinite",
        fadeInUp: "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        countUp: "fadeIn 0.4s ease forwards",
        spin3d: "spin3d 14s linear infinite",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        spin3d: {
          "0%": { transform: "rotateY(0deg) rotateX(8deg)" },
          "50%": { transform: "rotateY(180deg) rotateX(-8deg)" },
          "100%": { transform: "rotateY(360deg) rotateX(8deg)" },
        },
      },
      backgroundSize: {
        "gradient-lg": "200% 200%",
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("light", ":root[data-theme=\"light\"] &");
    }),
  ],
};

export default config;
