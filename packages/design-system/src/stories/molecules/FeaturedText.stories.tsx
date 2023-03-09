import { ComponentStory } from "@storybook/react";
import React from "react";
import { FeaturedText as FeaturedTextComponent } from "../../components/FeaturedText";
import { FeaturedTextProps } from "../../components/FeaturedText/Featuredtext.interface";

export const FeaturedText: ComponentStory<React.FC<FeaturedTextProps>> = ({
  ...props
}) => <FeaturedTextComponent {...props} />;

const StoryIcon: React.FC<{ src: string }> = ({ src }) => (
  <img
    src={src}
    alt="story icon"
    className="flex aspect-square w-full items-center rounded-md bg-center object-cover"
  />
);

const rectangle = <StoryIcon src="/rectangle.png" />;
const peach = <StoryIcon src="/peach.png" />;
const pink = <StoryIcon src="/pink.png" />;
const phoneIcon = (
  <div className="flex aspect-square w-full flex-shrink-0 items-center justify-center rounded-md bg-neutral-50">
    <span
      className="font-icons"
      dangerouslySetInnerHTML={{ __html: `&#xeb1d` }}
    />
  </div>
);

const icons = { rectangle, phoneIcon, peach, pink };

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
    icon: {
      description: "icon",
      control: {
        type: "select",
        labels: {
          undefined: "none",
          phoneIcon: "phone icon",
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
    size: "sm",
    align: "left",
    variant: "iconTop",
    linkedUrl: "https://google.com",
    icon: <StoryIcon src="/rectangle.png" />,
  },
};
