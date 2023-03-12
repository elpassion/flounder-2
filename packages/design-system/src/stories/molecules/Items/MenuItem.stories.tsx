import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  ArgsTable,
  Primary,
  PRIMARY_STORY,
  Title,
} from "@storybook/addon-docs";
import { MenuItem as MenuItemComponent } from "../../../components/Items/MenuItem";
import type { MenuItemProps } from "../../../components/Items/Items.interface";

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
          "&#xeabb": "chevron right",
        },
      },
      if: { arg: "variant", eq: "fullWidth" },
      options: [undefined, "&#xeabb"],
      description: "icon",
    },
    middleIcon: {
      control: {
        type: "select",
        labels: {
          "&#xea63": "house",
        },
      },
      options: [undefined, "&#xea63"],
      description: "icon",
    },
    rightIcon: {
      control: {
        type: "select",
        labels: {
          "&#xeac0": "chevron down",
        },
      },
      if: { arg: "variant", eq: "fullWidth" },
      options: [undefined, "&#xeac0"],
      description: "icon",
    },
  },
  args: {
    text: "Menu Item",
    variant: "fullWidth",
    middleIcon: "&#xea63",
    leftIcon: "&#xeabb",
    rightIcon: "&#xeac0",
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
