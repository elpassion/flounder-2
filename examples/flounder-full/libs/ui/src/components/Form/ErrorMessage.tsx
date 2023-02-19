export interface ErrorMessageProps {
  error?: { message?: string };
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return <p className="text-red-500 m-h-2 mt-2" role="note">{error ? error.message : ''}</p>;
}
