import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Title,
} from "@storybook/addon-docs";
import { AccordionProps } from "components/Anchor/Anchor.interface";
import AccordionComponent from "components/Accordion";

const docs: string = `# Usage <br/> 
| DO | <div style="width:20vw">DON’T</div> |
| ----------- | ----------- |
|Use chevron or plus to indicate expansion| <b>Don’t use when:</b> <br/> -  Linking a title to another page. Instead, use Anchor <br/> - Designing with sparse content <br/> - Content is lengthy. Instead, use Tabs |
|Icon works well with the direction of expansion |  |
|Chevron changes direction (top/down) |  |
|Plus changes to lose/minus | |
|Place the icon left-aligned or right-aligned| |
|Entire bar should act as expansion| |
|Icons should be large enough for comfortable tapping| |
|Expanded state could collapse automatically| | 
|<b>Use when:</b> <br/> - Providing users more content within the same layout <br/> - Displaying content that is directly related, or supplemental, to the main subject of the page <br/>  - Designing with limited vertical space and there is enough content to condense <br/>  - Order the accordion titles by priority and importance <br/> - Keep titles short to avoid wrapping at smaller viewports <br/> - Use sentence case for titles <br/>  - Use short titles for accordion labels to avoid wrapping <br/>  - Always include a title, icon, and subsequent content for each section. All are required | |`;

export const Accordion: ComponentStory<React.FC<AccordionProps>> = ({
  ...props
}) => <AccordionComponent {...props} />;

export default {
  title: "🟢 Atoms/Accordion",
  component: Accordion,
  argTypes: {
    expandedId: {
      control: { type: "number", min: 1, max: 3, step: 1 },
    },
    variant: {
      control: {
        type: "select",
        options: ["bordered", "solid"],
        description: "bordered | solid",
      },
    },
    iconPosition: {
      control: {
        type: "select",
        options: ["left", "right"],
        description: "left | right",
      },
    },
  },
  args: {
    expandedId: 1,
    variant: "bordered",
    iconPosition: "left",
    items: [
      {
        id: 1,
        title: "Accordion 1",
        description: "Accordion 1 description",
      },
      {
        id: 2,
        title: "Accordion 2",
        description: "Accordion 2 description",
      },
      {
        id: 3,
        title: "Accordion 3",
        description: "Accordion 3 description",
      },
    ],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2882%3A12680&t=wfQIehNzi01pCu8N-0",
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
} as ComponentMeta<React.FC<AccordionProps>>;
