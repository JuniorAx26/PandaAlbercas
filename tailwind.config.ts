import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta Triana's clean
        pool: {
          50:  "#EFF9FD",
          100: "#D9F0F8",
          200: "#B1DFF1",
          300: "#7DC8E6",
          400: "#3FAAD3",
          500: "#1E8FB8", // azul agua principal
          600: "#0F6F94",
          700: "#0A5572",
          800: "#0A3F54",
          900: "#08293A",
        },
        ink: {
          DEFAULT: "#0B0D10",
          soft: "#1A1D22",
          mute: "#5C636B",
        },
        cream: "#FBFCFD",
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "pool-grad": "linear-gradient(135deg, #1E8FB8 0%, #0A5572 100%)",
        "pool-shine": "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)",
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(10, 85, 114, 0.18)",
        "card-hover": "0 16px 40px -12px rgba(10, 85, 114, 0.28)",
      },
      animation: {
        "wave": "wave 8s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "translateX(-2%)" },
          "50%":      { transform: "translateX(2%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
