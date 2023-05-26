/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#008037",
      },
    },
  },
  variants: {
    translate: ["responsive", "hover", "focus", "group-hover"],
  },
  plugins: [],
};
