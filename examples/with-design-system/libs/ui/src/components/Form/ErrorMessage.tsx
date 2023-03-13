import classNames from 'classnames';

export interface ErrorMessageProps {
  error?: { message?: string };
  className?: string;
}

// @todo: Check, but seems okay
export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <p
      className={classNames(
        'text-red-500 mt-0.5 text-sm empty:hidden',
        classNames
      )}
      role="alert"
    >
      {error ? error.message : ''}
    </p>
  );
}
