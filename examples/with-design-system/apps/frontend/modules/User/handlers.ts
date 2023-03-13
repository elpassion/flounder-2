import { rest } from 'msw';
import { users } from '@flounder/contracts';
import { getEnvVariables } from '@flounder/next-utils';

export const handlers = [
  rest.get(`${getEnvVariables().PAGE_URL}/api/users`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users));
  }),
];
