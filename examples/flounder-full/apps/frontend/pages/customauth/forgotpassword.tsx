import { GetServerSideProps } from 'next';
import { withSession } from '@flounder/cognito-auth';
import { ForgotPassword } from '../../modules/Pages';

export default ForgotPassword;

export const getServerSideProps: GetServerSideProps = withSession()();
