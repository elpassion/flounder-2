import { ComponentMeta, Story } from '@storybook/react';
import {
  SwitchCheckBox as SwitchCheckBoxExample,
  SwitchCheckBoxProps,
} from '.';

export default {
  title: 'Atoms/Checkbox',
  component: SwitchCheckBoxExample,
} as ComponentMeta<typeof SwitchCheckBoxExample>;

const Template: Story<SwitchCheckBoxProps> = (args) => (
  <SwitchCheckBoxExample {...args} />
);

export const SwitchCheckbox = Template.bind({});

SwitchCheckbox.args = {
  text: 'switch',
  name: 'topkek',
};
