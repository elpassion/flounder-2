import { Meta, Story } from '@storybook/react';
import { ErrorMessage, Form, Label, Text, TextArea } from '../components';

interface EmailFormExampleProps {
  hasErrors: {
    email: boolean;
    title: boolean;
    body: boolean;
    global: boolean;
  };
  onClick(): void;
}

function EmailFormExample({ hasErrors, onClick }: EmailFormExampleProps) {
  return (
    <Form
      onSubmit={() => {
        onClick();
      }}
      globalError={
        hasErrors.global
          ? { type: 'string', message: 'An error ocured. Please try again' }
          : undefined
      }
    >
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <Label>Email</Label>
        <div className="sm:col-span-2">
          <Text />
          <ErrorMessage
            error={
              hasErrors.email ? { message: 'Invalid e-mail adress' } : undefined
            }
          />
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <Label>Title</Label>
        <div className="sm:col-span-2">
          <Text />
          <ErrorMessage
            error={
              hasErrors.title
                ? { message: 'Title should not be empty' }
                : undefined
            }
          />
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <Label>Body</Label>
        <div className="sm:col-span-2">
          <TextArea />
          <ErrorMessage
            error={
              hasErrors.body
                ? { message: 'Body should not be empty' }
                : undefined
            }
          />
        </div>
      </div>
    </Form>
  );
}

export default {
  title: 'Organisms/EmailForm',
  component: EmailFormExample,
} as Meta;

const Template: Story<EmailFormExampleProps> = (args) => (
  <EmailFormExample {...args} />
);

export const EmailForm = Template.bind({});

EmailForm.args = {
  hasErrors: {
    email: true,
    title: false,
    body: false,
    global: false,
  },
  onClick: () => null,
};
