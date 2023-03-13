import { Meta, Story } from '@storybook/react';
import {
  Avatar,
  AvatarUpload,
  Button,
  CheckBox,
  Link,
  Text,
  TextArea,
} from '../components';

export default {
  title: 'VRT/Atoms',
  component: {},
} as Meta;

const Template: Story = () => (
  <div className="flex flex-wrap gap-4 flex-col">
    <div className="flex flex-wrap align-middle gap-4 lg:flex-nowrap lg:justify-center">
      <Button>Button</Button>
      <Button fullWidth>Button</Button>
      <Button>Looooooong Button</Button>
    </div>
    <div className="flex flex-wrap align-middle gap-4 lg:flex-nowrap lg:justify-center">
      <Button variant="secondary">Button</Button>
      <Button variant="secondary" fullWidth>
        Button
      </Button>
      <Button variant="secondary">Looooooong Button</Button>
    </div>
    <div className="flex flex-wrap align-top gap-4 lg:flex-nowrap lg:justify-start">
      <Avatar src="sampleAvatar.png" />
      <Avatar src="sampleAvatar.png" size="big" />
      <div className="ml-auto flex flex-wrap gap-4 lg:flex-nowrap lg:items-center">
        <AvatarUpload
          filePreview="sampleAvatar.png"
          onUpload={() => {
            return null;
          }}
          loadingText="Loading..."
          uploadText="Upload image"
        />
        <AvatarUpload
          onUpload={() => {
            return null;
          }}
          loading
          loadingText="Loading..."
          uploadText="Upload image"
          defaultImage="sampleAvatar.png"
        />
      </div>
    </div>
    <div className="flex flex-wrap align-middle gap-4 lg:flex-nowrap lg:justify-center">
      <Text /> <TextArea rows={3} />
    </div>
    <div className="flex flex-wrap align-middle gap-12 mb-6 lg:flex-nowrap lg:justify-center">
      <CheckBox />
      <CheckBox text="Some text goes here" />
      <CheckBox
        text="Some text goes here"
        description="Description goes here aswell!"
      />
    </div>
    <div className="flex flex-wrap align-middle gap-12 lg:flex-nowrap lg:justify-center">
      <p>
        Paragraph text{' '}
        <Link
          children="with link"
          href="http://google.com"
          className="ml-0.5"
        />
      </p>
    </div>
  </div>
);

export const Atoms = Template.bind({});
