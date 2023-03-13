import { ComponentMeta, Story } from '@storybook/react';
import { Text, TextInputProps } from '.';

export default {
  title: 'Atoms/TextInput',
  component: Text,
} as ComponentMeta<typeof Text>;

const Template: Story<TextInputProps> = (args) => <Text {...args} />;

export const TextInput = Template.bind({});

TextInput.args = {
  placeholder: 'Type anything',
};
