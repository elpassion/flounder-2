import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetUserDto, SignUpDto } from '@flounder/contracts';
import { AuthApi } from './AuthApi';

export const userAuthApi = () => {
  const authApi = new AuthApi();

  const useRegisterAccount = ({
    onSuccess,
    onError,
  }: UseMutationOptions<GetUserDto, AxiosError, SignUpDto> = {}) =>
    useMutation<GetUserDto, AxiosError, SignUpDto>(data => authApi.signUp(data), {
      onSuccess,
      onError,
    });

  return {
    useRegisterAccount,
  };
};
