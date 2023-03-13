import type { NextApiRequest, NextApiResponse } from 'next';

interface VersionInterface {
  version?: string;
}

const handler = (req: NextApiRequest, res: NextApiResponse<VersionInterface>) => {
  res.send({
    version: process.env.npm_package_version,
  });
};

export default handler;
