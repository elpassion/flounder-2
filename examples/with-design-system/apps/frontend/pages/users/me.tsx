import { GetServerSideProps } from 'next';
import { withSession } from '@flounder/cognito-auth';
import { redirectParams } from 'utils/redirectParams';
import { routes } from 'utils/routes';
import { UserProfilePage } from '../../modules/Pages';

export default UserProfilePage;

export const getServerSideProps: GetServerSideProps = withSession({
  redirect: `${routes.login}/?redirect=${redirectParams.me}`,
})();
