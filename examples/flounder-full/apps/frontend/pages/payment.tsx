import { GetServerSideProps } from 'next';
import { withSession } from '@flounder/cognito-auth';
import { Payment } from 'modules/Pages';

export default Payment;

export const getServerSideProps: GetServerSideProps = withSession({ redirect: '/' })();
