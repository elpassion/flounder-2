import { Injectable } from '@nestjs/common';
import { GetCognitoUserDto, GetUserDto } from '@flounder/contracts';
import { ResourceNotFoundError } from '../../shared/errors/resource-not-found.error';
import { AuthFacade } from '../../auth/auth.facade';
import { UsersFacade } from '../users/users.facade';

@Injectable()
export class AdminFacade {
  constructor(private readonly authFacade: AuthFacade, private readonly usersFacade: UsersFacade) {}

  async getGroups(): Promise<Array<string>> {
    const rawGroups = await this.authFacade.getGroups();
    if (!rawGroups || !rawGroups.Groups) throw new ResourceNotFoundError('No groups found');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return rawGroups.Groups.map(group => group.GroupName!);
  }

  async getUserById(id: string): Promise<GetCognitoUserDto> {
    const { cognitoResponse, cognitoGroupResponse } = await this.authFacade.getUserById(id);
    const attributes = (cognitoResponse.UserAttributes || []).reduce((acc, attribute) => {
      if (!attribute.Name || !attribute.Value) return acc;
      return { ...acc, [attribute.Name]: attribute.Value };
    }, {} as { [key: string]: string });

    return {
      id: cognitoResponse.Username,
      mfa_setting: cognitoResponse.PreferredMfaSetting,
      mfa_methods: cognitoResponse.UserMFASettingList,
      enabled: cognitoResponse.Enabled,
      status: cognitoResponse.UserStatus,
      created_at: cognitoResponse.UserCreateDate,
      updated_at: cognitoResponse.UserLastModifiedDate,
      attributes,
      groups: (cognitoGroupResponse.Groups || []).map(group => group.GroupName),
    };
  }

  blockUser(id: string): Promise<void> {
    return this.authFacade.blockUser(id);
  }

  unblockUser(id: string): Promise<void> {
    return this.authFacade.unblockUser(id);
  }

  addUserToGroup(id: string, groupName: string): Promise<void> {
    return this.authFacade.addUserToGroup(id, groupName);
  }

  removeUserFromGroup(id: string, groupName: string): Promise<void> {
    return this.authFacade.removeUserFromGroup(id, groupName);
  }

  updateUserDescription(id: string, description: string): Promise<GetUserDto> {
    return this.usersFacade.update(id, { description });
  }
}
