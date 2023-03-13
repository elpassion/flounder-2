import { GetServerSideProps } from 'next';
import { withSession } from '@flounder/cognito-auth';
import { UserChangePassword } from 'modules/Pages';
import { routes } from 'utils/routes';

export default UserChangePassword;

export const getServerSideProps: GetServerSideProps = withSession({ redirect: routes.login })();
