/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  plugins: [
    require("daisyui"),
    require("preline/plugin"),
    require("@tailwindcss/typography"),
    require("tw-elements/dist/plugin.cjs"),
  ],
  darkMode: "media",
};
