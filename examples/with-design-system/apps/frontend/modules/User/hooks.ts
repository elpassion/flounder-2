import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { TUpsertUser, TExtendedUser } from '@flounder/contracts';
import { UserApi } from '@flounder/shared-apis';
import { queryKeys } from 'utils/queryKeys';

export const useUsers = () => {
  const userApi = new UserApi();
  const queryClient = useQueryClient();

  const useUsersQuery = () =>
    useQuery(queryKeys.users.all.queryKey, async () => await userApi.getUsers(), {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  const useUsersMutation = ({
    onSuccess,
    onError,
  }: UseMutationOptions<TExtendedUser, AxiosError, TUpsertUser> = {}) =>
    useMutation<TExtendedUser, AxiosError, TUpsertUser>(() => userApi.createUser(), {
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
