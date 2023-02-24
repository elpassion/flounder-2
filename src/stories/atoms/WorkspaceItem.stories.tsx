import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Title,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from "@storybook/addon-docs";
import { WorkspaceItemProps } from "components/WorkspaceItem";
import { WorkspaceItem as WorkspaceItemComponent } from "components/WorkspaceItem";

export const WorkspaceItem: ComponentStory<React.FC<WorkspaceItemProps>> = ({
  ...props
}) => <WorkspaceItemComponent {...props} />;

export default {
  title: "Atoms/WorkspaceItem",
  component: WorkspaceItem,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "sm | md | lg",
    },
    variant: {
      control: "select",
      options: ["onlyAvatar", "fullWidth"],
      description: "onlyAvatar | fullWidth",
    },
  },
  args: {
    size: "md",
    variant: "fullWidth",
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
