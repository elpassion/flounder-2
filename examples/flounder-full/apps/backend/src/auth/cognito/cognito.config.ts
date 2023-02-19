import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ConfigValidator } from '../../shared/common/configuration/config.validator.ts';

class CognitoEnvVariables {
  @IsNotEmpty()
  @IsString()
  @Expose()
  COGNITO_PUBLIC_API_CLIENT_ID!: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  COGNITO_PUBLIC_USER_POOL_ID!: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  COGNITO_REGION!: string;
}

@Injectable()
export class CognitoConfig {
  readonly publicApiClientId: string;
  readonly publicUserPoolId: string;
  readonly region: string;

  constructor(configService: ConfigService) {
    const { COGNITO_PUBLIC_API_CLIENT_ID, COGNITO_PUBLIC_USER_POOL_ID, COGNITO_REGION } =
      ConfigValidator.validate(CognitoEnvVariables, {
        COGNITO_PUBLIC_API_CLIENT_ID: configService.get('COGNITO_PUBLIC_API_CLIENT_ID'),
        COGNITO_PUBLIC_USER_POOL_ID: configService.get('COGNITO_PUBLIC_USER_POOL_ID'),
        COGNITO_REGION: configService.get('COGNITO_REGION'),
      });

    this.publicApiClientId = COGNITO_PUBLIC_API_CLIENT_ID;
    this.publicUserPoolId = COGNITO_PUBLIC_USER_POOL_ID;
    this.region = COGNITO_REGION;
  }

  get publicApiAuthority(): string {
    return `https://cognito-idp.${this.region}.amazonaws.com/${this.publicUserPoolId}`;
  }

  get publicWellKnownJwks(): string {
    return `${this.publicApiAuthority}/.well-known/jwks.json`;
  }
}
