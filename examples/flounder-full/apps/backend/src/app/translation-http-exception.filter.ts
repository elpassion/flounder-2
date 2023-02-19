import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { getI18nContextFromArgumentsHost } from 'nestjs-i18n';
import { TranslatedHttpException } from '../shared/errors/translated-http.exception';

@Catch(TranslatedHttpException)
export class TranslationHttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: TranslatedHttpException, host: ArgumentsHost) {
    const i18n = getI18nContextFromArgumentsHost(host);

    super.catch(
      new HttpException(
        i18n.t(exception.translationKey) || exception.message,
        exception.getStatus(),
      ),
      host,
    );
  }
}
