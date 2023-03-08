import { ComponentStory } from "@storybook/react";
import { FeaturedText as FeaturedTextComponent } from "components/FeaturedText";
import { FeaturedTextProps } from "components/FeaturedText/FeaturedText.interface";

export const FeaturedText: ComponentStory<React.FC<FeaturedTextProps>> = ({
  ...props
}) => <FeaturedTextComponent {...props} />;

export default {
  title: "🟠 Molecules/FeaturedText",
  component: FeaturedText,
  argTypes: {
    title: {
      description: "string",
    },
    content: {
      description: "string",
    },
    linkedText: {
      description: "string",
    },
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
    },
    variant: {
      type: "select",
      options: ["text", "iconTop", "iconLeft"],
    },
    align: {
      type: "select",
      options: ["left", "center"],
    },
    imageSrc: {
      description: "image src",
      control: {
        type: "select",
        labels: {
          "images/red.png": "red",
          "images/peach.png": "peach",
          "images/yellow.png": "yellow",
          "images/blue.png": "blue",
          "images/pink.png": "pink",
          "images/rectangle.png": "rectangle",
        },
      },
      options: [
        undefined,
        "images/red.png",
        "images/peach.png",
        "images/yellow.png",
        "images/blue.png",
        "images/pink.png",
        "images/rectangle.png",
      ],
    },
    icon: {
      description: "icon",
      control: {
        type: "select",
        labels: {
          "&#xea87": "document",
          "&#xea01": "wifi",
          "&#xea11": "box",
          "&#xeb1d": "phone",
        },
      },
      options: [undefined, "&#xea87", "&#xea01", "&#xea11", "&#xeb1d"],
    },
  },
  args: {
    title: "Featured component title",
    content:
      "Your community is there for your and they want to help you grow but even though they want to.",
    linkedText: "Learn more",
    size: "sm",
    align: "left",
    variant: "iconTop",
    linkedUrl: "https://google.com",
    imageSrc: "images/rectangle.png",
    icon: "&#xeb1d",
  },
};
