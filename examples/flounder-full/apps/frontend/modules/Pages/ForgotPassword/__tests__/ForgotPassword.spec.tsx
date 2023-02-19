import React from 'react';
import { findByTestId, findByText } from '@testing-library/dom';
import {
  exampleExpiredCode,
  exampleUser,
  exampleUserNotConfirmedSignInData,
  exampleUserResetPasswordData,
} from '@flounder/contracts';
import { ForgotPasswordForm } from 'modules/CustomAuth/ForgotPasswordForm';
import { ForgotPassword } from 'modules/Pages/ForgotPassword';
import { ButtonHandle, InputHandle } from 'test/handles';
import { RenderContext } from 'test/RenderContext';

const correctEmail = exampleUser.email;
const notConfirmedEmail = exampleUserNotConfirmedSignInData.mail;
const incorrectEmail = 'example';
const notRegisteredEmail = 'exampleEmail@elpassion.pl';
const password21chars = 'aaaaaaaaaaaaaaaaaaaaa';
const validPassword = exampleUserResetPasswordData.newPassword;
const validCode = exampleUserResetPasswordData.code;
const passwordWithoutNumber = 'Password';
const passwordWithoutCapitalLetter = 'password';
const passwordWithoutSmallLetter = 'PASSWORD';
const passwordWithNotAllowedChars = 'Password2;';
const codeExpired = exampleExpiredCode;
const noEmailError = 'You have to provide the e-mail address';
const invalidEmailError = 'Invalid email address';
const noCodeError = 'You have to provide code';

describe(ForgotPasswordForm.name, () => {
  describe('Reset Password Form', () => {
    it('should correctly send confirm code & display change password form', async () => {
      // Given
      const page = new ForgotPasswordPageObject().render();

      // When
      await page.submitFormWithValidEmail();

      // Then
      expect(page.changePasswordButton.buttonElement).toBeInTheDocument();
    });

    it('should display error on not registered email', async () => {
      // Given
      const page = new ForgotPasswordPageObject().render();
      const { emailInput, container } = page.getResetPasswordControls();

      await emailInput.type(notRegisteredEmail);

      // When
      await page.resetPasswordButton.click();

      // Then
      expect(
        await findByText(
          container,
          'We have sent a password reset code by email to e***@e***. Enter it below to reset your password.',
        ),
      ).toBeInTheDocument();
    });

    it('should display error on not confirmed email', async () => {
      // Given
      const page = new ForgotPasswordPageObject().render();
      const { emailInput, container } = page.getResetPasswordControls();

      await emailInput.type(notConfirmedEmail);

      // When
      await page.resetPasswordButton.click();

      // Then
      expect(
        await findByText(
          container,
          'We have sent a password reset code by email to e***@e***. Enter it below to reset your password.',
        ),
      ).toBeInTheDocument();
    });

    it('should return frontend validation error on not valid email', async () => {
      // Given
      const page = new ForgotPasswordPageObject().render();
      const { container, emailInput } = page.getResetPasswordControls();

      await emailInput.type(incorrectEmail);

      // When
      await page.resetPasswordButton.click();

      // Then
      expect(await findByText(container, invalidEmailError)).toBeInTheDocument();
    });

    it('should return frontend validation error on empty email', async () => {
      // Given
      const page = new ForgotPasswordPageObject().render();
      const { container } = page.getResetPasswordControls();

      // When
      await page.resetPasswordButton.click();

      // Then
      expect(await findByText(container, noEmailError)).toBeInTheDocument();
    });
  });

  describe('Change password form', () => {
    it('should return frontend validation errors on empty code & password', async () => {
      // Given
      const page = new ForgotPasswordPageObject().render();
      await page.submitFormWithValidEmail();

      await page.changePasswordButton.click();

      // When
      const { container } = page.getChangePasswordControls();

      // Then
      expect(await findByText(container, noCodeError)).toBeInTheDocument();
    });

    it('should return frontend validation errors on too short first password', async () => {
      // Given
      const page = new ForgotPasswordPageObject().render();
      await page.submitFormWithValidEmail();

      const { container, newPasswordInput } = page.getChangePasswordControls();
      await newPasswordInput.type('aa');

      // When
      await page.changePasswordButton.click();

      // Then
      expect(await findByText(container, noCodeError)).toBeInTheDocument();
      expect(await findByTestId(container, 'newPassword-Min 6 chars')).toBeInTheDocument();
    });

    it('should return frontend validation errors on too long first password', async () => {
      // Given
      const page = new ForgotPasswordPageObject().render();
      await page.submitFormWithValidEmail();

      const { container, newPasswordInput } = page.getChangePasswordControls();
      await newPasswordInput.type(password21chars);

      // When
      await page.changePasswordButton.click();

      // Then
      expect(await findByText(container, noCodeError)).toBeInTheDocument();
    });

    it('should return frontend validation errors on passwords that do not have required chars', async () => {
      // Given
      const page = new ForgotPasswordPageObject().render();
      await page.submitFormWithValidEmail();

      const { container, newPasswordInput } = page.getChangePasswordControls();
      await newPasswordInput.type(passwordWithoutNumber);

      // When
      await page.changePasswordButton.click();

      // Then
      expect(await findByTestId(container, 'newPassword-At least one number')).toHaveClass(
        'text-red-400',
      );

      // When
      await page.clearAndFillNewPassword(passwordWithoutSmallLetter);

      // Then
      expect(
        await findByTestId(container, 'newPassword-At least one lowercase letter'),
      ).toHaveClass('text-red-400');

      // When
      await page.clearAndFillNewPassword(passwordWithoutCapitalLetter);

      // Then
      expect(
        await findByTestId(container, 'newPassword-At least one uppercase letter'),
      ).toHaveClass('text-red-400');
    });

    it('should return frontend validation errors on passwords that have invalid chars', async () => {
      // Given
      const page = new ForgotPasswordPageObject().render();
      await page.submitFormWithValidEmail();

      const { container, newPasswordInput } = page.getChangePasswordControls();
      await newPasswordInput.type(passwordWithNotAllowedChars);

      // When
      await page.changePasswordButton.click();

      // Then
      expect(
        await findByTestId(container, 'newPassword-Allowed special characters: @$!%*?&#'),
      ).toHaveClass('text-red-400');
    });

    it('should display success message on valid code / new password', async () => {
      // Given
      const page = new ForgotPasswordPageObject().render();
      await page.submitFormWithValidEmail();

      const { container } = page.getChangePasswordControls();
      await page.submitChangePasswordFormWithValidData();

      // Then
      expect(container).toHaveTextContent(
        'We have sent a password reset code by email to e***@m***.',
      );
    });

    it('should display error message on expired code', async () => {
      // Given
      const page = new ForgotPasswordPageObject().render();
      await page.submitFormWithValidEmail();

      const { container, codeInput } = page.getChangePasswordControls();
      await page.fillChangePasswordFormWithCorrectPassword();
      await codeInput.type(codeExpired);

      // When
      await page.changePasswordButton.click();

      // Then
      expect(findByText(container, 'Wrong verification code'));
    });

    it('should display error message on invalid code', async () => {
      // Given
      const page = new ForgotPasswordPageObject().render();
      await page.submitFormWithValidEmail();

      const { container, codeInput } = page.getChangePasswordControls();
      await page.fillChangePasswordFormWithCorrectPassword();
      await codeInput.type('aaaaaa');

      // When
      await page.changePasswordButton.click();

      // Then
      expect(container).toHaveTextContent('Invalid verification code provided, please try again.');
    });
  });
});

