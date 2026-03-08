/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#ffffff",
        muted: "#f5f5f5",
        accent: "#111111",
      },
      borderRadius: {
        xl: "1rem",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.12)",
      },
    },
  },
  plugins: [],
};