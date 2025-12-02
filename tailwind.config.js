/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        // keep Inter as default sans
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
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
  plugins: [
    /**
     * Use `any` here to avoid TS complaints about Tailwind's internal plugin API types.
     * @param {any} api
     */
    function (api) {
      const { addBase, theme } = api;
      addBase({
        "html, body": {
          fontFamily: theme("fontFamily.sans").join(", "),
          color: theme("colors.gray.900"), // default text color (dark)
          backgroundColor: theme("colors.sand.50"), // keep your light sand bg
          "-webkit-font-smoothing": "antialiased",
          "-moz-osx-font-smoothing": "grayscale",
        },
        // ensure anchor tags inherit text color unless styled
        a: {
          color: "inherit",
        },
      });
    },
  ],
};
