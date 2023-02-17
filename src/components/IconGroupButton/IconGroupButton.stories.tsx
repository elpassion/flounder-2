import { ComponentStory } from "@storybook/react";
import { IconButton, IconButtonProps } from "../IconButton/IconButton.stories";
import { ReactComponent as SlashIcon } from "icons/slash.svg";
import classNames from "classnames";

interface IconGroupButtonProps
  extends Pick<IconButtonProps, "size" | "variant"> {
  buttons: Omit<IconButtonProps, "size" | "variant">[];
}

export const IconGroupButton: ComponentStory<
  React.FC<IconGroupButtonProps>
> = ({ buttons, size, variant }) => {
  const lastIndex = buttons.length - 1;

  const buttonRadiusVariants = {
    0: "rounded-r-none mr-0.5",
    [lastIndex]: "rounded-l-none",
  };

  const buttonBorderVariants = {
    primary: "border-primary-100",
    outlined: "",
    ghost: "",
    destructive: "border-error-100",
    destructiveOutlined: "",
    destructiveGhost: "",
  };

  return (
    <div className={"inline-flex"}>
      {buttons.map((button, index) => (
        <IconButton
          variant={variant}
          key={index}
          size={size}
          className={classNames(
            "-mx-1",
            buttonRadiusVariants[index] || "rounded-none",
            buttonBorderVariants[variant]
          )}
          {...button}
        />
      ))}
    </div>
  );
};

export default {
  title: "Molecules/IconGroupButton",
  component: IconGroupButton,
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
    size: "md",
    variant: "primary",
    buttons: [
      {
        icon: SlashIcon,
      },
      {
        icon: SlashIcon,
      },
    ],
  },
};
