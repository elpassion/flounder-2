import { GetServerSideProps } from 'next';
import { withSession } from '@flounder/cognito-auth';
import { Subscriptions } from '../modules/Pages';

export default Subscriptions;

export const getServerSideProps: GetServerSideProps = withSession({ redirect: '/' })();
