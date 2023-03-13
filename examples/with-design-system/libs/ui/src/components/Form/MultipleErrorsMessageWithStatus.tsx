import { Message } from 'react-hook-form';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';

export interface MultipleErrorsMessageWithStatusProps {
  fieldName: string;
  errorMessages: Message[];
}

interface ResultLineProps {
  message: string;
  isValid: boolean;
  fieldName: string;
}

const ResultLine = ({ message, isValid, fieldName }: ResultLineProps) => {
  const Icon = isValid ? CheckCircleIcon : XCircleIcon;
  const messageColor = isValid ? 'text-green-400' : 'text-red-400';

  return (
    <li
      className={`${messageColor} flex items-start leading-6`}
      data-testid={`${fieldName}-${message}`}
    >
      <p className="h-5 flex shrink-0 grow-0 items-center pt-0.5">
        <Icon className="w-4 h-4 mr-2" />
      </p>
      <span className="text-sm">{message}</span>
    </li>
  );
};

export function MultipleErrorsMessageWithStatus({
  errorMessages,
  fieldName,
}: MultipleErrorsMessageWithStatusProps) {
  const validationResultsList = errorMessages.map((message) => {
    const resultLineKey = `${fieldName}-${message}`;
    return (
      <ResultLine
        key={resultLineKey}
        message={message}
        isValid={!message}
        fieldName={fieldName}
      />
    );
  });

  return <ul className="my-2">{validationResultsList}</ul>;
}
