import { GetServerSideProps } from 'next';
import { withSession } from '@flounder/cognito-auth';
import { UserApi } from '@flounder/shared-apis';
import { UserChangePassword } from '../../modules/Pages';
import { buildState } from '../../utils/build-state';

export default UserChangePassword;

export const getServerSideProps: GetServerSideProps = withSession({ redirect: '/' })(async ctx => {
  const dehydratedState = await buildState(ctx, async (queryClient, httpClient) => {
    const userApi = new UserApi(httpClient);
    await queryClient.prefetchQuery(['userProfile'], async () => userApi.getCurrentUser());
  });

  return { props: { dehydratedState } };
});
