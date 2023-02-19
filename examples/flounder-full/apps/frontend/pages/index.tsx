import type { GetServerSideProps } from 'next';
import { withSession } from '@flounder/cognito-auth';
import { HomePage } from '../modules/Pages';

export const getServerSideProps: GetServerSideProps = withSession()();

export default HomePage;
