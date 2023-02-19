import { Meta, Story } from '@storybook/react';
import {
  ErrorMessage,
  Form,
  InputContainer,
  Label,
  Row,
  Text,
  TextArea,
} from '../components';

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
        <Label>Title</Label>
        <InputContainer>
          <Text />
          <ErrorMessage
            error={
              hasErrors.title
                ? { message: 'Title should not be empty' }
                : undefined
            }
          />
        </InputContainer>
      </Row>
      <Row>
        <Label>Body</Label>
        <InputContainer>
          <TextArea />
          <ErrorMessage
            error={
              hasErrors.body
                ? { message: 'Body should not be empty' }
                : undefined
            }
          />
        </InputContainer>
      </Row>
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
