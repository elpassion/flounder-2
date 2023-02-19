import {
  getByDisplayValue,
  getByRole,
  getByTestId,
  getByText,
  Matcher,
} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

export class ButtonHandle {
  constructor(public readonly buttonElement: HTMLButtonElement) {}

  static fromRole(container: HTMLElement, name: string): ButtonHandle {
    return new ButtonHandle(getByRole(container, 'button', { name }));
  }
  static fromDisplayValue(container: HTMLElement, value: Matcher): ButtonHandle {
    return new ButtonHandle(getByText(container, value));
  }
  static fromTestId(container: HTMLElement, testId: string): ButtonHandle {
    return new ButtonHandle(getByTestId(container, testId));
  }

  async click() {
    await userEvent.click(this.buttonElement);
  }
}
