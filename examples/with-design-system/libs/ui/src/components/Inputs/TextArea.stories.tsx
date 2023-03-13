import { ComponentMeta, Story } from '@storybook/react';
import { TextArea as TextAreaExample, TextAreaProps } from '.';

export default {
  title: 'Atoms/TextArea',
  component: TextAreaExample,
} as ComponentMeta<typeof TextAreaExample>;

const Template: Story<TextAreaProps> = (args) => <TextAreaExample {...args} />;

export const TextArea = Template.bind({});

TextArea.args = {
  placeholder: 'Type anything',
  rows: 4,
};
