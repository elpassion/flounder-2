import { NextPage } from 'next';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import { useAuth } from '@flounder/cognito-auth';
import { isAxiosResponseError } from '@flounder/contracts';
import { usePayments } from 'modules/Api/Payment/PaymentApi.hooks';
import { errorToast } from 'modules/Toast';
import { PaymentProduct } from './PaymentProduct';
import { messages } from './messages';

export const PaymentSubscription: NextPage = () => {
  const { currentUser } = useAuth();
  const { usePricesQuery } = usePayments();
  const { data: prices } = usePricesQuery();

  const subscriptions = prices?.filter(price => price.recurring);

  const handleSubscription = async (selectedProductPriceId: string) => {
    try {
      const response = await axios.post('/api/subscription-checkout', {
        stripeId: selectedProductPriceId,
        id: currentUser?.cognito_id,
      });

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      await stripe?.redirectToCheckout({ sessionId: response.data.checkoutSessionId });
    } catch (error) {
      if (isAxiosResponseError(error)) {
        // TODO RM AFTER TESTS!! ADD TRANSLATION
        console.log('Subscription error:', error.response.data.message);
        errorToast({
          title: 'An error occured',
          description: error.response.data.message,
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-3">
      <h1 className="text-xl font-bold leading-5 sm:text-2xl">
        <FormattedMessage {...messages.headerSubscription} />
      </h1>
      {subscriptions && (
        <ul className="flex flex-wrap justify-center gap-20 mt-6">
          {subscriptions.map(price => (
            <PaymentProduct
              buttonText={messages.makeSubscription}
              onClick={handleSubscription}
              price={price}
              name={price.product.name}
              key={price.id}
              description={price.product.description}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
