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
        gray: {
          100: "#F8F8F8",
          200: "#E0E0E0",
          300: "#C8C8C8",
          400: "#888888",
          500: "#707070",
          600: "#505050",
          700: "#383838",
          800: "#282828",
          900: "#101010",
        },
        blue: {
          dark: '#0a3d62',
          default: '#3c6382',
          light: '#82ccdd',
        },
      },
      spacing: {
        '72': '18rem',
        '80': '20rem',
      },
      animation: {
        text: "text 5s ease infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [],
};
