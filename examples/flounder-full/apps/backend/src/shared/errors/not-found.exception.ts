import { TranslatedHttpException } from './translated-http.exception';

export class NotFoundException extends TranslatedHttpException {
  translationKey = 'errors.NOT_FOUND.RESOURCE';
}
