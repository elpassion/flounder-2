import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategyMock extends PassportStrategy(Strategy) {
  public static SECRET_MOCK = 'jwt mock';
  constructor() {
    super({
      secretOrKey: JwtStrategyMock.SECRET_MOCK,

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public async validate(payload: IJwtPayload): Promise<AuthenticatedUser> {
    return { id: payload.username, email: payload.email, groups: payload['cognito:groups'] || [] };
  }
}
