import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  ArgsTable,
  Primary,
  PRIMARY_STORY,
  Title,
} from "@storybook/addon-docs";
import { Search as SearchComponent } from "../../components/Search";

export const Search: ComponentStory<React.FC> = ({ ...props }) => (
  <SearchComponent {...props} />
);

export default {
  title: "🟠 Molecules/Search",
  component: Search,
  argTypes: {
    placeholder: {
      description: "string",
    },
    disabled: {
      description: "boolean",
    },
    suffixText: {
      description: "string",
    },
    variant: {
      control: "select",
      options: ["default", "withButton", "withIconButton", "inline"],
      description: "default | withButton | withIconButton | inline",
    },
  },
  args: {
    placeholder: "Search for anything",
    variant: "default",
    suffixText: "All",
    disabled: false,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=3690%3A29584&t=KVvRaQippyVck9hn-0",
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
} as unknown as ComponentMeta<React.FC>;
