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
        forest: {
          deepest: "#050f08",
          deep: "#071510",
          card: "#0a1f12",
          border: "#1a3020",
        },
        amber: {
          DEFAULT: "#e8821a",
          gold: "#c9891a",
        },
        ink: {
          primary: "#f5f0e8",
          secondary: "#8a9e8d",
          dim: "#4a5e4d",
        },
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
