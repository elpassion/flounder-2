import { ICognitoClientError } from './cognito-client-error.interface';

export class CognitoClientError extends Error {
  static fromCognitoClientSdkError(error: ICognitoClientError) {
    return new CognitoClientError(`${error.name} : ${error.message}`);
  }
}
