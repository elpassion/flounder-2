import { GetServerSideProps } from 'next';
import { withSession } from '@flounder/cognito-auth';
import { CustomSignUp } from '../../modules/Pages';

export default CustomSignUp;

export const getServerSideProps: GetServerSideProps = withSession()();
