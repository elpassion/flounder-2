import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { CreateEmailSubscriptionDto, EmailSubscriptionDto } from '@flounder/contracts';
import { NewsletterApi } from '../../Api';

export const useNewsletter = () => {
  const newsletterApi = new NewsletterApi();

  const useSignUp = ({
    onSuccess,
    onError,
  }: UseMutationOptions<EmailSubscriptionDto, Error, CreateEmailSubscriptionDto> = {}) =>
    useMutation<EmailSubscriptionDto, Error, CreateEmailSubscriptionDto>(
      data => newsletterApi.signUpToNewsletter(data),
      {
        onSuccess,
        onError,
      },
    );

  return {
    useSignUp,
  };
};
