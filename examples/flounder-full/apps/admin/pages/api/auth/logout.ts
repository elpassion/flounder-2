import type { NextApiRequest, NextApiResponse } from 'next';
import { getEnvVariables } from '@flounder/next-utils';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.redirect(
    `${process.env.COGNITO_URL}/logout?client_id=${process.env.COGNITO_CLIENT_ID}&logout_uri=${
      getEnvVariables().PAGE_URL
    }`,
  );
};

export default handler;