class ForgotPasswordPageObject {
  public context = new RenderContext();
  public container!: HTMLElement;

  public render = () => {
    const renderResult = this.context.render(<ForgotPassword />);
    this.container = renderResult.container;
    return this;
  };

  public getResetPasswordControls() {
    const emailInput = InputHandle.fromPlaceholderText(this.container, 'E-mail');
    return { emailInput, container: this.container };
  }

  public getChangePasswordControls() {
    const codeInput = InputHandle.fromLabelText(this.container, /^Code$/);
    const newPasswordInput = InputHandle.fromLabelText(this.container, /^New Password$/);
    const repeatNewPasswordInput = InputHandle.fromLabelText(
      this.container,
      /^Enter New Password Again$/,
    );
    return { codeInput, newPasswordInput, repeatNewPasswordInput, container: this.container };
  }

  public async submitFormWithValidEmail() {
    const { emailInput } = this.getResetPasswordControls();
    await emailInput.type(correctEmail);
    await this.resetPasswordButton.click();
  }

  public async clearAndFillNewPassword(password: string) {
    const { newPasswordInput } = this.getChangePasswordControls();
    await newPasswordInput.clear();
    await newPasswordInput.type(password);
  }

  public async submitChangePasswordFormWithValidData() {
    const { newPasswordInput, repeatNewPasswordInput, codeInput } =
      this.getChangePasswordControls();
    await codeInput.type(validCode);
    await newPasswordInput.type(validPassword);
    await repeatNewPasswordInput.type(validPassword);
    await this.changePasswordButton.click();
  }

  public async fillChangePasswordFormWithCorrectPassword() {
    const { newPasswordInput, repeatNewPasswordInput } = this.getChangePasswordControls();
    await newPasswordInput.type(validPassword);
    await repeatNewPasswordInput.type(validPassword);
  }

  get resetPasswordButton() {
    return ButtonHandle.fromRole(this.container, 'Reset my password');
  }

  get changePasswordButton() {
    return ButtonHandle.fromRole(this.container, 'Change password');
  }
}
