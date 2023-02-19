import { Meta, Story } from '@storybook/react';
import {
  CheckBox,
  ErrorMessage,
  Form,
  InputContainer,
  Label,
  Row,
  Text,
} from '../components';

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
      <Row>
        <Label>Email</Label>
        <InputContainer>
          <Text />
          <ErrorMessage
            error={
              hasErrors.email ? { message: 'Invalid e-mail adress' } : undefined
            }
          />
        </InputContainer>
      </Row>
      <Row>
        <Label> Agreed to terms and conditions </Label>
        <InputContainer>
          <CheckBox text="I agree" checked={hasErrors ? false : true} />
          <ErrorMessage
            error={
              hasErrors.terms
                ? { message: 'You have to agree to terms' }
                : undefined
            }
          />
        </InputContainer>
      </Row>
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
