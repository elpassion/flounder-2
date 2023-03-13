import { ComponentStory } from "@storybook/react";
import React from "react";
import { cameraIcon, cogIcon } from "../utils";
import { FeaturedText as FeaturedTextComponent } from "../../components/FeaturedText";
import { FeaturedTextProps } from "../../components/FeaturedText/Featuredtext.interface";
import { FeaturedTextImage } from "../../utils/FeaturedTextImage";

export const FeaturedText: ComponentStory<React.FC<FeaturedTextProps>> = ({
  ...props
}) => <FeaturedTextComponent {...props} />;

const rectangle = <FeaturedTextImage src="/rectangle.png" alt="rectangle" />;
const peach = <FeaturedTextImage src="/peach.png" alt="peach" />;
const pink = <FeaturedTextImage src="/pink.png" alt="pink" />;

const icons = { rectangle, peach, pink, cameraIcon, cogIcon };

export default {
  title: "🟢 Molecules/FeaturedText",
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
        options: [undefined, "sm", "md", "lg"],
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
    icon: {
      description: "icon",
      control: {
        type: "select",
        labels: {
          undefined: "none",
          cameraIcon: "camera icon",
          cogIcon: "cog icon",
          rectangle: "aspect ratio rectangle",
          peach: "avatar 1",
          pink: "avatar 2",
        },
      },

      options: [undefined, ...Object.keys(icons)],
      mapping: icons,
    },
  },
  args: {
    title: "Featured component title",
    content:
      "Your community is there for your and they want to help you grow but even though they want to.",
    linkedText: "Learn more",
    align: "left",
    variant: "iconTop",
    linkedUrl: "https://google.com",
    icon: pink,
  },
};
