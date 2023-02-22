import "!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css";
import "tailwindcss/tailwind.css";
import { useDarkMode } from "storybook-dark-mode";
import { create } from "@storybook/theming";
import logo from "./logo.svg";
import logoDark from "./logo-dark.svg";

const sharedStyles = {
  brandTitle: "El Passion",
  brandUrl: "https://www.elpassion.com/",
  brandTarget: "_self",
};

export const parameters = {
  actions: { argTypesRegex: "^on.*" },
  darkMode: {
    dark: create({
      ...sharedStyles,
      base: "dark",
      brandImage: logoDark,
    }),
    light: create({
      ...sharedStyles,
      base: "light",
      brandImage: logo,
    }),
  },
};

export const decorators = [
  (Story) => {
    const mode = useDarkMode() ? "dark" : "light";

    return (
      <div className={mode}>
        <Story />
      </div>
    );
  },
];
