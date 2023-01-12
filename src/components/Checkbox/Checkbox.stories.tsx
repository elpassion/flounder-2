import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  Title,
  Description,
  Primary,
} from '@storybook/addon-docs';

import { Checkbox } from './';

export default {
  title: 'Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

export const Basic: ComponentStory<typeof Checkbox> = () => <Checkbox />;
export const Secondary: ComponentStory<typeof Checkbox> = () => <Checkbox />;

Basic.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2054%3A3055&t=VjSme4oWsUXD1DSL-4"
  },
  docs: {
    page: () => (
      <>
        <Title />
        <Description />
        <Primary />
      </>
    ),
  }
}

Secondary.parameters = {
  docs: {
    page: () => (
      <>
        <h1>test doc 2 </h1>
      </>
    )
  }
}
