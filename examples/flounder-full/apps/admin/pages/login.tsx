import { GetServerSideProps } from 'next';
import { withSession } from '@flounder/cognito-auth';
import { LoginPage } from '../modules/Pages';

export default LoginPage;

export const getServerSideProps: GetServerSideProps = withSession({ isAdminApp: true })();
