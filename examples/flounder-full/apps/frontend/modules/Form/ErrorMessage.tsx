import { ErrorMessage as Error } from '@flounder/ui';
import { useFieldContext } from './Field';

export function ErrorMessage() {
  const {
    fieldState: { error },
  } = useFieldContext();
  return <Error error={error} />;
}
