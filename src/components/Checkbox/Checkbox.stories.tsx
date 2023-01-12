import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Checkbox } from './';

export default {
  title: 'Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

export const Primary: ComponentStory<typeof Checkbox> = () => <Checkbox />;

Primary.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/xy6otn2JWHNdF70Tuq0UbS/TACO-Design-System-%5BDRAFT%5D?node-id=2054%3A3055&t=VjSme4oWsUXD1DSL-4"
  }
}
