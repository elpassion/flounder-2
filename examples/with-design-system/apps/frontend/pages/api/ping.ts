import type { NextApiRequest, NextApiResponse } from 'next';

interface HealthCheckDto {
  service: string;
  message: string;
}

const handler = (req: NextApiRequest, res: NextApiResponse<HealthCheckDto>) => {
  res.send({
    service: 'ui',
    message: 'pong',
  });
};

export default handler;
