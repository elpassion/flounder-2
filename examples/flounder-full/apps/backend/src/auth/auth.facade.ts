import { ListGroupsCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
import { Injectable } from '@nestjs/common';
import { CognitoAdapter } from './cognito/cognito.adapter';
import { CognitoGetUserResponses } from './interfaces/cognito-get-user-responses';

@Injectable()
export class AuthFacade {
  constructor(private readonly cognitoAdapter: CognitoAdapter) {}


  async signUp(email: string, password: string): Promise<string> {
    const cognitoUser = await this.cognitoAdapter.signUp(email, password);

    if (!cognitoUser?.UserSub) {
      throw new Error('No cognito id')
    }

    return cognitoUser.UserSub;
  }

  getGroups(): Promise<ListGroupsCommandOutput> {
    return this.cognitoAdapter.getGroups();
  }

  getUserById(id: string): Promise<CognitoGetUserResponses> {
    return this.cognitoAdapter.getUserById(id);
  }

  updateUserEmail(id: string, email: string): Promise<void> {
    return this.cognitoAdapter.updateUserEmail(id, email);
  }

  blockUser(id: string): Promise<void> {
    return this.cognitoAdapter.blockUser(id);
  }

  unblockUser(id: string): Promise<void> {
    return this.cognitoAdapter.unblockUser(id);
  }

  addUserToGroup(id: string, groupName: string): Promise<void> {
    return this.cognitoAdapter.addUserToGroup(id, groupName);
  }

  removeUserFromGroup(id: string, groupName: string): Promise<void> {
    return this.cognitoAdapter.removeUserFromGroup(id, groupName);
  }
}
