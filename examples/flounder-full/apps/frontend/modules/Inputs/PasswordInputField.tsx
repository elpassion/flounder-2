import { MultipleErrorsMessageWithStatus } from 'modules/Form';
import { TextInputField } from './TextInputField';

export const PasswordInputField = () => {
  return (
    <>
      <TextInputField type="password" />
      <MultipleErrorsMessageWithStatus />
    </>
  );
};
