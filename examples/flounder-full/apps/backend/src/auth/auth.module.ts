import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { CognitoConfig } from './cognito/cognito.config';
import { CaslModule } from './casl/casl.module';
import { AuthFacade } from './auth.facade';
import { CognitoAdapter } from './cognito/cognito.adapter';

@Module({
  imports: [PassportModule, CaslModule],
  providers: [JwtStrategy, CognitoConfig, AuthFacade, CognitoAdapter],
  exports: [CaslModule, AuthFacade],
})
export class AuthModule {}
