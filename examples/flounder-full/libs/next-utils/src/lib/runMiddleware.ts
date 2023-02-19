import { Request, Response, NextFunction } from 'express';

export const runMiddleware = (
  req: Request,
  res: Response,
  fn: (req: Request, res: Response, fn: NextFunction) => void,
) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
