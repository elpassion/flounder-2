import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ButtonGroupProps } from "./ButtonGroup.interface";
import { Button } from "../Button/Button.stories";
import classNames from "classnames";
import { IconButton } from "../IconButton/IconButton.stories";
import { buttonBorderVariants } from "./ButtonGroup.styles";

export const ButtonGroupWithSideDecorator: ComponentStory<
  React.FC<ButtonGroupProps>
> = ({ buttons, size, variant, style }) => {
  return (
    <div className="inline-flex gap-x-4">
      {buttons.map((button, index) => (
        <div className="flex">
          <Button
            key={index}
            size={size}
            variant={variant}
            className={classNames(
              "rounded-r-none hover:z-10",
              buttonBorderVariants[variant]
            )}
            {...button}
          />
          {style === "withIcon" ? (
            <IconButton
              size={size}
              variant={variant}
              icon="&#xea8a"
              className={classNames(
                "-ml-px rounded-l-none hover:z-10",
                buttonBorderVariants[variant]
              )}
            />
          ) : (
            <Button
              size={size}
              variant={variant}
              text="Text"
              className={classNames(
                "-ml-px rounded-l-none hover:z-10",
                buttonBorderVariants[variant]
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default {
  title: "Molecules/ButtonGroup/ButtonGroupWithSideDecorator",
  component: ButtonGroupWithSideDecorator,
  argTypes: {
    buttons: {
      control: {
        type: "object",
        required: true,
      },
    },
    style: {
      control: {
        type: "select",
        options: ["withIcon", "withText"],
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
          "destructiveOutlined",
          "destructiveGhost",
        ],
      },
    },
  },
  args: {
    size: "md",
    style: "withIcon",
    variant: "primary",
    buttons: [
      {
        text: "Button 1",
        leftIcon: "&#xea8a",
      },
      {
        text: "Button 1",
        leftIcon: "&#xea8a",
      },
    ],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=3307%3A20132&t=ZdZnKV3DB1YUpHBE-0",
    },
  },
} as ComponentMeta<React.FC<ButtonGroupProps>>;
