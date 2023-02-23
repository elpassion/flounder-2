import { addons } from "@storybook/addons";
import React from "react";
import { useDarkMode } from "storybook-dark-mode";

addons.setConfig({
  sidebar: {
    renderLabel: ({ name, type }) => {
      if (type === "root") {
        const mode = useDarkMode() ? "rgb(212 212 212)" : "rgb(163 163 163)";

        return <span style={{ color: mode }}>{name}</span>;
      }

      return name;
    },
  },
});
