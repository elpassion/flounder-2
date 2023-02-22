import { addons } from "@storybook/addons";

addons.setConfig({
  sidebar: {
    renderLabel: ({ name, type }) => {
      if (type === "root") {
        return `📚 ${name}`;
      }

      return name;
    },
  },
});
