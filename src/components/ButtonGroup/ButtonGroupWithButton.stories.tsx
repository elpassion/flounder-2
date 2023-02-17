import { ComponentStory } from "@storybook/react";
import { ButtonGroupProps } from "./ButtonGroup.interface";
import { ReactComponent as SlashIcon } from "icons/slash.svg";
import { Button } from "../Button/Button.stories";
import classNames from "classnames";
import { IconButton } from "../IconButton/IconButton.stories";

export const ButtonGroupWithButton: ComponentStory<
  React.FC<ButtonGroupProps>
> = ({ buttons, size, variant, style }) => {
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
            "-mx-1 rounded-r-none",
            buttonBorderVariants[variant]
          )}
          {...button}
        />
      ))}
      {style === "withIcon" ? (
        <IconButton
          size={size}
          variant={variant}
          icon={SlashIcon}
          className={classNames(
            "-mx-1 ml-0.5 rounded-l-none",
            buttonBorderVariants[variant]
          )}
        />
      ) : (
        <Button
          size={size}
          variant={variant}
          text={"Text"}
          className={classNames(
            "-mx-1 ml-0.5 rounded-l-none",
            buttonBorderVariants[variant]
          )}
        />
      )}
    </div>
  );
};

export default {
  title: "Molecules/ButtonGroup/ButtonGroupWithButton",
  component: ButtonGroupWithButton,
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
    ],
  },
};
