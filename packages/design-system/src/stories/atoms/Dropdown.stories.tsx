import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Dropdown as DropdownComponent } from "../../components/Dropdown";
import {
  DropdownProps,
  IDropdownOption,
} from "../../components/Dropdown/Dropdown.interface";
import Icon from "../../components/Icon";

const avatarExample = (
  <img
    src="/peach.png"
    alt="test avatar"
    className="aspect-square w-8 rounded-full"
  />
);

const dropdownOptions: IDropdownOption[] = [
  {
    value: "account",
    label: "Account",
    leftIcon: avatarExample,
    supportingText: "caption",
  },
  {
    value: "settings",
    label: "Settings",
    leftIcon: <Icon icon="&#xeb14" size="sm" />,
  },
  {
    value: "notifications",
    label: "Notifications",
    leftIcon: <Icon icon="&#xeaeb" size="sm" />,
    rightIcon: <Icon icon="&#xeab0" size="sm" />,
    supportingText: "Some supporting text",
  },
  {
    value: "label",
    label: "Label",
    leftIcon: <Icon icon="&#xea6e" size="sm" />,
    rightIcon: <Icon icon="&#xeab0" size="sm" />,
  },
];

export const Dropdown: ComponentStory<React.FC<DropdownProps>> = ({
  ...props
}) => <DropdownComponent {...props} />;

export default {
  title: "🟠 Atoms/Dropdown",
  component: Dropdown,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "person",
        "toggle",
        "checkbox-right",
        "checkbox-left",
      ],
    },
    skipMenuGap: {
      control: "boolean",
      options: [true, false],
    },
    isMulti: {
      control: "boolean",
      options: [true, false],
    },
    hideSelectedOptions: {
      control: "boolean",
      options: [false, true],
    },
  },
  args: {
    options: dropdownOptions,
    skipMenuGap: true,
    isMulti: false,
    hideSelectedOptions: false,
    variant: "default",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=3896-35630&t=vFFRfuiqghtwJbMo-0",
    },
  },
} as ComponentMeta<React.FC<DropdownProps>>;
