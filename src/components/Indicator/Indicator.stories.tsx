import { ComponentMeta, ComponentStory } from "@storybook/react";
import classNames from "classnames";
import React from "react";

interface IndicatorProps {
  type: "default" | "error" | "warning" | "processing" | "success";
  variant: "default" | "count" | "badge";
  text?: string;
  number?: number;
}

export const Indicator: ComponentStory<React.FC<IndicatorProps>> = ({
  variant,
  type,
  text,
  number,
}) => {
  const indicatorTypes = {
    default: "bg-neutral-50",
    error: "bg-error-100 text-error-900",
    warning: "bg-orange-100 text-orange-900",
    processing: "bg-blue-50 text-blue-900",
    success: "bg-green-100 text-green-900",
  };

  const indicatorDotTypes = {
    default: "bg-neutral-100 text-neutral-900",
    error: "bg-error-500 text-white",
    warning: "bg-orange-500 text-white",
    processing: "bg-blue-500 text-white",
    success: "bg-green-500 text-white",
  };

  const indicatorDotSizeTypes = {
    badge: "h-2 w-2",
    default: "h-3 w-3",
    count: "",
  };

  const indicatorWrapperTypes = {
    badge: `inline-flex items-center gap-x-1.5 rounded-full py-1 py-1 px-2.5 text-xs font-medium ${indicatorTypes[type]}`,
    count: `inline-flex h-6 w-6 min-w-fit shrink-0 justify-center rounded-full border-2 border-solid border-white px-1 text-sm font-medium shadow-lg ${indicatorDotTypes[type]}`,
    default: `inline-flex items-center gap-x-1.5 text-sm font-medium`,
  };

  const Indicator = {
    Wrapper: ({ children }: React.PropsWithChildren) => (
      <div className={indicatorWrapperTypes[variant]}>{children}</div>
    ),
    Dot: () => (
      <span
        className={classNames(
          "flex shrink-0 rounded-full",
          indicatorDotTypes[type],
          indicatorDotSizeTypes[variant]
        )}
      />
    ),
  };

  return (
    <Indicator.Wrapper>
      {variant !== "count" && <Indicator.Dot />}
      <span>{variant === "count" ? number : text}</span>
    </Indicator.Wrapper>
  );
};

export default {
  title: "Atoms/Indicator",
  component: Indicator,
  argTypes: {
    type: {
      control: "select",
      options: ["error", "warning", "processing", "success", "default"],
    },
    variant: {
      control: "select",
      options: ["default", "count", "badge"],
    },
    text: {
      control: "text",
    },
    number: {
      control: "number",
    },
  },
  args: {
    variant: "count",
    number: 1,
    text: "Indicator",
    type: "default",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2691%3A16074&t=DuE9MGHwYmaApj8X-4",
    },
  },
} as ComponentMeta<React.FC<IndicatorProps>>;
