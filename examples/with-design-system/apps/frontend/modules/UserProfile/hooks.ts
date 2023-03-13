import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAuth } from '@flounder/cognito-auth';
import { TExtendedUser, TUpdateUser } from '@flounder/contracts';
import { UserApi } from '@flounder/shared-apis';
import { queryKeys } from 'utils/queryKeys';

interface IUpdateUserVariables {
  data: TUpdateUser;
  userId: string;
}

export const useUserProfile = () => {
  const { currentUser } = useAuth();
  const userApi = new UserApi();
  const queryClient = useQueryClient();

  const id = currentUser?.cognito_id || '';

  const useUserProfileQuery = () =>
    useQuery<TExtendedUser>(
      queryKeys.users.currentUser(id).queryKey,
      async () => await userApi.getCurrentUser(),
      {
        refetchOnMount: false,
      },
    );

  const useUserProfileMutationQuery = ({
    onSuccess,
    onError,
  }: UseMutationOptions<TUpdateUser, AxiosError, IUpdateUserVariables> = {}) =>
    useMutation<TUpdateUser, AxiosError, IUpdateUserVariables>(
      ({ userId, data }) => userApi.updateUser(userId, data),
      {
        onSuccess: (data, ...args) => {
          void queryClient.invalidateQueries(queryKeys.users.currentUser(id).queryKey);
          void queryClient.refetchQueries(queryKeys.users.currentUser(id).queryKey);
          onSuccess?.(data, ...args);
        },
        onError,
      },
    );

  return {
    useUserProfileQuery,
    useUserProfileMutationQuery,
  };
};
