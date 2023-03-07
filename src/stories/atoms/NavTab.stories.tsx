import { ComponentMeta, ComponentStory } from "@storybook/react";
import { NavTabs as NavTabsComponent, NavTabsProps } from "components/NavTabs";

const SvgIcon = () => { return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="#000"
    version="1.1"
    viewBox="0 0 31.671 31.671"
    xmlSpace="preserve"
  >
    <path d="M13.188 2.723H2.158C.955 2.723 0 3.658 0 4.863v2.362c0 .997.645 1.835 1.52 2.098v14.869c0 .041.018.082.02.125.094 1.603 1.499 4.631 6.127 4.631 4.284 0 5.879-2.896 6.113-4.426.016-.108.043-.222.043-.33V9.323c.874-.263 1.52-1.101 1.52-2.098V4.863c-.001-1.205-.951-2.14-2.155-2.14zm-.011 3.744a.749.749 0 01-.756.736h-.034a.735.735 0 00-.728.75v16.238s-.424 2.576-3.968 2.576c-3.79 0-3.969-2.576-3.969-2.576V7.955a.762.762 0 00-.759-.75h-.036a.722.722 0 01-.724-.736v-.83c0-.411.313-.751.724-.751h9.494a.76.76 0 01.756.751v.828z" />
    <path d="M4.899 23.619S5.012 25.7 7.671 25.7c2.486 0 2.771-2.081 2.771-2.081v-6.884H4.899v6.884zM29.525 2.723H18.583a2.12 2.12 0 00-2.142 2.141v2.362c0 .997.646 1.835 1.521 2.098v14.869c0 .041.011.082.013.125.092 1.603 1.484 4.631 6.076 4.631 4.254 0 5.83-2.896 6.062-4.426.016-.108.037-.222.037-.33V9.323c.875-.263 1.521-1.101 1.521-2.098V4.863a2.12 2.12 0 00-2.146-2.14zm-.019 3.745c0 .41-.331.735-.738.735h-.038a.753.753 0 00-.742.75v16.238s-.411 2.576-3.932 2.576c-3.761 0-3.931-2.576-3.931-2.576V7.955c0-.41-.341-.75-.747-.75h-.036a.731.731 0 01-.733-.735v-.83c0-.41.328-.752.733-.752h9.425c.407 0 .738.342.738.752v.828z" />
    <path d="M21.305 23.619s.115 2.081 2.75 2.081c2.471 0 2.756-2.081 2.756-2.081V7.468h-5.506v16.151z" />
  </svg>
)}

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
        icon: <span
          className="font-icons text-base leading-none"
          dangerouslySetInnerHTML={{
            __html: '&#xea87',
          }}
        />
      },
      {
        id: "2",
        label: "Nav Tab 2",
        icon: <span
          className="font-icons text-base leading-none"
          dangerouslySetInnerHTML={{
            __html: '&#xea87',
          }}
        />
      },
      {
        id: "3",
        label: "Nav Tab 3",
        icon: <span
          className="font-icons text-base leading-none"
          dangerouslySetInnerHTML={{
            __html: '&#xea87',
          }}
        />
      },
      {
        id: "4",
        label: "Nav Tab 4",
        icon: <span
          className="font-icons text-base leading-none"
          dangerouslySetInnerHTML={{
            __html: '&#xea87',
          }}
        />
      },
      {
        id: "5",
        label: "Nav Tab 5",
        icon: <SvgIcon />,
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
