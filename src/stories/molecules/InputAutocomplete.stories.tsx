import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  ArgsTable,
  Primary,
  PRIMARY_STORY,
  Title,
} from "@storybook/addon-docs";
import { InputAutocompleteProps } from "components/InputAutocomplete/InputAutocomplete.interface";
import { InputAutocomplete as InputAutocompleteComponent } from "components/InputAutocomplete";
import Avatar from "components/Avatar";

const SvgIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99992 3.99992V7.99992L10.6666 9.33325M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
        stroke="#7B8A95"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const InputAutocomplete: ComponentStory<
  React.FC<InputAutocompleteProps>
> = ({ ...props }) => <InputAutocompleteComponent {...props} />;

export default {
  title: "🟠 Molecules/InputAutocomplete",
  component: InputAutocomplete,
  argTypes: {
    dropdownTitle: {
      description: "string",
    },
    isCreatable: {
      control: "select",
      options: [true, false],
      description: "true | false",
    },
  },
  args: {
    isCreatable: false,
    dropdownTitle: "Recent",
    dropdownItems: [
      {
        label: "Desert Slim Jeans",
        icon: (
          <span
            className="font-icons text-base leading-none"
            dangerouslySetInnerHTML={{
              __html: "&#xeb20;",
            }}
          />
        ),
      },
      { label: "Logo T-Shirt", icon: <SvgIcon /> },
      { label: "Desert Slim Black Jeans", icon: <SvgIcon /> },
      {
        label: "Desert Slim Red Jeans",
        icon: <Avatar src="images/peach.png" size="xxs" />,
      },
      { label: "Bunny Print Hoodie", icon: <SvgIcon /> },
    ],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=3755%3A29040&t=YCupjytrJTmtsghq-0",
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
} as unknown as ComponentMeta<React.FC<InputAutocompleteProps>>;
