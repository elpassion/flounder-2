import { rest } from 'msw';
import { exampleUser, ExtendedUserDto, SignUpDto } from '@flounder/contracts';
import { getEnvVariables } from '@flounder/next-utils';

export const handlers = [
  rest.post<SignUpDto>(`${getEnvVariables().PAGE_URL}/api/registration`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<ExtendedUserDto>(exampleUser));
  }),
];

export const handlersWithUnexpectedError = [
  rest.post<SignUpDto>(`${getEnvVariables().PAGE_URL}/api/registration`, (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: 'Something went wrong' }));
  }),
];
