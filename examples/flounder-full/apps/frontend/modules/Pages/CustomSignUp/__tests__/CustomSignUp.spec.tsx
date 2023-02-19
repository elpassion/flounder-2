import React from 'react';

import {
  findByLabelText,
  findByTestId,
  findByText,
  queryByText,
  waitFor,
} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { exampleConfirmationCode, exampleUser } from '@flounder/contracts';
import { RenderContext } from '../../../../test/RenderContext';
import { CustomSignUp } from '../CustomSignUp';
import { handlers as customSignUpHandlers, handlersWithUnexpectedError } from '../handlers';

const invalidConfirmationCode = '89101112';
const validConfirmationCode = exampleConfirmationCode;
const invalidEmail = 'example@';
const validEmail = exampleUser.email;
const invalidPassword = 'wrongpassword';
const validPassword = 'TestPassword123';

const user = userEvent.setup();

describe(CustomSignUp.name, () => {
  it('should return validation error on empty email submitted', async () => {
    // Given
    const page = new CustomSignUpObject().render();
    const { container, signUpButton } = await page.getControls();

    // When
    await user.click(signUpButton);

    // Then
    await findByText(container, /^You have to provide the e-mail address$/);
  });

  it('should return validation error on invalid email submitted', async () => {
    // Given
    const page = new CustomSignUpObject().render();
    const { container, signUpButton, emailInput } = await page.getControls();
    await user.type(emailInput, invalidEmail);

    // When
    await user.click(signUpButton);

    // Then
    await findByText(container, /^Invalid email address$/);
  });

  it('should return validation error on invalid password submitted', async () => {
    // Given
    const page = new CustomSignUpObject().render();
    const { container, signUpButton, passwordInput } = await page.getControls();
    await user.type(passwordInput, invalidPassword);

    // When
    await user.click(signUpButton);

    // Then
    expect(await findByTestId(container, 'password-At least one uppercase letter')).toHaveClass(
      'text-red-400',
    );
  });

  it('should display error message when unexpected error occurs during submitting registration form', async () => {
    // Given
    const page = new CustomSignUpObject().withUnexpectedResponse().render();

    // When
    await page.fillSignUpForm(validEmail, validPassword);

    // Then
    await findByText(page.container, 'Something went wrong');
  });

  it('should render sent code info on successful signup', async () => {
    // Given
    const page = new CustomSignUpObject().render();

    // When
    await page.fillSignUpForm(validEmail, validPassword);

    // Then
    await findByText(
      page.container,
      'We have sent a code by email to e***@m***. Enter it below to confirm your account.',
    );
  });

  it('should display validation error when empty conformation code was submitted', async () => {
    // Given
    const page = new CustomSignUpObject().render();
    await page.fillSignUpForm(validEmail, validPassword);

    const confirmSubmitButton = await findByText(page.container, /^Confirm Account$/);

    // When
    await user.click(confirmSubmitButton);

    // Then
    await findByText(page.container, /^You have to provide verification code$/);
  });

  it('should display error message when invalid confirmation code was provided ', async () => {
    // Given
    const page = new CustomSignUpObject().render();
    await page.fillSignUpForm(validEmail, validPassword);

    // When
    await page.fillConfirmationCodeForm(invalidConfirmationCode);

    await findByText(page.container, /^Wrong verification code$/);
  });

  it('should not display error message when valid confirmation code was provided', async () => {
    // Given
    const page = new CustomSignUpObject().render();
    await page.fillSignUpForm(validEmail, validPassword);

    // When
    await page.fillConfirmationCodeForm(validConfirmationCode);

    // Then
    await waitFor(() =>
      expect(queryByText(page.container, /^Wrong verification code$/)).not.toBeInTheDocument(),
    );
  });

  it('should resend a verification code', async () => {
    // Given
    const page = new CustomSignUpObject().render();
    await page.fillSignUpForm(validEmail, validPassword);

    // When
    await page.resendConfirmationCode();

    await findByText(page.container, /^Code sent! or you can again:$/);
  });
});

class CustomSignUpObject {
  public context = new RenderContext();
  public container!: HTMLElement;

  constructor() {
    this.withCustomSignUpHandlers();
  }

  public async getControls() {
    const signUpButton = await findByText(this.container, /^Sign Up$/);
    const emailInput = await findByLabelText(this.container, /^E-mail$/);
    const passwordInput = await findByLabelText(this.container, /^Password$/);

    return {
      signUpButton,
      emailInput,
      passwordInput,
      container: this.container,
    };
  }

  public withCustomSignUpHandlers = () => {
    this.context.server.resetHandlers(...customSignUpHandlers);
    return this;
  };

  public withUnexpectedResponse() {
    this.context.server.resetHandlers(...handlersWithUnexpectedError);
    return this;
  }

  public async fillSignUpForm(email: string, password: string) {
    const { emailInput, passwordInput, signUpButton } = await this.getControls();

    await user.type(emailInput, email);
    await user.type(passwordInput, password);
    await user.click(signUpButton);
  }

  public async fillConfirmationCodeForm(code: string) {
    await findByText(
      this.container,
      'We have sent a code by email to e***@m***. Enter it below to confirm your account.',
    );
    const confirmCodeInput = await findByLabelText(this.container, /^Verification Code$/);
    const confirmSubmitButton = await findByText(this.container, /^Confirm Account$/);

    await user.type(confirmCodeInput, code);
    await user.click(confirmSubmitButton);
  }

  public async resendConfirmationCode() {
    await findByText(
      this.container,
      'We have sent a code by email to e***@m***. Enter it below to confirm your account.',
    );

    const resendCodeButton = await findByText(this.container, /^Send a new code$/);

    await user.click(resendCodeButton);
  }

  render() {
    const renderResult = this.context.render(<CustomSignUp />);
    this.container = renderResult.container;
    return this;
  }
}
