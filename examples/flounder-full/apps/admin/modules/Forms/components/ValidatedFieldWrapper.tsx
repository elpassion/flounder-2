import { ReactNode } from 'react';
import { ValidationErrorsMessages } from './ValidationErrorsMessages';

export const ValidatedFieldWrapper = ({
  children,
  fieldErrors,
  formFieldName,
}: {
  children: ReactNode;
  fieldErrors: string[];
  formFieldName: string;
}) => (
  <div>
    {children}
    <ValidationErrorsMessages errorsArray={fieldErrors} formFieldName={formFieldName} />
  </div>
);
