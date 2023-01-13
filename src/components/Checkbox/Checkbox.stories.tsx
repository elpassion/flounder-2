import React from "react";
import * as ReactDOMServer from "react-dom/server";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Title, Description, Primary } from "@storybook/addon-docs";

import { Checkbox } from "./";

export default {
  title: "Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

export const Basic: ComponentStory<typeof Checkbox> = () => <Checkbox />;
export const Secondary: ComponentStory<typeof Checkbox> = () => <Checkbox />;

Basic.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2054%3A3055&t=VjSme4oWsUXD1DSL-4",
  },
  docs: {
    page: () => (
      <>
        <Title />
        <Description />
        <Primary />
        <SyntaxHighlighter language="typescript" style={vs2015}>
          {ReactDOMServer.renderToStaticMarkup(<Checkbox />)}
        </SyntaxHighlighter>
      </>
    ),
  },
};

Secondary.parameters = {
  docs: {
    page: () => (
      <>
        <h1>test doc 2 </h1>
        <SyntaxHighlighter language="typescript" style={vs2015}>
          {ReactDOMServer.renderToStaticMarkup(<Checkbox />)}
        </SyntaxHighlighter>
      </>
    ),
  },
};
