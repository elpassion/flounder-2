import { FieldError } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';
import { SubmitButton } from './SubmitButton';

export interface FormProps {
  onSubmit(): void;
  children: JSX.Element | JSX.Element[];
  globalError?: FieldError;
  submitButtonText?: string;
  submitButtonFullWidth?: boolean;
}

export function Form({
  onSubmit,
  children,
  globalError,
  submitButtonText,
}: FormProps) {
  return (
    <form className="space-y-8 divide-y divide-gray-200" onSubmit={onSubmit}>
      <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
        {children}
        <div className="pt-5 flex justify-end">
          <SubmitButton text={submitButtonText} />
        </div>
        <div className="flex justify-center">
          {globalError ? <ErrorMessage error={globalError} /> : null}
        </div>
      </div>
    </form>
  );
}
