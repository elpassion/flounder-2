import { ComponentMeta, Story } from '@storybook/react';
import { Button as ExampleButton } from './Button';
import { ButtonProps } from './types';

export default {
  title: 'Atoms/Button',
  component: ExampleButton,
} as ComponentMeta<typeof ExampleButton>;

const Template: Story<ButtonProps> = (args) => <ExampleButton {...args} />;

export const Button = Template.bind({});

Button.args = {
  children: 'Just an example button',
  onClick: () => alert('It works!'),
};
