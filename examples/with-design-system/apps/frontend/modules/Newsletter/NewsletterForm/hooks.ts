import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { TCreateEmailSubscription, TEmailSubscription } from '@flounder/contracts';
import { NewsletterApi } from '../../Api';

export const useNewsletter = () => {
  const newsletterApi = new NewsletterApi();

  const useSignUp = ({
    onSuccess,
    onError,
  }: UseMutationOptions<TEmailSubscription, Error, TCreateEmailSubscription> = {}) =>
    useMutation<TEmailSubscription, Error, TCreateEmailSubscription>(
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
