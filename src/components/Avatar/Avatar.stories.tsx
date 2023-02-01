import classNames from "classnames";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Title,
  Primary,
  ArgsTable,
  Description,
  PRIMARY_STORY,
} from "@storybook/addon-docs";

import * as Icons from "icons/User";

import {
  AvatarChildrenProps,
  AvatarProps,
  BaseAvatarProps,
  IconProps,
  ImageProps,
} from "./Avatar.interface";
import React from "react";

const docs: string = `# Usage <br/> 
| DO | <div style="width:20vw">DON’T</div> |
| ----------- | ----------- |
| Avatars should be one of 6 sizes: <br/> • Extra small (20 x 20 px and 24 x 24 px): use in tightly condensed layouts <br/> • Small (32 × 32 px): use when the medium size is too big for the layout, or when the avatar has less importance <br/> • Medium (40 × 40 px): use as the default size <br/> • Large (48/56/64 px): use when an avatar is a focal point, such as on a single customer card ||`;

export const Avatar: ComponentStory<React.FC<AvatarProps>> = ({
  text,
  size = "md",
  src,
  ...props
}) => {
  const initials = text?.slice(0, 2).toUpperCase();

  const Avatar = {
    BaseAvatar: ({ children, shape, size = "md" }: BaseAvatarProps) => {
      const sizesVariants = {
        xxs: "h-5 w-5 text-xxs",
        xs: "h-6 w-6 text-xxs",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-base",
        lg: "h-12 w-12 text-lg",
        xl: "h-14 w-14 text-lg",
        xxl: "h-16 w-16 text-lg",
      };

      return (
        <div
          className={classNames(
            "flex items-center justify-center overflow-hidden bg-neutral-100 text-neutral-500",
            sizesVariants[size],
            {
              "rounded-full": shape === "circle",
              "rounded-lg": shape === "square",
            }
          )}
        >
          {children}
        </div>
      );
    },
    Text: ({ children, contentType }: AvatarChildrenProps) => {
      if (contentType !== "text") return null;
      return <span>{children}</span>;
    },
    Icon: ({ size = "md", contentType }: IconProps) => {
      const Icon = {
        xxs: <Icons.UserXXS />,
        xs: <Icons.UserXS />,
        sm: <Icons.UserSM />,
        md: <Icons.UserMD />,
        lg: <Icons.UserLG />,
        xl: <Icons.UserXL />,
        xxl: <Icons.UserXXL />,
      };
      if (contentType !== "icon") return null;
      return <>{Icon[size]}</>;
    },
    Image: ({ src }: ImageProps) => (
      <img src={`images/${src}.png`} alt="avatar" />
    ),
  };

  return (
    <Avatar.BaseAvatar size={size} {...props}>
      {src ? (
        <Avatar.Image src={src} {...props} />
      ) : (
        <>
          <Avatar.Text {...props}>{initials}</Avatar.Text>
          <Avatar.Icon {...props} size={size} />
        </>
      )}
    </Avatar.BaseAvatar>
  );
};

export default {
  title: "Avatar",
  component: Avatar,
  argTypes: {
    text: { description: "string" },
    shape: {
      control: "select",
      description: "circle | square",
      options: ["circle", "square"],
    },
    size: {
      control: "select",
      description: "xxs | xs | sm | md | lg | xl | xxl",
      options: ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"],
    },
    src: {
      description: "image src",
      control: "select",
      options: [undefined, "red", "peach", "yellow", "blue", "pink"],
    },
    contentType: {
      control: "select",
      description: "icon | text",
      options: ["icon", "text"],
    },
  },
  args: {
    text: "Anna Kapusta",
    shape: "square",
    size: "md",
    contentType: "text",
    src: undefined,
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
          <Description markdown={docs} />
        </>
      ),
    },
  },
} as ComponentMeta<React.FC<AvatarProps>>;
