import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const prices = await stripe.prices.list({
      expand: ['data.product'],
    });

    const parsedData = prices.data.map((price: Stripe.Price) => {
      return {
        id: price.id,
        amount: price.unit_amount,
        currency: price.currency,
        recurring: price.recurring,
        // it doesn't handle every case properly but it works for POC
        product:
          typeof price.product === 'object' && !price.product.deleted
            ? {
                id: price.product.id,
                name: price.product.name,
                description: price.product.description,
              }
            : price.product,
      };
    });
    res.json(parsedData);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }

    res.status(400).json('Something went wrong');
  }
};

export default handler;
