import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { MailExampleDto } from '@flounder/contracts';
import { EmailApi } from '../../Api';

export const useSendMailTemplate = () => {
  const emailApi = new EmailApi();

  const useSendEmail = ({
    onSuccess,
    onError,
  }: UseMutationOptions<MailExampleDto, Error, MailExampleDto> = {}) =>
    useMutation<MailExampleDto, Error, MailExampleDto>(data => emailApi.sendExampleEmail(data), {
      onSuccess,
      onError,
    });

  return {
    useSendEmail,
  };
};
