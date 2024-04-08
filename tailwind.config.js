/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
const plugin = require("tailwindcss/plugin");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        gloock: ["var(--font-gloock)"],
        noto: ["var(--font-noto)"],
      },

      fontSize: {
        "2xs": "0.625rem",
      },

      colors: {
        "highlight-pink": "#EA13F2",
        "highlight-red": "#E6213A",
        "highlight-blue": "#0052FF",

        // text colors
        "text-off-white": "#F2F2F3",
        "text-gray": "#4D4A4F",
        "text-dark": "#121212",
        "text-pink": "#FCADFF",
        "text-light-gray": "#9E9E9E",

        // background colors
        "bg-off-black": "#0F0F0F",
        "bg-off-white": "#F9F9F9",

        // shadow colors
        "shadown-purple": "#8264BE",
        "shadow-red": "#DC6062",

        // border colors
        "border-light": "#AAAAAA",
        "border-dark": "#4B5563",
      },

      backgroundImage: {
        "gradient-primary": "linear-gradient(90deg, #EA13F2 0%, #E6213A 100%)",
        "gradient-primary-light":
          "linear-gradient(90deg, #EA13F2 0%, #E6213A 100%)",
        "gradient-primary-radial":
          "radial-gradient(1067.57% 100.06% at 0% 49.75%, #EA13F2 0%, #E6213A 60.4%, #EA13F2 100%)",
        "gradient-primary-light-radial":
          "radial-gradient(1067.57% 100.06% at 0% 49.75%, #C41CCB 0%, #C4182D 60.4%, #C41CCB 100%)",

        "gradient-dark-linear":
          "linear-gradient(180deg, #1E1E1E 0%, #141414 100.4%)",
        "gradient-light-radial":
          "linear-gradient(180deg, #E9E9E9 0%, #D8D8D8 100.4%)",

        "gradient-dark-linear/85":
          "linear-gradient(180deg, rgba(30, 30, 30, 0.85) 0%, rgba(20, 20, 20, 0.85) 100.4%)",
        "gradient-light-linear/85":
          "linear-gradient(180deg, rgba(233, 233, 233, 0.85) 0%, rgba(216, 216, 216, 0.85) 100.4%)",
      },
    },
  },

  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".gradient-text": {
          "background-clip": "text",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
});
