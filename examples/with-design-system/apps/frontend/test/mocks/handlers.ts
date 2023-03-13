import { rest } from 'msw';
import { editedExampleUser, exampleUser, users } from '@flounder/contracts';

// not used but left as example handlers setup
export const handlers = [
  rest.get('/api/users/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users));
  }),

  rest.get('api/users/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(exampleUser));
  }),

  rest.put('api/users/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(editedExampleUser));
  }),

  rest.get('api/users/me', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(exampleUser));
  }),
];
