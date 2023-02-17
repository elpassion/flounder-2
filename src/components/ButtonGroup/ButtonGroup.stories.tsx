import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "../Button/Button.stories";
import { ReactComponent as SlashIcon } from "icons/slash.svg";
import classNames from "classnames";
import { ButtonGroupProps } from "./ButtonGroup.interface";

export const ButtonGroup: ComponentStory<React.FC<ButtonGroupProps>> = ({
  buttons,
  size,
  variant,
}) => {
  const lastIndex = buttons.length - 1;

  const buttonRadiusVariants = {
    0: "rounded-r-none",
    [lastIndex]: "rounded-l-none",
  };

  const buttonBorderVariants = {
    primary: "border-primary-100",
    outlined: "",
    ghost: "",
    destructive: "border-error-100",
    destructiveGhost: "",
    destructiveOutlined: "",
  };

  return (
    <div className={"inline-flex"}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          size={size}
          variant={variant}
          className={classNames(
            "-mx-1",
            buttonRadiusVariants[index] || "ml-0.5 rounded-none",
            buttonBorderVariants[variant]
          )}
          {...button}
        />
      ))}
    </div>
  );
};

export default {
  title: "Molecules/ButtonGroup",
  component: ButtonGroup,
  argTypes: {
    buttons: {
      control: {
        type: "object",
        required: true,
      },
    },
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
    },
    variant: {
      control: {
        type: "select",
        options: [
          "primary",
          "outlined",
          "ghost",
          "destructive",
          "destructiveGhost",
          "destructiveOutlined",
        ],
      },
    },
  },
  args: {
    style: "default",
    size: "md",
    variant: "primary",
    buttons: [
      {
        text: "Button 1",
        leftIcon: SlashIcon,
      },
      {
        text: "Button 2",
        leftIcon: SlashIcon,
      },
      {
        text: "Button 3",
        leftIcon: SlashIcon,
      },
    ],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2953%3A14621&t=rVpypypag1eT8SHD-0",
    },
  },
} as ComponentMeta<React.FC<ButtonGroupProps>>;
