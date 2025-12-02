/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}", // Scans your App.tsx and index.tsx in the root
    "./components/**/*.{js,ts,jsx,tsx}", // Scans your components folder
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        sand: {
          50: "#fdfbf7",
          100: "#f7f1e3",
          200: "#efe6d5",
          300: "#e3d2b6",
          800: "#4a453e",
          900: "#1c1c1c",
        },
        obsidian: {
          950: "#13111C",
          900: "#1F1D2B",
          800: "#2D2B3B",
          700: "#3E3B4F",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
