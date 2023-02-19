import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UpsertUserDto, ExtendedUserDto } from '@flounder/contracts';
import { UserApi } from '@flounder/shared-apis';

export const useUsers = () => {
  const userApi = new UserApi();
  const queryClient = useQueryClient();

  const useUsersQuery = () =>
    useQuery(['users'], async () => await userApi.getUsers(), {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  const useUsersMutation = ({
    onSuccess,
    onError,
  }: UseMutationOptions<ExtendedUserDto, AxiosError, UpsertUserDto> = {}) =>
    useMutation<ExtendedUserDto, AxiosError, UpsertUserDto>(() => userApi.createUser(), {
      onSuccess: (...args) => {
        void queryClient.invalidateQueries(['users']);
        onSuccess?.(...args);
      },
      onError,
    });

  return {
    useUsersQuery,
    useUsersMutation,
  };
};
