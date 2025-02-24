/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "300px",
        md: "500px"// Custom small screen starting from 450px
      },

    },
  },
  plugins: [],
}