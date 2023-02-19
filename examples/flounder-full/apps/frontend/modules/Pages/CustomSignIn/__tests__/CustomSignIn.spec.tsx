import React from 'react';
import { findByText } from '@testing-library/dom';
import { CognitoAppErrorMessages } from '@flounder/cognito-auth';
import { exampleUser, exampleUserNotConfirmedSignInData } from '@flounder/contracts';
import { ButtonHandle, InputHandle } from '../../../../test/handles';
import { RenderContext } from '../../../../test/RenderContext';
import { CustomSignIn } from '../CustomSignIn';
import { handlersForCorrectSignIn } from '../handlers';

const correctEmail = exampleUser.email;
const notConfirmedEmail = exampleUserNotConfirmedSignInData.mail;
const incorrectEmail = 'example';
const notRegisteredEmail = 'exampleEmail@elpassion.pl';
const password = 'Password1#';
const incorrectPassword = '123';
const signInInfo = 'You are already signed in';
const noEmailError = 'You have to provide the e-mail address';
const noPasswordError = 'You have to provide correct password';
const invalidEmailError = 'Invalid email address';

describe(CustomSignIn.name, () => {
  it('should display success message on valid credentials', async () => {
    // Given
    const page = new CustomSignInPageObject().render();
    const { emailInput, passwordInput, container } = page.getControls();

    await emailInput.type(correctEmail);
    await passwordInput.type(password);

    page.withCorrectSignInHandlers();

    // When
    await page.submitButton.click();

    // Then
    expect(await findByText(container, signInInfo)).toBeInTheDocument();
  });

  it('should return frontend validation error on empty mail and password', async () => {
    // Given
    const page = new CustomSignInPageObject().render();
    const { container } = page.getControls();

    // When
    await page.submitButton.click();

    // Then
    expect(await findByText(container, noEmailError)).toBeInTheDocument();
    expect(await findByText(container, noPasswordError)).toBeInTheDocument();
  });

  it('should return frontend validation error on not valid email', async () => {
    // Given
    const page = new CustomSignInPageObject().render();
    const { container, emailInput } = page.getControls();

    await emailInput.type(incorrectEmail);

    // When
    await page.submitButton.click();

    // Then
    expect(await findByText(container, invalidEmailError)).toBeInTheDocument();
    expect(await findByText(container, noPasswordError)).toBeInTheDocument();
  });

  it('should display error on invalid password for registered email', async () => {
    // Given
    const page = new CustomSignInPageObject().render();
    const { emailInput, passwordInput, container } = page.getControls();

    await emailInput.type(correctEmail);
    await passwordInput.type(incorrectPassword);

    // When
    await page.submitButton.click();

    // Then
    expect(
      await findByText(container, CognitoAppErrorMessages.InvalidUserOrPassword),
    ).toBeInTheDocument();
  });

  it('should display error on not registered email', async () => {
    // Given
    const page = new CustomSignInPageObject().render();
    const { emailInput, passwordInput, container } = page.getControls();

    await emailInput.type(notRegisteredEmail);
    await passwordInput.type(password);

    // When
    await page.submitButton.click();

    // Then
    expect(
      await findByText(container, CognitoAppErrorMessages.InvalidUserOrPassword),
    ).toBeInTheDocument();
  });

  it('should display confirm signup form when the user was registered but the account was not confirmed with the code', async () => {
    // Given
    const page = new CustomSignInPageObject().render();
    const { emailInput, passwordInput, container } = page.getControls();

    await emailInput.type(notConfirmedEmail);
    await passwordInput.type(password);

    // When
    await page.submitButton.click();

    // Then
    expect(await findByText(container, /^Verification Code$/)).toBeInTheDocument();
  });
});

class CustomSignInPageObject {
  public context = new RenderContext();
  public container!: HTMLElement;

  public render = () => {
    const renderResult = this.context.render(<CustomSignIn />);
    this.container = renderResult.container;
    return this;
  };

  public getControls() {
    const emailInput = InputHandle.fromLabelText(this.container, /^E-mail$/);
    const passwordInput = InputHandle.fromLabelText(this.container, /^Password$/);

    return { emailInput, passwordInput, container: this.container };
  }

  public withCorrectSignInHandlers = () => {
    this.context.server.resetHandlers(...handlersForCorrectSignIn);
  };

  get submitButton() {
    return ButtonHandle.fromRole(this.container, 'Sign In');
  }
}
