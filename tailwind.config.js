/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          100: "#EDDAFD",
          200: "#D8B6FC",
          300: "#BE90F7",
          400: "#A673EF",
          500: "#8247E5",
          600: "#6433C4",
          700: "#4A23A4",
          800: "#331684",
          900: "#220D6D",
        },
      },
    },
  },
  plugins: [],
};
