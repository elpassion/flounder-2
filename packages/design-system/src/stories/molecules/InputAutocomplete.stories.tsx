import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  ArgsTable,
  Primary,
  PRIMARY_STORY,
  Title,
} from "@storybook/addon-docs";
import { getImageUrl } from "../utils";
import UserSvg from "../../svgs/UserSvg";
import Avatar from "../../components/Avatar";
import Icon from "../../components/Icon";
import { InputAutocomplete as InputAutocompleteComponent } from "../../components/InputAutocomplete";
import type { InputAutocompleteProps } from "../../components/InputAutocomplete/InputAutocomplete.interface";

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
        icon: <Icon icon="&#xeafe" size="sm" />,
      },
      {
        label: "Logo T-Shirt",
        icon: <Icon customIcon={<UserSvg className="aspect-square w-4" />} />,
      },
      {
        label: "Desert Slim Black Jeans",
        icon: <Icon customIcon={<UserSvg className="aspect-square w-4" />} />,
      },
      {
        label: "Desert Slim Red Jeans",
        icon: <Avatar src={getImageUrl("/peach.png")} size="xxs" />,
      },
      {
        label: "Bunny Print Hoodie",
        icon: <Icon customIcon={<UserSvg className="aspect-square w-4" />} />,
      },
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
