import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Dropdown as DropdownComponent } from "../../components/Dropdown";
import { DropdownProps } from "../../components/Dropdown/Dropdown.interface";

export const Dropdown: ComponentStory<React.FC<DropdownProps>> = ({
  ...props
}) => <DropdownComponent {...props} />;

export default {
  title: "🟠 Atoms/Dropdown",
  component: Dropdown,
} as ComponentMeta<React.FC<DropdownProps>>;
