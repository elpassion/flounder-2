import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ButtonGroupProps } from "./ButtonGroup.interface";
import { ReactComponent as SlashIcon } from "icons/slash.svg";
import { Button } from "../Button/Button.stories";
import classNames from "classnames";
import { IconButton } from "../IconButton/IconButton.stories";
import { buttonBorderVariants } from "./ButtonGroup.styles";

export const ButtonGroupWithSideDecorator: ComponentStory<
  React.FC<ButtonGroupProps>
> = ({ buttons, size, variant, style }) => {
  return (
    <div className={"inline-flex gap-x-4"}>
      {buttons.map((button, index) => (
        <div className={"flex"}>
          <Button
            key={index}
            size={size}
            variant={variant}
            className={classNames(
              "-mx-px rounded-r-none",
              buttonBorderVariants[variant]
            )}
            {...button}
          />
          {style === "withIcon" ? (
            <IconButton
              size={size}
              variant={variant}
              icon={SlashIcon}
              className={classNames(
                "-ml-px rounded-l-none",
                buttonBorderVariants[variant]
              )}
            />
          ) : (
            <Button
              size={size}
              variant={variant}
              text={"Text"}
              className={classNames(
                "-ml-px rounded-l-none",
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
        leftIcon: SlashIcon,
      },
      {
        text: "Button 1",
        leftIcon: SlashIcon,
      },
    ],
  },
} as ComponentMeta<React.FC<ButtonGroupProps>>;
