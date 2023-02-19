import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { stripeId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: stripeId, quantity: 1 }],
      payment_method_types: ['card', 'p24'],
      mode: 'payment',
      success_url: process.env.STRIPE_SUCCESS_PAYMENT_URL,
      cancel_url: process.env.STRIPE_CANCELLED_PAYMENT_URL,
    });
    res.json({ url: session.url });
    // res.redirect(303, session.url);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }

    res.status(400).json('Something went wrong');
  }
};

export default handler;
