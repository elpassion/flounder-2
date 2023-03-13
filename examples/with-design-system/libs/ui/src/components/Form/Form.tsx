import { Button } from '../Button';
import { FieldError } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';

export interface FormProps {
  onSubmit(): void;
  children: JSX.Element | JSX.Element[];
  globalError?: FieldError;
  submitButton?: JSX.Element;
}

export function Form({
  onSubmit,
  children,
  globalError,
  submitButton,
}: FormProps) {
  return (
    <form
      className="space-y-6 divide-y divide-gray-200 mb-2"
      onSubmit={onSubmit}
    >
      <div className="space-y-4 divide-y divide-gray-200">
        {children}
        {submitButton ? (
          submitButton
        ) : (
          <div className="w-fit ml-auto">
            <Button type="submit" variant="secondary">
              Submit
            </Button>
          </div>
        )}
        <div className="flex justify-center">
          {globalError ? <ErrorMessage error={globalError} /> : null}
        </div>
      </div>
    </form>
  );
}
