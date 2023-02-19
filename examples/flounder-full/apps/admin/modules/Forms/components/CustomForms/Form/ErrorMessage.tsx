import { useFieldContext } from './Field';

export function ErrorMessage() {
  const {
    fieldState: { error },
  } = useFieldContext();
  return (
    <p style={{ color: 'red', height: 14 }} role="note">
      {error ? error.message : ''}
    </p>
  );
}
