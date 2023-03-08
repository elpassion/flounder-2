import { ComponentStory } from "@storybook/react";
import { FeaturedTextProps } from "components/FeaturedText/Featuredtext.interface";
import { FeaturedText as FeaturedTextComponent } from "components/FeaturedText";

const SvgIcon = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#F4F6F8" />
      <path
        d="M32 12C30.9391 12 29.9217 12.4214 29.1716 13.1716C28.4214 13.9217 28 14.9391 28 16V32C28 33.0609 28.4214 34.0783 29.1716 34.8284C29.9217 35.5786 30.9391 36 32 36C33.0609 36 34.0783 35.5786 34.8284 34.8284C35.5786 34.0783 36 33.0609 36 32C36 30.9391 35.5786 29.9217 34.8284 29.1716C34.0783 28.4214 33.0609 28 32 28H16C14.9391 28 13.9217 28.4214 13.1716 29.1716C12.4214 29.9217 12 30.9391 12 32C12 33.0609 12.4214 34.0783 13.1716 34.8284C13.9217 35.5786 14.9391 36 16 36C17.0609 36 18.0783 35.5786 18.8284 34.8284C19.5786 34.0783 20 33.0609 20 32V16C20 14.9391 19.5786 13.9217 18.8284 13.1716C18.0783 12.4214 17.0609 12 16 12C14.9391 12 13.9217 12.4214 13.1716 13.1716C12.4214 13.9217 12 14.9391 12 16C12 17.0609 12.4214 18.0783 13.1716 18.8284C13.9217 19.5786 14.9391 20 16 20H32C33.0609 20 34.0783 19.5786 34.8284 18.8284C35.5786 18.0783 36 17.0609 36 16C36 14.9391 35.5786 13.9217 34.8284 13.1716C34.0783 12.4214 33.0609 12 32 12Z"
        stroke="#00B71D"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const FeaturedText: ComponentStory<React.FC<FeaturedTextProps>> = ({
  ...props
}) => <FeaturedTextComponent {...props} />;

export default {
  title: "🟠 Molecules/FeaturedText",
  component: FeaturedText,
  argTypes: {
    title: {
      description: "string",
    },
    content: {
      description: "string",
    },
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
    },
    iconPosition: {
      type: "select",
      options: ["iconTop", "iconLeft"],
    },
  },
  args: {
    title: "Featured text",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    icon: (
      <span>
        <SvgIcon />
      </span>
    ),
    size: "sm",
    iconPosition: "iconTop",
  },
};
