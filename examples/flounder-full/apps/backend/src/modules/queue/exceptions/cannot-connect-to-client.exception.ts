import { HttpStatus } from '@nestjs/common';
import { TranslatedHttpException } from '../../../shared/errors/translated-http.exception';

export class CannotConnectToClientException extends TranslatedHttpException {
  translationKey = 'errors.QUEUE.CANNOT_CONNECT_TO_CLIENT';

  constructor() {
    super('Cannot connect to client', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
