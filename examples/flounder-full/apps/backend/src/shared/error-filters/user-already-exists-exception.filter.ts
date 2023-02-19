import { ArgumentsHost, Catch, ConflictException, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { CognitoUserAlreadyExistsException } from "../errors/cognito-user-already-exists.exception";

@Catch(CognitoUserAlreadyExistsException)
export class UserAlreadyExistsExceptionFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    super.catch(new ConflictException(exception.message), host);
  }
}
