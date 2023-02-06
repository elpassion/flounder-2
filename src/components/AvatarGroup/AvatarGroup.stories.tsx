import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import {
  ArgsTable,
  Primary,
  PRIMARY_STORY,
  Title,
} from "@storybook/addon-docs";
import { AvatarProps } from "../Avatar/Avatar.interface";
import { Avatar } from "../Avatar/Avatar.stories";

interface AvatarGroupProps extends Pick<AvatarProps, "size" | "shape"> {
  avatars: AvatarProps[];
  visibleAvatars?: number;
}

export const AvatarGroup: ComponentStory<React.FC<AvatarGroupProps>> = (
  props
) => {
  const { avatars, visibleAvatars = 3, size, shape } = props;
  const visibleAvatarsArray = avatars.slice(0, visibleAvatars);

  const AvatarGroup = {
    BaseAvatarGroup: () => {
      if (avatars.length === 0) {
        return null;
      }

      return (
        <div className="flex -space-x-3">
          {visibleAvatarsArray.map((avatar) => (
            <Avatar {...avatar} size={size} shape={shape} />
          ))}

          {avatars.length > visibleAvatars && (
            <Avatar
              text={`+${avatars.length - visibleAvatars}`}
              shape={shape}
              size={size}
              contentType={"text"}
              src={""}
            />
          )}
        </div>
      );
    },
  };

  return <AvatarGroup.BaseAvatarGroup />;
};

export default {
  title: "Molecules/AvatarGroup",
  component: AvatarGroup,
  argTypes: {
    visibleAvatars: {
      control: "select",
      description: "number of visible avatars",
      options: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    size: {
      control: "select",
      description: "size of avatar",
      options: ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"],
    },
    shape: {
      control: "select",
      description: "shape of avatar",
      options: ["circle", "square"],
    },
  },
  args: {
    visibleAvatars: 3,
    size: "md",
    shape: "circle",
    avatars: [
      {
        text: "Anna Kapusta",
        contentType: "text",
        src: "blue",
        shape: "circle",
      },
      {
        text: "Bartek Kapusta",
        contentType: "text",
        src: "red",
        shape: "circle",
      },
      {
        text: "Cezary Kapusta",
        contentType: "text",
        src: "yellow",
        shape: "circle",
      },
      {
        text: "Dawid Kapusta",
        contentType: "text",
        src: "pink",
        shape: "circle",
      },
      {
        text: "Anna Kapusta",
        contentType: "text",
        src: "peach",
        shape: "circle",
      },
      {
        text: "Cezary Kapusta",
        contentType: "text",
        src: "red",
        shape: "circle",
      },
      {
        text: "Dawid Kapusta",
        contentType: "text",
        src: "yellow",
        shape: "circle",
      },
      {
        text: "Anna Kapusta",
        contentType: "text",
        src: "blue",
        shape: "circle",
      },
    ],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2491%3A11885&t=3SwYgdehYmYCK1cv-0",
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
        </>
      ),
    },
  },
} as ComponentMeta<React.FC<AvatarGroupProps>>;
