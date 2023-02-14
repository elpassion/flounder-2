import { ComponentMeta, ComponentStory } from "@storybook/react";
import classNames from "classnames";

interface IndicatorProps {
  type?: "error" | "warning" | "processing" | "success";
  variant?: "count" | "badge";
  showText?: boolean;
  showNumber?: boolean;
}

export const Indicator: ComponentStory<React.FC<IndicatorProps>> = ({
  variant,
  type,
  showNumber = true,
  showText = true,
}) => {
  const indicatorTypes = {
    error: "bg-error-100 text-error-900",
    warning: "bg-orange-100 text-orange-900",
    processing: "bg-blue-50 text-blue-900",
    success: "bg-green-100 text-green-900",
  };

  const indicatorDotTypes = {
    error: "bg-error-500",
    warning: "bg-orange-500",
    processing: "bg-blue-500",
    success: "bg-green-500",
  };

  const countIndicatorTypes = {
    error: "bg-error-500 text-white",
    warning: "bg-orange-500 text-white",
    processing: "bg-blue-500 text-white",
    success: "bg-green-500 text-white",
  };

  if (variant === "badge") {
    return (
      <div
        className={classNames(
          "inline-flex items-center gap-x-1.5 rounded-full py-1 py-1 px-2.5 text-xs font-medium",
          type ? indicatorTypes[type] : "bg-neutral-50 text-neutral-900"
        )}
      >
        <span
          className={classNames(
            "flex h-2 w-2 shrink-0 rounded-full",
            type ? indicatorDotTypes[type] : "bg-neutral-100"
          )}
        />
        {showText && <span>Indicator text</span>}
      </div>
    );
  }

  if (variant === "count") {
    return (
      <div
        className={classNames(
          "inline-flex h-6 w-6 min-w-fit shrink-0 justify-center rounded-full border-2 border-solid border-white px-1 text-sm font-medium shadow-lg",
          type ? countIndicatorTypes[type] : "bg-neutral-100 text-neutral-900"
        )}
      >
        {showNumber && <span>1</span>}
      </div>
    );
  }

  return (
    <div className={"inline-flex items-center gap-x-1.5 text-sm font-medium"}>
      <span
        className={classNames(
          "flex h-3 w-3 shrink-0 rounded-full",
          type ? indicatorDotTypes[type] : "bg-neutral-100"
        )}
      />
      {showText && <span>Indicator text</span>}
    </div>
  );
};

export default {
  title: "Atoms/Indicator",
  component: Indicator,
  argTypes: {
    type: {
      control: "select",
      options: ["error", "warning", "processing", "success"],
    },
    variant: {
      control: "select",
      options: ["count", "badge"],
    },
    showNumber: {
      control: "boolean",
    },
    showText: {
      control: "boolean",
    },
  },
  args: {
    type: "error",
    showNumber: true,
    showText: true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2691%3A16074&t=DuE9MGHwYmaApj8X-4",
    },
  },
} as ComponentMeta<React.FC<IndicatorProps>>;
