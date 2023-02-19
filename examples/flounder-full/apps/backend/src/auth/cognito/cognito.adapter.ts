import { Injectable } from '@nestjs/common';
import { CognitoConfig } from './cognito.config';
import {
  CognitoIdentityProviderClient,
  AdminDisableUserCommand,
  AdminEnableUserCommand,
  AdminAddUserToGroupCommand,
  AdminRemoveUserFromGroupCommand,
  AdminGetUserCommand,
  AdminListGroupsForUserCommand,
  AdminUpdateUserAttributesCommand,
  ListGroupsCommand,
  ListGroupsCommandOutput,
  SignUpCommand,
  SignUpCommandOutput,
  UsernameExistsException,
} from '@aws-sdk/client-cognito-identity-provider';
import { ICognitoClientError } from './errors/cognito-client-error.interface';
import { CognitoClientError } from './errors/cognito-client.error';
import { UserNotFoundError } from './errors/user-not-found.error';
import { CognitoGetUserResponses } from '../interfaces/cognito-get-user-responses';
import { ResourceNotFoundError } from '../../shared/errors/resource-not-found.error';
import { CognitoUserAlreadyExistsException } from "../../shared/errors/cognito-user-already-exists.exception";

@Injectable()
export class CognitoAdapter {
  private readonly identityProvider: CognitoIdentityProviderClient;

  constructor(private readonly config: CognitoConfig) {
    this.identityProvider = new CognitoIdentityProviderClient({});
  }

  async signUp(email: string, password: string): Promise<SignUpCommandOutput> {
    const createUserCommand = new SignUpCommand({
      ClientId: this.config.publicApiClientId,
      Username: email,
      Password: password,
    });

    try {
      return await this.identityProvider.send(createUserCommand);
    } catch (error) {
      this.handleError(error)
    }
  }

  async getGroups(): Promise<ListGroupsCommandOutput> {
    const command = new ListGroupsCommand({
      UserPoolId: this.config.publicUserPoolId,
    });

    try {
      return await this.identityProvider.send(command);
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  async getUserById(id: string): Promise<CognitoGetUserResponses> {
    const command = new AdminGetUserCommand({
      Username: id,
      UserPoolId: this.config.publicUserPoolId,
    });
    const groupCommand = new AdminListGroupsForUserCommand({
      Username: id,
      UserPoolId: this.config.publicUserPoolId,
    });
    try {
      const cognitoResponse = await this.identityProvider.send(command);
      const cognitoGroupResponse = await this.identityProvider.send(groupCommand);
      return { cognitoResponse, cognitoGroupResponse };
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  async updateUserEmail(id: string, email: string) {
    const command = new AdminUpdateUserAttributesCommand({
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
      ],
      Username: id,
      UserPoolId: this.config.publicUserPoolId,
    });
    try {
      await this.identityProvider.send(command);
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  async blockUser(id: string) {
    const command = new AdminDisableUserCommand({
      Username: id,
      UserPoolId: this.config.publicUserPoolId,
    });
    try {
      await this.identityProvider.send(command);
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  async unblockUser(id: string) {
    const command = new AdminEnableUserCommand({
      Username: id,
      UserPoolId: this.config.publicUserPoolId,
    });
    try {
      await this.identityProvider.send(command);
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  async addUserToGroup(id: string, groupName: string) {
    const command = new AdminAddUserToGroupCommand({
      GroupName: groupName,
      Username: id,
      UserPoolId: this.config.publicUserPoolId,
    });
    try {
      await this.identityProvider.send(command);
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  async removeUserFromGroup(id: string, groupName: string) {
    const command = new AdminRemoveUserFromGroupCommand({
      GroupName: groupName,
      Username: id,
      UserPoolId: this.config.publicUserPoolId,
    });
    try {
      await this.identityProvider.send(command);
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): never {
    if (this.isCognitoError(error)) {
      if (error.name === 'UserNotFoundException') throw new UserNotFoundError();
      if (error.name === 'ResourceNotFoundException') throw new ResourceNotFoundError();
      if (error instanceof UsernameExistsException) throw new CognitoUserAlreadyExistsException('User with given email already exists.');
      throw CognitoClientError.fromCognitoClientSdkError(error);
    }
    throw error;
  }

  private isCognitoError(error: unknown): error is ICognitoClientError {
    if (typeof error !== 'object') return false;
    if (!error) return false;

    return (
      '$metadata' in error &&
      '$fault' in error &&
      (error as { $fault: 'client' | 'server' })['$fault'] === 'client'
    );
  }
}
