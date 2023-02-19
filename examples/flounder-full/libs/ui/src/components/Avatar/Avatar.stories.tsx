import { Meta, Story } from '@storybook/react';
import { Avatar as UserAvatar } from './Avatar';
import { AvatarProps } from './types';

export default {
  title: 'Atoms/Avatar',
  component: UserAvatar,
} as Meta<typeof UserAvatar>;

const Template: Story<AvatarProps> = (args) => <UserAvatar {...args} />;

export const Avatar = Template.bind({});

Avatar.args = {
  src: 'sampleAvatar.png',
  size: 'small',
};
