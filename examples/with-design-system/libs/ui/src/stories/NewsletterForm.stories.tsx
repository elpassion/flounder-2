import { Meta, Story } from '@storybook/react';
import { CheckBox, ErrorMessage, Form, Label, Text } from '../components';

interface NewsletterFormExampleProps {
  hasErrors: {
    email: boolean;
    terms: boolean;
    global: boolean;
  };
  onClick(): void;
}

function NewsletterFormExample({
  hasErrors,
  onClick,
}: NewsletterFormExampleProps) {
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
        <Label> Agreed to terms and conditions </Label>
        <div className="sm:col-span-2">
          <CheckBox text="I agree" checked={hasErrors ? false : true} />
          <ErrorMessage
            error={
              hasErrors.terms
                ? { message: 'You have to agree to terms' }
                : undefined
            }
          />
        </div>
      </div>
    </Form>
  );
}

export default {
  title: 'Organisms/NewsletterForm',
  component: NewsletterFormExample,
} as Meta;

const Template: Story<NewsletterFormExampleProps> = (args) => (
  <NewsletterFormExample {...args} />
);

export const NewsletterForm = Template.bind({});

NewsletterForm.args = {
  hasErrors: {
    email: true,
    terms: false,
    global: false,
  },
  onClick: () => null,
};
