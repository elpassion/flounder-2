import {
  AdminGetUserCommandOutput,
  AdminListGroupsForUserCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';

export interface CognitoGetUserResponses {
  cognitoResponse: AdminGetUserCommandOutput;
  cognitoGroupResponse: AdminListGroupsForUserCommandOutput;
}
