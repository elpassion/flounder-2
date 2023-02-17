import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "../Button/Button.stories";
import classNames from "classnames";
import { ButtonGroupProps } from "./ButtonGroup.interface";
import {
  buttonBorderVariants,
  buttonRadiusVariants,
} from "./ButtonGroup.styles";

export const ButtonGroup: ComponentStory<React.FC<ButtonGroupProps>> = ({
  buttons,
  size,
  variant,
}) => {
  return (
    <div className={"inline-flex"}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          size={size}
          variant={variant}
          className={classNames(
            "hover:z-10",
            buttonRadiusVariants(buttons)[index] || "-ml-px rounded-none",
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
        leftIcon: "&#xea8a",
      },
      {
        text: "Button 2",
        leftIcon: "&#xea8a",
      },
      {
        text: "Button 3",
        leftIcon: "&#xea8a",
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
