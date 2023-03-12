import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Title,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from "@storybook/addon-docs";
import { storybookAvatarImageControl } from "../../utils";
import { WorkspaceItem as WorkspaceItemComponent } from "../../../components/Items/WorkspaceItem";
import type { WorkspaceItemProps } from "../../../components/Items/Items.interface";

export const WorkspaceItem: ComponentStory<React.FC<WorkspaceItemProps>> = ({
  ...props
}) => <WorkspaceItemComponent {...props} />;

export default {
  title: "🟢 Molecules/Items/WorkspaceItem",
  component: WorkspaceItem,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "sm | md | lg",
    },
    variant: {
      control: "select",
      options: ["onlyIcon", "fullWidth", "fitWidth"],
      description: "onlyIcon | fullWidth | fitWidth",
    },
    shape: {
      control: "select",
      description: "circle | square",
      options: ["circle", "square"],
    },
    src: storybookAvatarImageControl,
    contentType: {
      control: "select",
      description: "icon | text",
      options: ["icon", "text"],
    },
    alt: { description: "string" },
  },
  args: {
    size: "md",
    variant: "fullWidth",
    shape: "square",
    contentType: "text",
    src: undefined,
    alt: "avatar alt",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=3543%3A19439&t=twls3Yqfkv8qQN4Z-0",
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
} as ComponentMeta<React.FC<WorkspaceItemProps>>;
