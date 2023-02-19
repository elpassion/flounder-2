import React from 'react';
import { findByText } from '@testing-library/dom';
import { findByTestId } from '@testing-library/react';
import { editedExampleUser, exampleUser } from '@flounder/contracts';
import {
  handlersWithEditedUserData,
  handlersWithUnexpectedError,
} from 'modules/UserProfile/handlers';
import { ButtonHandle, InputHandle } from 'test/handles';
import { RenderContext } from 'test/RenderContext';
import { UserProfilePage } from '../UserProfilePage';

describe(UserProfilePage.name, () => {
  it('should render user profile data returned from api/users/me', async () => {
    // When
    const { container } = new UserProfilePageObject().render();

    // Then
    await findByText(container, exampleUser.email);
    expect(await findByText(container, exampleUser.first_name)).toBeInTheDocument();
    expect(await findByText(container, exampleUser.last_name)).toBeInTheDocument();
  });

  it('should open modal after click in + button', async () => {
    // Given
    const page = new UserProfilePageObject().render();

    // When
    await page.plusButton.click();

    // Then
    const { userEditModal } = await page.getControls();
    expect(userEditModal).toBeInTheDocument();
  });

  it('should open modal after click in EditButton and display proper user data', async () => {
    // Given
    const page = new UserProfilePageObject().render();

    // When
    await page.editPersonalDataButton.click();

    // Then
    const { firstNameInput, lastNameInput } = await page.getControls();
    expect(firstNameInput.value).toEqual(exampleUser.first_name);
    expect(lastNameInput.value).toEqual(exampleUser.last_name);
  });

  it('should edit user data', async () => {
    // Given
    const page = new UserProfilePageObject().render();
    await page.editPersonalDataButton.click();

    const { firstNameInput, lastNameInput } = await page.getControls();
    firstNameInput.clear();
    lastNameInput.clear();

    await firstNameInput.type(editedExampleUser.first_name);
    await lastNameInput.type(editedExampleUser.last_name);

    page.withEditedUserDataHandlers();

    // When
    await page.submitButton.click();

    // Then
    expect(await findByText(page.container, editedExampleUser.first_name)).toBeInTheDocument();
    expect(await findByText(page.container, editedExampleUser.last_name)).toBeInTheDocument();
  });

  it('should display error message', async () => {
    // Given
    const page = new UserProfilePageObject().withUnexpectedResponse().render();
    await page.editPersonalDataButton.click();

    const { firstNameInput } = await page.getControls();
    firstNameInput.clear();
    await firstNameInput.type(editedExampleUser.first_name);

    // When
    await page.submitButton.click();

    // Then
    expect(
      await findByText(
        document.body,
        /Oops. We cannot handle your request right now. Try again later/i,
      ),
    ).toBeInTheDocument();
  });
});

class UserProfilePageObject {
  constructor() {
    this.context.setAuthenticatedAs(exampleUser);
  }

  public context = new RenderContext();
  public container!: HTMLElement;

  public async getControls() {
    const firstNameInput = InputHandle.fromLabelText(document.body, /^First name$/);
    const lastNameInput = InputHandle.fromLabelText(document.body, /^Last name$/);
    const userEditModal = await findByTestId(document.body, 'user-profile-modal');

    return { lastNameInput, firstNameInput, userEditModal, container: this.container };
  }

  public render = () => {
    const renderResult = this.context.render(<UserProfilePage />);
    this.container = renderResult.container;
    return this;
  };

  public withEditedUserDataHandlers = () => {
    this.context.setAuthenticatedAs(editedExampleUser);
    this.context.server.resetHandlers(...handlersWithEditedUserData);
    return this;
  };

  public withUnexpectedResponse() {
    this.context.server.resetHandlers(...handlersWithUnexpectedError);
    return this;
  }

  get editPersonalDataButton() {
    return ButtonHandle.fromRole(this.container, 'Edit personal data');
  }

  get plusButton() {
    return ButtonHandle.fromRole(this.container, '+');
  }

  get submitButton() {
    return ButtonHandle.fromRole(document.body, 'Submit');
  }
}
