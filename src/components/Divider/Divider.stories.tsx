import { ComponentMeta, ComponentStory } from "@storybook/react";
import classNames from "classnames";

interface DividerProps {
  labelText: string;
  type: "horizontal" | "vertical";
}

export const Divider: ComponentStory<React.FC<DividerProps>> = ({
  labelText,
  type,
}) => {
  const dividerTypes = {
    horizontal:
      "before:relative  before:right-2 before:-ml-[50%] before:h-px before:w-6/12 after:relative after:left-2 after:-mr-[50%] after:h-px after:w-6/12",
    vertical:
      "relative flex h-96 items-center justify-center before:absolute before:top-0 before:h-[calc(50%-theme(space.4))] before:w-px after:absolute after:bottom-0 after:h-[calc(50%-theme(space.4))] after:w-px",
  };

  return (
    <div
      className={classNames(
        "overflow-hidden text-center text-sm text-neutral-500",
        "before:inline-block before:bg-neutral-100 before:align-middle",
        "after:inline-block after:bg-neutral-100 after:align-middle",
        dividerTypes[type]
      )}
    >
      <span>{labelText}</span>
    </div>
  );
};

export default {
  title: "Divider",
  component: Divider,
  argTypes: {
    labelText: {
      description: "string",
      type: { required: true, name: "string" },
    },
    type: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "horizontal | vertical",
    },
  },
  args: {
    labelText: "Label",
    type: "horizontal",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2691%3A16074&t=DuE9MGHwYmaApj8X-4",
    },
  },
} as ComponentMeta<React.FC<DividerProps>>;
