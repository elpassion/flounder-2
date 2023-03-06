import { ComponentMeta, ComponentStory } from "@storybook/react";
import { NavTabs as NavTabsComponent, NavTabsProps } from "components/NavTabs";

export const NavTabs: ComponentStory<React.FC<NavTabsProps>> = ({
  ...props
}) => <NavTabsComponent {...props} />;

export default {
  title: "🟠 Atoms/NavTabs",
  component: NavTabs,
  argTypes: {
    layout: {
      control: {
        type: "select",
        options: ["horizontal", "vertical"],
      },
      if: {
        arg: "type",
        neq: "line",
      },
    },
    type: {
      control: {
        type: "select",
        options: ["filled", "outlined", "line"],
      },
    },
    activeTab: {
      control: {
        type: "select",
        options: ["1", "2", "3", "4", "5"],
      },
    },
    tabs: {
      control: {
        type: "object",
      },
    },
  },
  args: {
    layout: "horizontal",
    type: "filled",
    activeTab: "1",
    tabs: [
      {
        id: "1",
        label: "Nav Tab 1",
        icon: "&#xea87",
      },
      {
        id: "2",
        label: "Nav Tab 2",
        icon: "&#xea87",
      },
      {
        id: "3",
        label: "Nav Tab 3",
        icon: "&#xea87",
      },
      {
        id: "4",
        label: "Nav Tab 4",
        icon: "&#xea87",
      },
      {
        id: "5",
        label: "Nav Tab 5",
        icon: "&#xea87",
      },
    ],
    onClick: (id) => console.log(id),
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=3794%3A31655&t=OiYzKYqf1tHUyY2N-0",
    },
  },
} as ComponentMeta<React.FC<NavTabsProps>>;
