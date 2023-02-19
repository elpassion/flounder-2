import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const config = { api: { bodyParser: false } };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const signature = req.headers['stripe-signature'];

  try {
    const signatureSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;
    const reqBuffer = await buffer(req);
    const event = stripe.webhooks.constructEvent(reqBuffer, signature, signatureSecret);

    switch (event.type) {
      case 'customer.subscription.created':
        console.log('activated');
        break;
      default:
        console.log('some unhandled type');
    }

    res.status(202).send({ message: 'Webhook received' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: `${req.headers['stripe-signature']}` });
  }
};

export default handler;
