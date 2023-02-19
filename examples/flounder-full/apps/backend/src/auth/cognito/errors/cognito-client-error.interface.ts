import { ResponseMetadata } from '@aws-sdk/types';

export interface ICognitoClientError {
  $metadata: ResponseMetadata;
  name: string;
  message?: string;
}
