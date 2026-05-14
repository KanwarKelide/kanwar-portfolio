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
        bg: "#050508",
        surface: "rgba(255,255,255,0.04)",
        indigo: {
          accent: "#6366f1",
        },
        cyan: {
          accent: "#06b6d4",
        },
        text: {
          primary: "#f8fafc",
          secondary: "#64748b",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-accent":
          "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
