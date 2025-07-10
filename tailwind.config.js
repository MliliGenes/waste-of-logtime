/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary : "#6366F1"
      },
      fontFamily: {
        poppins : ["Poppins", "sans-serif"],
        roboto : ["Roboto", "sans-serif"],
      }
    },
  },
  plugins: [],
}