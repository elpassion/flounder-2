import { GetServerSideProps } from 'next';
export { NextRouteComponent as default } from '@pankod/refine-nextjs-router';
import dataProvider from '@pankod/refine-simple-rest';
import { withSession } from '@flounder/cognito-auth';

export const getServerSideProps: GetServerSideProps = withSession({
  redirect: '/login',
  isAdminApp: true,
})(async context => {
  const { query } = context;

  try {
    const data = await dataProvider('/api').getList({
      resource: query['resource'] as string,
    });

    return {
      props: {
        initialData: data,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
});
