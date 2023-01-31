import "!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css";
import "tailwindcss/tailwind.css";
import { useDarkMode } from "storybook-dark-mode";

export const parameters = {
  actions: { argTypesRegex: "^on.*" },
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
