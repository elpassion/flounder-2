import { rest } from 'msw';
import { editedExampleUser, exampleUser } from '@flounder/contracts';
import { getEnvVariables } from '@flounder/next-utils';

export const handlers = [
  rest.get(`${getEnvVariables().PAGE_URL}/api/users/me`, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json(exampleUser));
  }),
];

export const handlersWithEditedUserData = [
  rest.put(`${getEnvVariables().PAGE_URL}/api/users/${exampleUser.cognito_id}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(editedExampleUser));
  }),
  rest.get(`${getEnvVariables().PAGE_URL}/api/users/me`, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json(editedExampleUser));
  }),
];

export const handlersWithUnexpectedError = [
  rest.put(`${getEnvVariables().PAGE_URL}/api/users/${exampleUser.cognito_id}`, (req, res, ctx) =>
    res(ctx.status(500)),
  ),
];
