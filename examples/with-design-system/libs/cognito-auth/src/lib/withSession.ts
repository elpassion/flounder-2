import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ServerHttpClient } from './ServerHttpClient';
import { UserApi } from '@flounder/shared-apis';

export class NotFoundError extends Error {}

export function withSession({
  redirect,
  isAdminApp,
}: {
  redirect?: string;
  isAdminApp?: boolean;
} = {}) {
  return (
      getServerSideProps: GetServerSideProps = async () => ({ props: {} })
    ) =>
    async (ctx: GetServerSidePropsContext) => {
      const httpClient = await ServerHttpClient.fromRequest({
        req: ctx.req,
        isAdminApp,
      }).catch(() => null);

      const redirectLocale =
        ctx.locale !== ctx.defaultLocale ? `/${ctx.locale}` : '';

      if (!httpClient && redirect) {
        return {
          redirect: {
            destination: `${redirectLocale}${redirect}`,
            permanent: false,
          },
        };
      }

      if (httpClient) {
        const userApi = new UserApi(httpClient);
        const meApiData = await userApi
          .getCurrentUser()
          .catch(() =>
            userApi.createUser().then(() => userApi.getCurrentUser())
          );
        try {
          const result = await getServerSideProps(ctx);

          if (!('props' in result)) return result;

          return {
            ...result,
            props: { ...result.props, currentUser: meApiData },
          };
        } catch (e) {
          if (e instanceof NotFoundError) {
            return {
              notFound: true as const,
            };
          }
          throw e;
        }
      }
      return await getServerSideProps(ctx);
    };
}
