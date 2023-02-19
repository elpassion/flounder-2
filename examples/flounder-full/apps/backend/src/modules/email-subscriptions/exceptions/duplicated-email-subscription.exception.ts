import { HttpStatus } from '@nestjs/common';
import { TranslatedHttpException } from '../../../shared/errors/translated-http.exception';

export class DuplicatedEmailSubscriptionException extends TranslatedHttpException {
  translationKey = 'errors.EMAIL_SUBSCRIPTION.DUPLICATED';

  constructor() {
    super('Duplicated Email Subscription', HttpStatus.CONFLICT);
  }
  
}
