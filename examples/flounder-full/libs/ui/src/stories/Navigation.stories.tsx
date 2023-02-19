import { Meta, Story } from '@storybook/react';
import { Navigation as Nav, NavigationItem } from '../components/Navigation';
import {
  AtSymbolIcon,
  HomeIcon,
  MailIcon,
  UsersIcon,
} from '@heroicons/react/outline';

export default {
  title: 'VRT/Navigation',
  component: {},
} as Meta;

const Template: Story = (args) => (
  <div className="w-1/3 bg-gray-800 h-screen">
    <Nav>
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
    </Nav>
  </div>
);

export const Navigation = Template.bind({});
