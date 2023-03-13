import { ComponentMeta, Story } from '@storybook/react';
import { AvatarUpload as AvatarUploadExample, AvatarUploadProps } from '.';

export default {
  title: 'Atoms/AvatarUpload',
  component: AvatarUploadExample,
} as ComponentMeta<typeof AvatarUploadExample>;

const Template: Story<AvatarUploadProps> = (args) => (
  <AvatarUploadExample {...args} />
);

export const AvatarUpload = Template.bind({});

AvatarUpload.args = {
  loading: false,
  uploadText: 'upload file',
  filePreview: '/sampleAvatar.png',
};
