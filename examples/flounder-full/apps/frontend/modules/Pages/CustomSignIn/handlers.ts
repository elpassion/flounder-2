import { rest } from 'msw';
import { exampleUser } from '@flounder/contracts';
import { getEnvVariables } from '@flounder/next-utils';

export const handlersForCorrectSignIn = [
  rest.get(`${getEnvVariables().PAGE_URL}/api/users/me`, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json(exampleUser));
  }),
];
