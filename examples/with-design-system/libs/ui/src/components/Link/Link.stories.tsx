import { AnchorHTMLAttributes } from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { Link as ExampleLink } from './Link';

export default {
  title: 'Atoms/Link',
  component: ExampleLink,
} as ComponentMeta<typeof ExampleLink>;

const Template: Story<AnchorHTMLAttributes<HTMLAnchorElement>> = (args) => (
  <div className="mb-3 font-light text-gray-500">
    Paragraph text <ExampleLink {...args} />
  </div>
);

export const Link = Template.bind({});

Link.args = {
  children: `with link`,
  href: 'http://google.com',
  target: '_blank',
};
