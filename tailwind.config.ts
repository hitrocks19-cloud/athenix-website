import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05060a",
          900: "#0a0c12",
          800: "#10131c",
          700: "#171b28",
          600: "#232838",
        },
        offwhite: "#f3f4f7",
        // Primary interactive family — deep indigo. Replaces the old
        // "electric" blue; still reads as tech/AI but leans richer/darker.
        flare: {
          400: "#8677ff",
          500: "#6247ff",
          600: "#4b2fe0",
        },
        // Secondary accent — hot magenta/fuchsia. Deliberately not the
        // typical AI-brand violet; carries more energy.
        magenta: {
          400: "#f45fd6",
          500: "#e024c0",
          600: "#b915a0",
        },
        // Tertiary highlight — warm amber/gold. Ties back to the real
        // "Hall of Fame" event gold branding already used by Athenix.
        amber: {
          400: "#ffcc66",
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
          "radial-gradient(60% 60% at 50% 0%, rgba(224,36,192,0.22) 0%, rgba(98,71,255,0.16) 40%, rgba(5,6,10,0) 70%)",
        "athenix-line":
          "linear-gradient(90deg, #4b2fe0 0%, #e024c0 55%, #ffb020 100%)",
        "athenix-line-animated":
          "linear-gradient(110deg, #4b2fe0 0%, #e024c0 35%, #ffb020 65%, #4b2fe0 100%)",
        grain: "url('/images/noise.svg')",
      },
      boxShadow: {
        glow: "0 0 40px rgba(224,36,192,0.28)",
        glowAmber: "0 0 40px rgba(255,176,32,0.25)",
        card: "0 8px 30px rgba(0,0,0,0.35)",
      },
      animation: {
        pulseSlow: "pulseSlow 3s ease-in-out infinite",
        floatY: "floatY 6s ease-in-out infinite",
        gradientShift: "gradientShift 6s ease infinite",
        marquee: "marquee 28s linear infinite",
        fadeInUp: "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        countUp: "fadeIn 0.4s ease forwards",
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
      },
      backgroundSize: {
        "gradient-lg": "200% 200%",
      },
    },
  },
  plugins: [],
};

export default config;
