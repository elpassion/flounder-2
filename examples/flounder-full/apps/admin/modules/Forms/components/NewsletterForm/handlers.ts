import { rest } from 'msw';
import { EmailSubscriptionDto } from '@flounder/contracts';
import { getEnvVariables } from '@flounder/next-utils';

export const handlers = [
  rest.post<EmailSubscriptionDto>(
    `${getEnvVariables().PAGE_URL}/api/email-subscriptions`,
    (req, res, ctx) => {
      const response: EmailSubscriptionDto = {
        id: 1337,
        email: req.body.email,
        created_at: new Date().toLocaleDateString(),
        updated_at: new Date().toLocaleDateString(),
      };
      return res(ctx.status(200), ctx.json(response));
    },
  ),
];

export const handlersWithConflictError = [
  rest.post<EmailSubscriptionDto>(
    `${getEnvVariables().PAGE_URL}/api/email-subscriptions`,
    (req, res, ctx) => res(ctx.status(409)),
  ),
];

export const handlersWithUnexpectedError = [
  rest.post<EmailSubscriptionDto>(
    `${getEnvVariables().PAGE_URL}/api/email-subscriptions`,
    (req, res, ctx) => res(ctx.status(500)),
  ),
];
