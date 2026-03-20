import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          black: "#050510",
          navy: "#0a0a1a",
          deep: "#0d0d22",
          card: "#0f0f28",
        },
        gold: {
          DEFAULT: "#c9a84c",
          light: "#e0c06a",
          dim: "#8a6e2a",
        },
        lavender: {
          DEFAULT: "#9b8ec4",
          light: "#b8aedd",
          dim: "#6b5e94",
        },
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
