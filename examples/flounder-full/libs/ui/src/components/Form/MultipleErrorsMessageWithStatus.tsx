import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import { Message } from 'react-hook-form';

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
      <div className={'h-6 flex shrink-0 grow-0 items-center'}>
        <Icon className={'w-5 h-5 mr-2'} />
      </div>
      <span>{message}</span>
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

  return <ul className="m-h-2 mt-2">{validationResultsList}</ul>;
}
