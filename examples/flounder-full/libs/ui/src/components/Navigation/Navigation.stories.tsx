import { Meta, Story } from '@storybook/react';
import {
  AtSymbolIcon,
  HomeIcon,
  MailIcon,
  UsersIcon,
} from '@heroicons/react/outline';
import {
  NavigationItem,
  Navigation as ExampleNavigation,
} from '../Navigation/index';

export default {
  title: 'Molecules/Navigation',
  component: ExampleNavigation,
} as Meta;

const Template: Story = (args) => (
  <div className="w-1/4 bg-gray-800 h-screen">
    <ExampleNavigation>
      <NavigationItem icon={<HomeIcon />} isActive={true}>
        Home
      </NavigationItem>
      <NavigationItem icon={<UsersIcon />} isActive={false}>
        Users
      </NavigationItem>
      <NavigationItem icon={<MailIcon />} isActive={false}>
        Subscriptions
      </NavigationItem>
      <NavigationItem icon={<AtSymbolIcon />} isActive={false}>
        Emails
      </NavigationItem>
    </ExampleNavigation>
  </div>
);

export const Navigation = Template.bind({});
