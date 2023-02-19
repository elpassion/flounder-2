import {
  CreateEmailSubscriptionDto,
  EmailSubscriptionDto,
  FeatureFlagsEnum,
  UpdateUserDto,
} from '@flounder/contracts';
import { useHttpClient } from './HttpClient.context';

interface UseApiHookType {
  resendMail: (eventId: number) => Promise<void>;
  signUpToNewsletter: (data: CreateEmailSubscriptionDto) => Promise<EmailSubscriptionDto>;
  blockUser: (id: string) => Promise<void>;
  unblockUser: (id: string) => Promise<void>;
  changeFeatureState: (name: FeatureFlagsEnum, isActive: boolean) => Promise<void>;
  addToGroup: (userId: string, groupName: string) => Promise<void>;
  removeFromGroup: (userId: string, groupName: string) => Promise<void>;
  updateUser: (userId: string, userData: UpdateUserDto) => Promise<void>;
  updateUserDescription: (id: string, description: string) => Promise<void>;
}

export const useApi = (): UseApiHookType => {
  const { httpClient } = useHttpClient();
  const emailSubscriptionBaseUrl = '/api/email-subscriptions';

  const resendMail = (eventId: number): Promise<void> => {
    return httpClient.post('/api/mailer/resend', { eventId });
  };
  const signUpToNewsletter = async (
    data: CreateEmailSubscriptionDto,
  ): Promise<EmailSubscriptionDto> => {
    return httpClient.post(emailSubscriptionBaseUrl, data);
  };
  const blockUser = async (id: string): Promise<void> => {
    return httpClient.put(`/api/admin/users/${id}/block`, {});
  };
  const unblockUser = async (id: string): Promise<void> => {
    return httpClient.delete(`/api/admin/users/${id}/block`);
  };
  const addToGroup = async (userId: string, groupName: string): Promise<void> => {
    return httpClient.put(`/api/admin/users/${userId}/memberships/${groupName}`, {});
  };
  const removeFromGroup = async (userId: string, groupName: string): Promise<void> => {
    return httpClient.delete(`/api/admin/users/${userId}/memberships/${groupName}`);
  };
  const changeFeatureState = async (name: FeatureFlagsEnum, isActive: boolean): Promise<void> => {
    return httpClient.put('api/admin/feature-flags', { name: name, isActive: isActive });
  };

  const updateUser = async (userId: string, userData: UpdateUserDto): Promise<void> => {
    return httpClient.patch(`api/admin/users/${userId}`, userData);
  };

  const updateUserDescription = async (id: string, description: string): Promise<void> => {
    return httpClient.put(`/api/admin/users/${id}/description`, { description });
  };

  return {
    resendMail,
    signUpToNewsletter,
    blockUser,
    unblockUser,
    changeFeatureState,
    addToGroup,
    removeFromGroup,
    updateUserDescription,
    updateUser,
  };
};
