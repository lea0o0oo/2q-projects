/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}", "node_modules/preline/dist/*.js"],
  plugins: [
    require("daisyui"),
    require("preline/plugin"),
    require("@tailwindcss/typography"),
  ],
  darkMode: "media",
};
