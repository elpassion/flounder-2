/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#DBFDE1",
          100: "#A8EDB3",
          500: "#00B71D",
          700: "#039119",
          800: "#047D17",
        },
        neutral: {
          50: "#F4F6F8",
          100: "#DAE2EB",
          200: "#B5C1C9",
          300: "#7B8A95",
          400: "#52616B",
          500: "#424E57",
          600: "#343D44",
        },
        error: {
          50: "#FEF3F2",
          100: "#FEE4E2",
          500: "#F04438",
          700: "#B42318",
          800: "#912018",
        },
      },
      boxShadow: {
        button:
          "0px 4px 4px rgba(82, 97, 107, 0.1), 0px 8px 16px rgba(0, 12, 48, 0.12);",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
