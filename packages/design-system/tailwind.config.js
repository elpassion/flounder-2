/** @type {import('tailwindcss').Config} */
const tailwindConfigHelper = require("./src/tokens/helpers");
const colorPallet = tailwindConfigHelper.getColorPallet();
const componentsPallet = tailwindConfigHelper.getComponentsPallet();

console.log("-------------------------------------");
console.log(componentsPallet.backgroundColor.inlineMessage);
console.log("-------------------------------------");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        icons: "icons",
      },
      colors: colorPallet,
      ...componentsPallet,
      boxShadow: {
        button:
          "0px 4px 4px rgba(82, 97, 107, 0.1), 0px 8px 16px rgba(0, 12, 48, 0.12)",
        tooltip:
          "0px 2px 12px -1px rgba(27, 36, 44, 0.1), 0px 2px 2px -1px rgba(27, 36, 44, 0.08)",
        tooltipTop:
          "-2px 0 2px -2px rgba(27, 36, 44, 0.08), 0 2px 2px -2px rgba(27, 36, 44, 0.08)",
        tooltipRight:
          "-2px 0 2px -2px rgba(27, 36, 44, 0.08), 0 -2px 2px -2px rgba(27, 36, 44, 0.08)",
        tooltipBottom:
          "2px 0 2px -2px rgba(27, 36, 44, 0.08), 0 -2px 2px -2px rgba(27, 36, 44, 0.08)",
        tooltipLeft:
          "2px 0 2px -2px rgba(27, 36, 44, 0.08), 0 2px 2px -2px rgba(27, 36, 44, 0.08)",
        focused: "0px 0px 0px 4px",
      },
      fontSize: {
        xxs: "10px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
