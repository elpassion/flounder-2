import { Input } from '@pankod/refine-antd';
import { useFieldContext } from '../Form';
import { Form } from '../index';

export const PasswordInputField = () => {
  const { field } = useFieldContext();
  return (
    <>
      <Input type="password" size="large" {...field} />
      <Form.MultipleErrorsMessageWithStatus />
    </>
  );
};
