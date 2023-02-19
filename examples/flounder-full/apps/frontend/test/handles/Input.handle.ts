import { getByLabelText, getByPlaceholderText, getByRole, Matcher } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

export class InputHandle {
  constructor(readonly inputElement: HTMLInputElement) {}

  static fromRole(container: HTMLElement, name: string): InputHandle {
    return new InputHandle(getByRole(container, 'input', { name }));
  }
  static fromLabelText(container: HTMLElement, value: Matcher): InputHandle {
    return new InputHandle(getByLabelText(container, value));
  }

  static fromPlaceholderText(container: HTMLElement, value: Matcher): InputHandle {
    return new InputHandle(getByPlaceholderText(container, value));
  }

  get value() {
    return this.inputElement.value;
  }
  clear() {
    this.inputElement.value = '';
  }
  async type(value: string) {
    await userEvent.type(this.inputElement, value);
  }
}
