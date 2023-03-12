import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Chips as ChipsComponent } from "../../components/Chips";
import type { ChipsProps } from "../../components/Chips/Chips.interface";
import Icon from "../../components/Icon";
import { getImageUrl } from "../utils";

const bellIcon = (
  <Icon className="h-4 w-4 text-center text-sm" icon="&#xeaeb" />
);
const badgeIcon = (
  <Icon className="h-4 w-4 text-center text-sm" icon="&#xeb00" />
);
const plusIcon = (
  <Icon className="h-4 w-4 text-center text-sm" icon="&#xeabc" />
);
const avatarPeach = (
  <img
    src={getImageUrl("/peach.png")}
    alt="Avatar"
    className="aspect-square w-4 rounded-full"
  />
);

const icons = { bellIcon, badgeIcon, plusIcon, avatarPeach };

export const Chips: ComponentStory<React.FC<ChipsProps>> = ({ ...props }) => (
  <ChipsComponent {...props} />
);

export default {
  title: "🟢 Atoms/Chips",
  component: Chips,
  argTypes: {
    text: {
      description: "Enabled",
    },
    suffixIcon: {
      options: [undefined, ...Object.keys(icons)],
      mapping: icons,
      control: {
        type: "select",
        labels: {
          undefined: "none",
          bellIcon: "bell icon",
          badgeIcon: "badge icon",
          plusIcon: "plus icon",
          avatarPeach: "avatar",
        },
      },
      type: { name: "string" },
      description: "icon",
    },
    prefixIcon: {
      options: [undefined, ...Object.keys(icons)],
      mapping: icons,
      control: {
        type: "select",
        labels: {
          undefined: "none",
          bellIcon: "bell icon",
          badgeIcon: "badge icon",
          plusIcon: "plus icon",
          avatarPeach: "avatar",
        },
      },
      type: { name: "string" },
      description: "icon",
    },
  },
  args: {
    text: "Enabled",
    suffixIcon: undefined,
    prefixIcon: undefined,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2225%3A6724&t=MVA9T40duNaxfbWE-0",
    },
  },
} as ComponentMeta<React.FC<ChipsProps>>;
