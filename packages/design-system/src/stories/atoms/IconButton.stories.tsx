import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Title,
  Primary,
  ArgsTable,
  Description,
  PRIMARY_STORY,
} from "@storybook/addon-docs";
import { IconButton as IconButtonComponent } from "../../components/IconButton";
import UserSvg from "../../svgs/UserSvg";
import type { IconButtonProps } from "../../components/IconButton/IconButton.interface";

const docs: string = `# Usage <br/> 
| DO | <div style="width:30vw">DON’T</div> |
| ----------- | ----------- |
| Icon buttons can take the form of a wide range of system icons | |
| Ensure the meaning of the icon is unambiguous | |
| Use the outline-style icons to indicate an unselected state and a filled style to indicate selection | |
|On hover, include a tooltip that describes the button’s action, rather than the name of the icon itself | |`;

export const IconButton: ComponentStory<React.FC<IconButtonProps>> = ({
  ...props
}) => <IconButtonComponent {...props} />;

export default {
  title: "🟢 Atoms/IconButton",
  component: IconButton,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "outlined",
        "ghost",
        "destructive",
        "destructiveGhost",
        "destructiveOutlined",
      ],
      description:
        "primary | outlined | ghost | destructive | destructiveGhost | destructiveOutlined",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "sm | md | lg",
    },
    disabled: {
      description: "boolean",
    },
    onClick: {
      description: "function",
    },
    ariaLabel: {
      description: "string",
    },
  },
  args: {
    icon: <UserSvg className="aspect-square w-full" />,
    variant: "primary",
    size: "md",
    disabled: false,
    ariaLabel: "",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2953%3A17890&t=rVpypypag1eT8SHD-0",
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
} as ComponentMeta<React.FC<IconButtonProps>>;
