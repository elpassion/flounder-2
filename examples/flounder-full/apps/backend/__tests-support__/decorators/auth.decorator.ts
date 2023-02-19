import { isNotNil } from '@flounder/ts-utils';
import { TokenBuilder } from '../token.builder';
import { Role } from '../../src/auth/casl/enums/role.enum';
import { TestRequest, TestRequestDecorator, TokenExtender } from './request.decorator.interface';
import { User } from '../../src/domain/users/user.entity';

export const asAuthenticatedUser = (user: User, request: TestRequest) => {
  const userName = [user.first_name, user.last_name].filter(isNotNil).join(' ');
  const tokenExtender: TokenExtender = builder => builder.withId(user.cognito_id);
  return withToken(request, builder =>
    tokenExtender(
      builder.withId(user.cognito_id).withEmail(user.email).withName(userName).withGroup(Role.User),
    ),
  );
};

export const asDefaultUser: TestRequestDecorator = (
  request,
  tokenExtender: TokenExtender = tokenExtender => tokenExtender,
) => withToken(request, builder => tokenExtender(builder.withGroup(Role.User)));

export const asAdmin: TestRequestDecorator = (
  request,
  tokenExtender: TokenExtender = tokenExtender => tokenExtender,
) => withToken(request, builder => tokenExtender(builder.withGroup(Role.Admin)));

export const withToken =
  (
    request: TestRequest,
    tokenExtender: TokenExtender = tokenExtender => tokenExtender,
  ): TestRequest =>
  (...args) =>
    request(...args).set(tokenExtender(TokenBuilder.forUser()).buildHeader());
