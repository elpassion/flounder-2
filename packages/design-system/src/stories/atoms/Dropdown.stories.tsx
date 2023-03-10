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
    className="aspect-square w-4 rounded-full"
  />
);

const dropdownOptions: IDropdownOption[] = [
  { value: "account", label: "Account", leftIcon: avatarExample },
  {
    value: "settings",
    label: "Settings",
    leftIcon: <Icon icon="&#xeb14" />,
  },
  {
    value: "notifications",
    label: "Notifications",
    leftIcon: <Icon icon="&#xeaeb" />,
    rightIcon: <Icon icon="&#xeab0" />,
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
  argTypes: {
    skipMenuGap: {
      control: "select",
      options: [true, undefined],
    },
  },
  args: {
    options: dropdownOptions,
    skipMenuGap: true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=3896-35630&t=vFFRfuiqghtwJbMo-0",
    },
  },
} as ComponentMeta<React.FC<DropdownProps>>;
