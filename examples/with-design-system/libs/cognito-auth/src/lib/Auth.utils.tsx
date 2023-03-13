import {
  CognitoAppErrorMessages,
  CognitoContext,
  CognitoError,
  CognitoErrorCode,
} from './Auth.interface';

export function isCognitoError(error: unknown): error is CognitoError {
  return (
    (error as CognitoError).code !== undefined && (error as CognitoError).message !== undefined
  );
}

interface CognitoErrorTextOptions {
  errorContext?: CognitoContext;
  generalErrorText?: string;
}

export function getCognitoErrorText(error: unknown, options?: CognitoErrorTextOptions): string {
  if (!isCognitoError(error)) return options?.generalErrorText || CognitoAppErrorMessages.General;

  const generalErrorText =
    options?.generalErrorText || error.message || CognitoAppErrorMessages.General;

  switch (error.code) {
    case CognitoErrorCode.UserNotConfirmedException:
      return CognitoAppErrorMessages.UserNotConfirmed;
    case CognitoErrorCode.NotAuthorizedException:
      return CognitoAppErrorMessages.InvalidUserOrPassword;
    case CognitoErrorCode.CodeMismatchException:
      return CognitoAppErrorMessages.CodeMismatchException;
    case CognitoErrorCode.ExpiredCodeException:
      return CognitoAppErrorMessages.ExpiredCodeException;
    case CognitoErrorCode.InvalidParameterException:
      if (options?.errorContext === CognitoContext.ResetPassword) {
        return CognitoAppErrorMessages.UserNotConfirmed;
      }
      return generalErrorText;
    default:
      return generalErrorText;
  }
}
