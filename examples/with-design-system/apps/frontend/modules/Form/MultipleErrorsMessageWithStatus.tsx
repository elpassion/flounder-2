import { Message } from 'react-hook-form';
import { MultipleErrorsMessageWithStatus as MultiErrors } from '@flounder/ui';
import { useFieldContext } from './Field';

export function MultipleErrorsMessageWithStatus() {
  const {
    fieldState,
    field: { name },
  } = useFieldContext();
  const { error } = fieldState;

  if (!error?.types) return null;

  const validationResults = Object.values(error.types) as Message[];

  return <MultiErrors fieldName={name} errorMessages={validationResults.flat()} />;
}
