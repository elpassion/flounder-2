import { IncomingMessage } from 'http';
import { withSSRContext } from 'aws-amplify';
import { HttpClient } from '@flounder/http-client';
import { getEnvVariables } from '@flounder/next-utils';

export class ServerHttpClient extends HttpClient {
  static async fromRequest(args: {
    req: IncomingMessage;
    isAdminApp?: boolean;
  }) {
    const { Auth } = withSSRContext({ req: args.req });
    const session = await Auth.currentSession();
    const isAdmin = session
      .getIdToken()
      .payload['cognito:groups']?.includes('admin-group');

    if (!isAdmin && args.isAdminApp) return;

    const user = await Auth.currentAuthenticatedUser({ bypassCache: true });

    const token = user.getSignInUserSession()?.getIdToken().getJwtToken();

    return new ServerHttpClient({
      url: getEnvVariables().API_URL,
      accessToken: token,
    });
  }
}
