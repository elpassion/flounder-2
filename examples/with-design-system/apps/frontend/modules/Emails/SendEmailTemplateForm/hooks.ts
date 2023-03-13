import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { TMailExample } from '@flounder/contracts';
import { EmailApi } from '../../Api';

export const useSendMailTemplate = () => {
  const emailApi = new EmailApi();

  const useSendEmail = ({
    onSuccess,
    onError,
  }: UseMutationOptions<TMailExample, Error, TMailExample> = {}) =>
    useMutation<TMailExample, Error, TMailExample>(data => emailApi.sendExampleEmail(data), {
      onSuccess,
      onError,
    });

  return {
    useSendEmail,
  };
};
