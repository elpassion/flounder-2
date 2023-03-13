import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { TGetUser, TSignUp } from '@flounder/contracts';
import { AuthApi } from './AuthApi';

export const userAuthApi = () => {
  const authApi = new AuthApi();

  const useRegisterAccount = ({
    onSuccess,
    onError,
  }: UseMutationOptions<TGetUser, AxiosError, TSignUp> = {}) =>
    useMutation<TGetUser, AxiosError, TSignUp>(data => authApi.signUp(data), {
      onSuccess,
      onError,
    });

  return {
    useRegisterAccount,
  };
};
