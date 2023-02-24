import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import {
  ArgsTable,
  Primary,
  PRIMARY_STORY,
  Title,
} from "@storybook/addon-docs";
import { AvatarProps } from "components/Avatar/Avatar.interface";
import { AvatarGroup as AvatarGroupComponent } from "components/AvatarGroup";

interface UserInterface {
  name: string;
  src: string;
  alt?: string;
}

interface AvatarGroupProps
  extends Pick<AvatarProps, "size" | "shape" | "contentType"> {
  avatars: UserInterface[];
  visibleAvatars?: number;
  className?: string;
}

export const AvatarGroup: ComponentStory<React.FC<AvatarGroupProps>> = ({
  ...props
}) => <AvatarGroupComponent {...props} />;

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
    contentType: {
      control: "select",
      description: "icon | text",
      options: ["icon", "text"],
    },
  },
  args: {
    visibleAvatars: 3,
    size: "md",
    shape: "circle",
    contentType: "text",
    avatars: [
      {
        name: "Anna Kapusta",
        src: "images/red.png",
      },
      {
        name: "Bartek Kapusta",
        src: "images/yellow.png",
      },
      {
        name: "Cezary Kapusta",
        src: "images/blue.png",
      },
      {
        name: "Daria Kapusta",
        src: "images/red.png",
      },
      {
        name: "Ewa Kapusta",
        src: "images/yellow.png",
      },
      {
        name: "Fryderyk Kapusta",
        src: "images/blue.png",
      },
      {
        name: "Grażyna Kapusta",
        src: "images/red.png",
      },
      {
        name: "Hanna Kapusta",
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
