import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Title,
  Primary,
  ArgsTable,
  Description,
  PRIMARY_STORY,
} from "@storybook/addon-docs";

import { AvatarProps } from "components/Avatar/Avatar.interface";
import { Avatar as AvatarComponent } from "components/Avatar";

const docs: string = `# Usage <br/> 
| DO | <div style="width:20vw">DON’T</div> |
| ----------- | ----------- |
| Avatars should be one of 6 sizes: <br/> • Extra small (20 x 20 px and 24 x 24 px): use in tightly condensed layouts <br/> • Small (32 × 32 px): use when the medium size is too big for the layout, or when the avatar has less importance <br/> • Medium (40 × 40 px): use as the default size <br/> • Large (48/56/64 px): use when an avatar is a focal point, such as on a single customer card ||`;

export const Avatar: ComponentStory<React.FC<AvatarProps>> = ({ ...props }) => (
  <AvatarComponent {...props} />
);

export default {
  title: "Atoms/Avatar",
  component: Avatar,
  argTypes: {
    name: { description: "string" },
    label: { description: "string" },
    capition: { description: "string" },
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
    name: "Anna Kapusta",
    label: "Anna Kapusta",
    capition: "anna@kapusta.pl",
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
