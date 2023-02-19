import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ExtendedUserDto, UpdateUserDto } from '@flounder/contracts';
import { UserApi } from '@flounder/shared-apis';

interface IUpdateUserVariables {
  data: UpdateUserDto;
  userId: string;
}

export const useUserProfile = () => {
  const userApi = new UserApi();
  const queryClient = useQueryClient();

  const useUserProfileQuery = () =>
    useQuery<ExtendedUserDto>(['userProfile'], async () => await userApi.getCurrentUser(), {
      refetchOnMount: false,
    });

  const useUserProfileMutationQuery = ({
    onSuccess,
    onError,
  }: UseMutationOptions<UpdateUserDto, AxiosError, IUpdateUserVariables> = {}) =>
    useMutation<UpdateUserDto, AxiosError, IUpdateUserVariables>(
      ({ userId, data }) => userApi.updateUser(userId, data),
      {
        onSuccess: (data, ...args) => {
          void queryClient.invalidateQueries(['userProfile']);
          void queryClient.refetchQueries(['me_once']);
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
