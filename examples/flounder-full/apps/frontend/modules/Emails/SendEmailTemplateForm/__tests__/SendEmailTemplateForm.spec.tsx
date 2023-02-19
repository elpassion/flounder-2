import React from 'react';
import { findByLabelText, findByText } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { RenderContext } from '../../../../test/RenderContext';
import { Toaster } from '../../../Toast';
import { handlers as sendEmailFormHandlers, handlersWithUnexpectedError } from '../handlers';
import { SendEmailTemplateForm } from '../index';

describe(SendEmailTemplateForm.name, () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should return validation error on empty email submitted', async () => {
    // Given
    const sendEmailTemplateForm = new SendEmailTemplateFormObject();
    const { submitButton, container } = await sendEmailTemplateForm.getControls();

    // When
    await userEvent.click(submitButton);

    // Then
    await findByText(container, /^You have to provide the e-mail address$/);
  });

  it('should return validation error on invalid email submitted', async () => {
    // Given
    const sendEmailTemplateForm = new SendEmailTemplateFormObject();
    const { submitButton, emailInput, container } = await sendEmailTemplateForm.getControls();
    await userEvent.type(emailInput, 'example');

    // When
    await userEvent.click(submitButton);

    // Then
    await findByText(container, /^Invalid email address$/);
  });

  it('should render success message on send email', async () => {
    // Given
    const sendEmailTemplateForm = new SendEmailTemplateFormObject();
    const { submitButton, emailInput, titleInput, bodyInput, container } =
      await sendEmailTemplateForm.getControls();

    await userEvent.type(emailInput, 'test@test.pl');
    await userEvent.type(titleInput, 'This is test title');
    await userEvent.type(bodyInput, 'This is test e-mail body ;)');

    // When
    await userEvent.click(submitButton);

    // Then
    await findByText(container, /^Check your recipient e-mail inbox!$/);
    await findByText(container, /^Email successfully sent$/);
    await findByText(container, /^Send another e-mail$/);
  });

  it('should display email form after "Send another e-mail" button was clicked', async () => {
    // Given
    const sendEmailTemplateForm = new SendEmailTemplateFormObject();

    const { submitButton, emailInput, titleInput, bodyInput, container } =
      await sendEmailTemplateForm.getControls();

    await userEvent.type(emailInput, 'test@test.pl');
    await userEvent.type(titleInput, 'This is test title');
    await userEvent.type(bodyInput, 'This is test e-mail body ;)');
    await userEvent.click(submitButton);

    const anotherEmailButton = await findByText(container, /^Send another e-mail$/);
    await userEvent.click(anotherEmailButton);

    // When & Then
    await userEvent.type(emailInput, 'test2@test.pl');
    await userEvent.type(titleInput, 'This is second title');
    await userEvent.type(bodyInput, 'This is second test e-mail body ;)');
    await userEvent.click(submitButton);
  });

  it('shows notice when server error occurs', async () => {
    // Given
    const sendEmailTemplateForm = new SendEmailTemplateFormObject().withUnexpectedResponse();

    const { submitButton, emailInput, container, titleInput, bodyInput } =
      await sendEmailTemplateForm.getControls();

    await userEvent.type(emailInput, 'example@mail8.com');
    await userEvent.type(titleInput, 'This is test title');
    await userEvent.type(bodyInput, 'This is test e-mail body ;)');

    // When
    await userEvent.click(submitButton);

    // Then
    await findByText(container, 'Oops. We cannot handle your request right now. Try again later');
    await findByText(container, /^Sth goes wrong during sending an email. We are deeply sorry$/);
  });
});

class SendEmailTemplateFormObject {
  public context = new RenderContext();

  constructor() {
    this.withSendEmailHandlers();
  }

  public async getControls() {
    const { container } = await this.render();
    const submitButton = await findByText(container, /^Send$/);
    const emailInput = await findByLabelText(container, /^E-mail$/);
    const titleInput = await findByLabelText(container, /^Title$/);
    const bodyInput = await findByLabelText(container, /^Body$/);

    return { submitButton, emailInput, titleInput, bodyInput, container };
  }

  public withSendEmailHandlers = () => {
    this.context.server.resetHandlers(...sendEmailFormHandlers);
    return this;
  };

  public withUnexpectedResponse() {
    this.context.server.resetHandlers(...handlersWithUnexpectedError);
    return this;
  }

  async render() {
    return this.context.render(
      <>
        {Toaster}
        <SendEmailTemplateForm />
      </>,
    );
  }
}
