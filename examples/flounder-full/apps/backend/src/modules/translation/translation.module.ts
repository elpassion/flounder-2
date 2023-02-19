import { Module } from '@nestjs/common';
import * as path from 'path';
import { AcceptLanguageResolver, CookieResolver, I18nJsonLoader, I18nModule } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
import { NodeEnvironment } from '../../shared/common/configuration/node-environment';

@Module({
  imports: [
    I18nModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get('NODE_ENV') as NodeEnvironment;
        const translationsPath =
          nodeEnv === NodeEnvironment.Test
            ? path.join(__dirname, '../..', 'i18n')
            : path.join(__dirname, 'i18n');
        return {
          fallbackLanguage: 'en',
          loaderOptions: {
            path: translationsPath,
            watch: true,
          },
          resolvers: [{ use: CookieResolver, options: ['lang'] }, AcceptLanguageResolver],
          loaders: [I18nJsonLoader],
        };
      },
    }),
  ],
})
export class TranslationModule {}
