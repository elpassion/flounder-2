import { getAllByText } from '@testing-library/dom';
import { getByText } from '@testing-library/react';
import { exampleUser } from '@flounder/contracts';
import { ButtonHandle, InputHandle } from '../../../../test/handles';
import { RenderContext } from '../../../../test/RenderContext';
import { UserChangePassword } from '../UserChangePassword';

describe(UserChangePassword.name, () => {
  it('should render user change password form', async () => {
    // When
    const page = new UserChangePasswordPageObject().render();

    // Then
    const { oldPasswordInput, newPasswordInput, repeatNewPasswordInput } = page.getControls();
    expect(oldPasswordInput.inputElement).toBeInTheDocument();
    expect(newPasswordInput.inputElement).toBeInTheDocument();
    expect(repeatNewPasswordInput.inputElement).toBeInTheDocument();
  });

  it('should display error message because fields are empty', async () => {
    // Given
    const page = new UserChangePasswordPageObject().render();

    // When
    await page.submitButton.click();

    // Then
    expect(getAllByText(page.container, 'You have to provide password')).toHaveLength(3);
  });

  it('should display error if a new password is too short', async () => {
    // Given
    const page = new UserChangePasswordPageObject().render();
    const { newPasswordInput } = page.getControls();

    await newPasswordInput.type('123');

    // When
    await page.submitButton.click();

    // Then
    expect(getByText(page.container, 'Min 6 chars')).toBeInTheDocument();
  });
});

class UserChangePasswordPageObject {
  constructor() {
    this.context.setAuthenticatedAs(exampleUser);
  }

  public context = new RenderContext();
  public container!: HTMLElement;

  public render = () => {
    const renderResult = this.context.render(<UserChangePassword />);
    this.container = renderResult.container;
    return this;
  };

  public getControls() {
    const oldPasswordInput = InputHandle.fromLabelText(this.container, /^Old password:$/);
    const newPasswordInput = InputHandle.fromLabelText(this.container, /^New password:$/);
    const repeatNewPasswordInput = InputHandle.fromLabelText(
      this.container,
      /^Repeat new password:$/,
    );

    return {
      oldPasswordInput,
      newPasswordInput,
      repeatNewPasswordInput,
      container: this.container,
    };
  }
  get submitButton() {
    return ButtonHandle.fromRole(this.container, 'Change my password');
  }
}
