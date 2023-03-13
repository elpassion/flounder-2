import { withSSRContext } from 'aws-amplify';
import { getEnvVariables, ProxyProvider, runMiddleware } from '@flounder/next-utils';

const backendApiProxy = new ProxyProvider().getForTarget(getEnvVariables().API_URL);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handler(req: any, res: any) {
  const { Auth } = withSSRContext({ req });

  try {
    const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
    const data = user.getSignInUserSession()?.getIdToken();

    if (data) {
      req.headers['Authorization'] = `Bearer ${data.getJwtToken()}`;
      return await runMiddleware(req, res, backendApiProxy);
    }
  } catch (error) {
    await runMiddleware(req, res, backendApiProxy);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
