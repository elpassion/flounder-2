import { GetServerSideProps } from 'next';

export { NextRouteComponent as default } from '@pankod/refine-nextjs-router';
import { withSession } from '@flounder/cognito-auth';

export const getServerSideProps: GetServerSideProps = withSession({
  redirect: '/login',
  isAdminApp: true,
})();
