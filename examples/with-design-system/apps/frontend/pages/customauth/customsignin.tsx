import { GetServerSideProps } from 'next';
import { withSession } from '@flounder/cognito-auth';
import { CustomSignIn } from '../../modules/Pages';

export default CustomSignIn;

export const getServerSideProps: GetServerSideProps = withSession()();
