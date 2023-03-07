import { ComponentStory } from "@storybook/react";
import { Pagination as PaginationComponent } from "components/Pagination";
import type { PaginationProps } from "components/Pagination/Pagination.interface";


export const Pagination: ComponentStory<React.FC<PaginationProps>> = ({
  ...props
}) => <PaginationComponent {...props} />;

export default {
  title: "🟠 Atoms/Pagination",
  component: Pagination,
  argTypes: {
    currentPage: {
      control: {
        type: "range",
        min: 1,
        max: 15,
      },
    },
    totalPages: {
      control: {
        type: "range",
        min: 3,
        max: 15,
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
        options: ["default", "outlined", "ghost"],
      },
    },
    prevTitle: {
      control: {
        type: "text",
      },
    },
    nextTitle: {
      control: {
        type: "text",
      },
    },
    onPage: {
      action: "onPage",
    },
  },
  args: {
    currentPage: 1,
    totalPages: 15,
    size: "md",
    variant: "outlined",
    prevTitle: "Previous",
    nextTitle: "Next",
    onPage: (page: number) => console.log(`Page ${page} clicked`),
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=3659%3A27910&t=xeShDa0Quzxp0Fij-0",
    },
  },
};
