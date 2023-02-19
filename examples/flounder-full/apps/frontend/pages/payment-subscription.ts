import { GetServerSideProps } from 'next';
import { withSession } from '@flounder/cognito-auth';
import { PaymentSubscription } from 'modules/Pages';

export default PaymentSubscription;

export const getServerSideProps: GetServerSideProps = withSession({ redirect: '/' })();
