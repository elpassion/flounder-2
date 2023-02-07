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

interface UserInterface {
  name: string;
  src: string;
}

interface AvatarGroupProps
  extends Pick<AvatarProps, "size" | "shape" | "contentType"> {
  avatars: UserInterface[];
  visibleAvatars?: number;
}

export const AvatarGroup: ComponentStory<React.FC<AvatarGroupProps>> = ({
  avatars,
  visibleAvatars = 3,
  size,
  shape,
  contentType,
}) => {
  const visibleAvatarsArray = avatars.slice(0, visibleAvatars);

  return (
    <div className="flex -space-x-3">
      {visibleAvatarsArray.map((avatar) => (
        <Avatar
          {...avatar}
          size={size}
          shape={shape}
          contentType={contentType}
        />
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
        src: "images/red.png",
      },
      {
        text: "Bartek Kapusta",
        src: "images/yellow.png",
      },
      {
        text: "Cezary Kapusta",
        src: "images/blue.png",
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
} as unknown as ComponentMeta<React.FC<AvatarGroupProps>>;
