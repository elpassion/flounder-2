import { rest } from 'msw';
import { API_URL } from '@env';
import { exampleUser } from '@flounder/contracts';

export const handlers = [
  rest.get(`${API_URL}/api/users/me`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(exampleUser));
  }),
  rest.post(`${API_URL}/api/users`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(exampleUser));
  }),
  rest.get(`${API_URL}/api/users`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([exampleUser]));
  }),
];
