import { GetServerSideProps } from 'next';
import { withSession } from '@flounder/cognito-auth';
import { HomePage } from '../modules/Pages';

export default HomePage;

export const getServerSideProps: GetServerSideProps = withSession({
  redirect: '/login',
  isAdminApp: true,
})();
