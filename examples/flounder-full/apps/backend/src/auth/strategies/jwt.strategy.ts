import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { CognitoConfig } from '../cognito/cognito.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(authConfig: CognitoConfig) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: authConfig.publicWellKnownJwks,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // audience: authConfig.publicApiClientId,
      issuer: authConfig.publicApiAuthority,
      algorithms: ['RS256'],
    });
  }

  public async validate(payload: IJwtPayload): Promise<AuthenticatedUser> {
    return {
      id: payload['cognito:username'],
      email: payload.email,
      groups: payload['cognito:groups'] || [],
    };
  }
}
