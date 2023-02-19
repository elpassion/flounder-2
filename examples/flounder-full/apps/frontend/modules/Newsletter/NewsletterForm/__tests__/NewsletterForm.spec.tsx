import React from 'react';
import { findByText } from '@testing-library/dom';
import { ButtonHandle, InputHandle } from '../../../../test/handles';
import { RenderContext } from '../../../../test/RenderContext';
import {
  handlers as newsletterHandlers,
  handlersWithConflictError,
  handlersWithUnexpectedError,
} from '../handlers';
import { NewsletterForm } from '../NewsletterForm';

describe(NewsletterForm.name, () => {
  it('should return validation error on empty email submitted', async () => {
    // Given
    const { container, submitButton } = new NewsletterFormObject();

    // When
    await submitButton.click();

    // Then
    await findByText(container, /^You have to provide your e-mail address$/);
  });

  it('should return validation error on invalid email submitted', async () => {
    // Given
    const { container, submitButton, emailInput } = new NewsletterFormObject();

    await emailInput.type('example');

    // When
    await submitButton.click();

    // Then
    await findByText(container, /^Invalid email address$/);
  });

  it('should render success message on add to newsletter', async () => {
    // Given
    const { container, submitButton, emailInput } = new NewsletterFormObject();

    await emailInput.type('example@mail8.com');

    // When
    await submitButton.click();

    // Then
    await findByText(container, 'Thank you for signing up!');
  });

  it('shows notice when server error occurs', async () => {
    // Given
    const { container, submitButton, emailInput } =
      new NewsletterFormObject().withUnexpectedResponse();

    await emailInput.type('example@mail8.com');

    // When
    await submitButton.click();

    // Then
    await findByText(container, 'Oops. We cannot handle your request right now. Try again later');
  });
});

class NewsletterFormObject {
  private context = new RenderContext();
  public container: HTMLElement;

  constructor() {
    this.withNewsletterHandlers();
    this.container = this.context.render(<NewsletterForm />).container;
  }

  public withNewsletterHandlers = () => {
    this.context.server.resetHandlers(...newsletterHandlers);
    return this;
  };

  public withConflictResponse() {
    this.context.server.resetHandlers(...handlersWithConflictError);
    return this;
  }

  public withUnexpectedResponse() {
    this.context.server.resetHandlers(...handlersWithUnexpectedError);
    return this;
  }

  get submitButton() {
    return ButtonHandle.fromDisplayValue(this.container, /^Submit$/);
  }

  get emailInput() {
    return InputHandle.fromLabelText(this.container, /^E-mail$/);
  }
}
