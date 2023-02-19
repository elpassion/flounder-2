import { S3ClientError } from '@flounder/storage';
import {
  ArgumentsHost,
  BadGatewayException,
  Catch,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { CognitoClientError } from '../auth/cognito/errors/cognito-client.error';
import { ResourceNotFoundError } from '../shared/errors/resource-not-found.error';

export type ErrorType = ResourceNotFoundError | CognitoClientError | S3ClientError;

@Catch(ResourceNotFoundError, CognitoClientError, S3ClientError)
export class ExceptionHandler extends BaseExceptionFilter {
  catch(exception: ErrorType, host: ArgumentsHost) {
    if (exception instanceof ResourceNotFoundError) {
      super.catch(new NotFoundException(HttpStatus.NOT_FOUND), host);
    }

    if (exception instanceof CognitoClientError || exception instanceof S3ClientError) {
      super.catch(new BadGatewayException(HttpStatus.BAD_GATEWAY), host);
    }
  }
}
