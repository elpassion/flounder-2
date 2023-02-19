import { IMessagefulError } from "../../../shared/errors/messageful-error.interface";
import { ResourceNotFoundError } from "../../../shared/errors/resource-not-found.error";

export class UserNotFoundError extends ResourceNotFoundError {
  static throwOrSkip(err: unknown) {
    if (UserNotFoundError.isMessagefulError(err)) {
      throw new UserNotFoundError(err.message);
    }
  }

  private static isMessagefulError(error: unknown): error is IMessagefulError {
    if (typeof error !== 'object') return false;
    if (!error) return false;

    return 'name' in error && 'message' in error;
  }
}
