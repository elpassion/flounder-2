import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Dropdown as DropdownComponent } from "../../components/Dropdown";
import {
  DropdownProps,
  IDropdownOption,
} from "../../components/Dropdown/Dropdown.interface";
import Icon from "../../components/Icon";

const dropdownOptions: IDropdownOption[] = [
  { value: "account", label: "Account", leftIcon: <Icon icon="&#xeaeb" /> },
  {
    value: "settings",
    label: "Settings",
    leftIcon: <Icon icon="&#xeb14" />,
  },
  {
    value: "label",
    label: "Label",
    leftIcon: <Icon icon="&#xea6e" />,
    rightIcon: <Icon icon="&#xeab0" />,
  },
];

export const Dropdown: ComponentStory<React.FC<DropdownProps>> = ({
  ...props
}) => <DropdownComponent {...props} />;

export default {
  title: "🟠 Atoms/Dropdown",
  component: Dropdown,
  args: {
    options: dropdownOptions,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=3896-35630&t=vFFRfuiqghtwJbMo-0",
    },
  },
} as ComponentMeta<React.FC<DropdownProps>>;
