import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import {
  ArgsTable,
  Primary,
  PRIMARY_STORY,
  Title,
} from "@storybook/addon-docs";
import { MenuItem as MenuItemComponent } from "components/Items/MenuItem";
import type { MenuItemProps } from "components/Items/Items.interface";

export const MenuItem: ComponentStory<React.FC<MenuItemProps>> = ({
  ...props
}) => <MenuItemComponent {...props} />;

export default {
  title: "🟠 Molecules/Items/MenuItem",
  component: MenuItem,
  argTypes: {
    text: { description: "string" },
    variant: {
      control: "select",
      options: ["onlyIcon", "fullWidth"],
      description: "onlyIcon | fullWidth",
    },
    leftIcon: {
      control: {
        type: "select",
        labels: {
          "&#xea68": "house",
          "&#xeac5": "chevron right",
          "&#xeacb": "chevron down",
        },
      },
      if: { arg: "variant", eq: "fullWidth" },
      options: [undefined, "&#xeac5", "&#xea68", "&#xeacb"],
      description: "icon",
    },
    middleIcon: {
      control: {
        type: "select",
        labels: {
          "&#xea68": "house",
          "&#xeac5": "chevron right",
          "&#xeacb": "chevron down",
        },
      },
      options: [undefined, "&#xeac5", "&#xea68", "&#xeacb"],
      description: "icon",
    },
    rightIcon: {
      control: {
        type: "select",
        labels: {
          "&#xea68": "house",
          "&#xeac5": "chevron right",
          "&#xeacb": "chevron down",
        },
      },
      if: { arg: "variant", eq: "fullWidth" },
      options: [undefined, "&#xeac5", "&#xea68", "&#xeacb"],
      description: "icon",
    },
  },
  args: {
    text: "Menu Item",
    variant: "fullWidth",
    middleIcon: "&#xea68",
    leftIcon: "&#xeac5",
    rightIcon: "&#xeacb",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=3543%3A19555&t=Owf9r7IfEaulTdJq-0",
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
        </>
      ),
    },
  },
} as unknown as ComponentMeta<React.FC<MenuItemProps>>;
