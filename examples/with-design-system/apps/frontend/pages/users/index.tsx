import { GetServerSideProps } from 'next';
import { withSession } from '@flounder/cognito-auth';
import { UserApi } from '@flounder/shared-apis';
import { Users } from 'modules/Pages';
import { buildState } from 'utils/buildState';
import { queryKeys } from 'utils/queryKeys';
import { redirectParams } from 'utils/redirectParams';
import { routes } from 'utils/routes';

export default Users;

export const getServerSideProps: GetServerSideProps = withSession({
  redirect: `${routes.login}/?redirect=${redirectParams.users}`,
})(async ctx => {
  const dehydratedState = await buildState(ctx, async (queryClient, httpClient) => {
    const userApi = new UserApi(httpClient);
    await queryClient.prefetchQuery(queryKeys.users.all.queryKey, async () => userApi.getUsers());
  });

  return { props: { dehydratedState } };
});
