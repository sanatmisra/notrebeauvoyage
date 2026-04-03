import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        terracotta: "var(--color-terracotta)",
        gold: "var(--color-gold)",
        linen: "var(--color-linen)",
        "linen-dark": "var(--color-linen-dark)",
        espresso: "var(--color-espresso)",
        sage: "var(--color-sage)",
        ivory: "var(--color-white)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "2rem",
        lg: "4rem",
        xl: "8rem",
        "2xl": "12rem",
      },
      borderColor: {
        token: "rgba(44, 36, 22, 0.15)",
      },
      transitionTimingFunction: {
        med: "ease",
        slow: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      boxShadow: {
        card: "0 24px 60px rgba(44, 36, 22, 0.08)",
      },
      backgroundImage: {
        "sun-wash":
          "radial-gradient(circle at top, rgba(212, 168, 83, 0.22), transparent 38%), linear-gradient(135deg, rgba(201, 135, 106, 0.12), rgba(139, 158, 138, 0.08))",
      },
    },
  },
  plugins: [],
};

export default config;
