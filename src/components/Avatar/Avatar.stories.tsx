import classNames from "classnames";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Title,
  Primary,
  ArgsTable,
  Description,
  PRIMARY_STORY,
} from "@storybook/addon-docs";

import { ReactComponent as UserIcon } from "icons/user.svg";

import {
  AvatarChildrenProps,
  AvatarProps,
  ContainerProps,
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
    Container: ({
      children,
      src,
      shape,
      size = "md",
      className,
    }: ContainerProps) => {
      const sizesVariants = {
        xxs: "h-5 w-5 p-1.5 text-xxs",
        xs: "h-6 w-6 p-1.5 text-xxs",
        sm: "h-8 w-8 p-2 text-xs",
        md: "h-10 w-10 p-2.5 text-base",
        lg: "h-12 w-12 p-3 text-lg",
        xl: "h-14 w-14 p-3.5 text-lg",
        xxl: "h-16 w-16 p-4 text-lg",
      };

      return (
        <div
          className={classNames(
            "flex items-center justify-center overflow-hidden bg-neutral-100 text-neutral-500",
            sizesVariants[size],
            src && "p-0",
            {
              "rounded-full": shape === "circle",
              "rounded-lg": shape === "square",
            },
            className
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
      if (contentType !== "icon") return null;
      return (
        <>
          <UserIcon
            height="100%"
            width="100%"
            strokeWidth={size === "xxs" ? 2 : 1.4}
          />
        </>
      );
    },
    Image: ({ src, alt = "avatar" }: ImageProps) => (
      <img src={src} alt={alt} className="w-full" />
    ),
  };

  return (
    <Avatar.Container size={size} src={src} {...props}>
      {src ? (
        <Avatar.Image src={src} {...props} />
      ) : (
        <>
          {text && <Avatar.Text {...props}>{initials}</Avatar.Text>}
          <Avatar.Icon {...props} size={size} />
        </>
      )}
    </Avatar.Container>
  );
};

export default {
  title: "Atoms/Avatar",
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
      control: {
        type: "select",
        labels: {
          "images/red.png": "red",
          "images/peach.png": "peach",
          "images/yellow.png": "yellow",
          "images/blue.png": "blue",
          "images/pink.png": "pink",
        },
      },
      options: [
        undefined,
        "images/red.png",
        "images/peach.png",
        "images/yellow.png",
        "images/blue.png",
        "images/pink.png",
      ],
    },
    contentType: {
      control: "select",
      description: "icon | text",
      options: ["icon", "text"],
    },
    alt: { description: "string" },
  },
  args: {
    text: "Anna Kapusta",
    shape: "square",
    size: "md",
    contentType: "text",
    src: undefined,
    alt: "avatar alt",
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
