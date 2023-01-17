/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent": {
          50: "#DBFDE1",
          500: "#00B71D"
        },
        "neutral": {
          50: "#F4F6F8",
          100: "#DAE2EB",
          200: "#B5C1C9",
          300: "#7B8A95",
          400: "#52616B",
          500: "#424E57",
          600: "#343D44"
        },
        "error": {
          50: "#FEF3F2",
          500: "#F04438"
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
