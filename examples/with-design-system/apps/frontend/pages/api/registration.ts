import { runMiddleware, ProxyProvider, getEnvVariables } from '@flounder/next-utils';

const proxy = new ProxyProvider().getForTarget(getEnvVariables().API_URL);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handler(req: any, res: any) {
  return await runMiddleware(req, res, proxy);
}

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

export default handler;
