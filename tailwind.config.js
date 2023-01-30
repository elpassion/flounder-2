/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#DBFDE1",
          100: "#A8EDB3",
          200: "#7EE08D",
          300: "#55D269",
          400: "#2FC647",
          500: "#00B71D",
          600: "#02A51B",
          700: "#039119",
          800: "#047D17",
          900: "#046914",
        },
        secondary: {
          50: "#F2EAFC",
          100: "#CEAFF3",
          200: "#8A25FF",
          300: "#7E2BDE",
          400: "#6604D8",
          500: "#4E03A5",
          600: "#470396",
          700: "#3E0085",
          800: "#360075",
          900: "#2F0066",
        },
        neutral: {
          50: "#F4F6F8",
          100: "#DAE2EB",
          200: "#B5C1C9",
          300: "#7B8A95",
          400: "#52616B",
          500: "#424E57",
          600: "#343D44",
          700: "#272D33",
          800: "#181C20",
          900: "#0B0C0F",
        },
        error: {
          50: "#FEF3F2",
          100: "#FEE4E2",
          200: "#FECDCA",
          300: "#FDA29B",
          400: "#F97066",
          500: "#F04438",
          600: "#D92D20",
          700: "#B42318",
          800: "#912018",
          900: "#7A271A"
        },
      },
      boxShadow: {
        button:
          "0px 4px 4px rgba(82, 97, 107, 0.1), 0px 8px 16px rgba(0, 12, 48, 0.12)",
      },
      fontSize: {
        xxs: "10px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};