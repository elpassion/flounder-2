import { GetServerSideProps } from 'next';
import { withSession } from '@flounder/cognito-auth';
import { Emails } from 'modules/Pages';
import { redirectParams } from 'utils/redirectParams';
import { routes } from 'utils/routes';

export default Emails;

export const getServerSideProps: GetServerSideProps = withSession({
  redirect: `${routes.login}/?redirect=${redirectParams.emails}`,
})();
