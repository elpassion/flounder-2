import { GetServerSideProps } from 'next';
import { withSession } from '@flounder/cognito-auth';
import { Emails } from '../modules/Pages';

export default Emails;

export const getServerSideProps: GetServerSideProps = withSession({ redirect: '/' })();
