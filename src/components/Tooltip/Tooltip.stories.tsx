import classNames from "classnames";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Title,
  Primary,
  ArgsTable,
  Description,
  PRIMARY_STORY,
} from "@storybook/addon-docs";

const docs: string = `# Usage <br/> 
| DO  | DON’T |
| ----------- | ----------- |
|consistently provide tooltips for unlabeled icons | Don't provide tooltips for only a subset of icons within a set |
avoid using tooltips when actions are clearly defined | Don't provide redundant information with a tooltip |`;

export interface TooltipProps {
  text: string;
  position?: "top" | "right" | "bottom" | "left";
  supportingText?: string;
  variant?: "white" | "dark";
  className?: string;
}

export const Tooltip: ComponentStory<React.FC<TooltipProps>> = ({
  text,
  supportingText,
  position = "top",
  variant = "white",
  className,
}) => {
  const positionVariants = {
    top: "before:-top-2 before:right-1/2 before:translate-x-1/2 before:shadow-tooltipTop",
    right:
      "before:-right-2 before:bottom-1/2 before:translate-y-1/2 before:shadow-tooltipRight",
    bottom:
      "before:-bottom-[7px] before:right-1/2 before:translate-x-1/2 before:shadow-tooltipBottom",
    left: "before:-left-[7px] before:bottom-1/2 before:translate-y-1/2 before:shadow-tooltipLeft",
  };

  const colorVariants = {
    white:
      "border-neutral-50 bg-white text-neutral-900 before:border-neutral-50 before:bg-white",
    dark: "border-neutral-50 bg-neutral-600 text-white before:border-neutral-50 before:bg-neutral-600",
  };

  const supportingTextColorVariants = {
    white: "text-neutral-600",
    dark: "text-neutral-100",
  };

  return (
    <div
      role="tooltip"
      className={classNames(
        "relative flex w-fit max-w-xs flex-col gap-1.5 rounded border py-2 px-3 text-xs shadow-tooltip",
        "before:content'' before:absolute before:h-4 before:w-4 before:rotate-[135deg] before:rounded-[1px]",
        positionVariants[position],
        colorVariants[variant],
        className
      )}
    >
      <p className="font-medium">{text}</p>
      {supportingText && (
        <p
          className={classNames(
            "min-w-[192px]",
            supportingTextColorVariants[variant]
          )}
        >
          {supportingText}
        </p>
      )}
    </div>
  );
};

export default {
  title: "Atoms/Tooltip",
  component: Tooltip,
  argTypes: {
    text: {
      description: "string",
    },
    supportingText: {
      description: "string",
    },
    position: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "top | right | bottom | left",
    },
    variant: {
      control: "select",
      options: ["white", "dark"],
      description: "white | dark",
    },
  },
  args: {
    text: "Tooltip text",
    supportingText: "Supporting text for user",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2972%3A14840&t=rVpypypag1eT8SHD-0",
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Description markdown={docs} />
        </>
      ),
    },
  },
} as ComponentMeta<React.FC<TooltipProps>>;
