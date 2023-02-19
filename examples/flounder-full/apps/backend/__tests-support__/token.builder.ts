import { Role } from '../src/auth/casl/enums/role.enum';
import { sign } from 'jsonwebtoken';
import { JwtStrategyMock } from '../src/auth/strategies/jwt.strategy.mock';
import { defaultUser } from "../src/domain/users/__tests-support__/user-fixture";

export class TokenBuilder {
  private roles: Role[] = [];
  private name = `${defaultUser.first_name} ${defaultUser.last_name}`;
  private id = defaultUser.cognito_id;
  private email = defaultUser.email;

  static forUser() {
    return new TokenBuilder();
  }

  withGroup(role: Role | undefined) {
    if (!role) return this;
    this.roles.push(role);
    return this;
  }

  withId(id: string) {
    this.id = id;
    return this;
  }

  withEmail(email: string) {
    this.email = email;
    return this;
  }

  withName(name: string) {
    this.name = name;
    return this;
  }

  build(): string {
    return this.generateToken();
  }

  buildHeader(): Record<string, string> {
    return { Authorization: `Bearer ${this.build()}` };
  }

  private generateToken(): string {
    const payload = {
      sub: '1234567890',
      name: this.name,
      iat: 1516239022,
      'cognito:groups': this.roles,
      email: this.email,
      username: this.id,
      'cognito:username': this.id,
    };
    return sign(payload, JwtStrategyMock.SECRET_MOCK);
  }
}
