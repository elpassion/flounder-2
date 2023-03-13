import { ComponentMeta, Story } from '@storybook/react';
import { CheckBox as CheckBoxExample, CheckBoxProps } from '.';

export default {
  title: 'Atoms/Checkbox',
  component: CheckBoxExample,
} as ComponentMeta<typeof CheckBoxExample>;

const Template: Story<CheckBoxProps> = (args) => <CheckBoxExample {...args} />;

export const Checkbox = Template.bind({});

Checkbox.args = {
  text: '',
  description: '',
  name: 'topkek',
};
