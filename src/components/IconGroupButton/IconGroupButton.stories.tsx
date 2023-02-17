import { ComponentStory } from "@storybook/react";
import { IconButton, IconButtonProps } from "../IconButton/IconButton.stories";
import classNames from "classnames";
import {
  buttonBorderVariants,
  buttonRadiusVariants,
} from "../ButtonGroup/ButtonGroup.styles";

interface IconGroupButtonProps
  extends Pick<IconButtonProps, "size" | "variant"> {
  buttons: Omit<IconButtonProps, "size" | "variant">[];
}

export const IconGroupButton: ComponentStory<
  React.FC<IconGroupButtonProps>
> = ({ buttons, size, variant }) => {
  return (
    <div className={"inline-flex"}>
      {buttons.map((button, index) => (
        <IconButton
          variant={variant}
          key={index}
          size={size}
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
        icon: "&#xea8a",
      },
      {
        icon: "&#xea8a",
      },
      {
        icon: "&#xea8a",
      },
      {
        icon: "&#xea8a",
      },
    ],
  },
};
