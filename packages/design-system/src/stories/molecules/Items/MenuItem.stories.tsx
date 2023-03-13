import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  ArgsTable,
  Primary,
  PRIMARY_STORY,
  Title,
} from "@storybook/addon-docs";
import { storybookIconControl } from "../../utils";
import { MenuItem as MenuItemComponent } from "../../../components/Items/MenuItem";
import type { MenuItemProps } from "../../../components/Items/Items.interface";

export const MenuItem: ComponentStory<React.FC<MenuItemProps>> = ({
  ...props
}) => (
  <div className="w-56">
    <MenuItemComponent {...props} />
  </div>
);

export default {
  title: "🟠 Molecules/Items/MenuItem",
  component: MenuItem,
  argTypes: {
    text: { description: "string" },
    variant: {
      control: "select",
      options: ["onlyIcon", "fullWidth", "fitWidth"],
      description: "onlyIcon | fullWidth | fitWidth",
    },
    leftIcon: storybookIconControl,
    middleIcon: storybookIconControl,
    rightIcon: storybookIconControl,
  },
  args: {
    text: "Menu Item",
    variant: "fullWidth",
    middleIcon: "homeIcon",
    leftIcon: "chevronRightIcon",
    rightIcon: "chevronDownIcon",
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
