import { rest } from 'msw';
import { MailExampleDto } from '@flounder/contracts';
import { getEnvVariables } from '@flounder/next-utils';

export const handlers = [
  rest.post<MailExampleDto>(`${getEnvVariables().PAGE_URL}/api/email/example`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

export const handlersWithUnexpectedError = [
  rest.post<MailExampleDto>(`${getEnvVariables().PAGE_URL}/api/email/example`, (req, res, ctx) =>
    res(ctx.status(500)),
  ),
];
