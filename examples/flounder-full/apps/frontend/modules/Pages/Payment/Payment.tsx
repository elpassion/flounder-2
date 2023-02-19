import { NextPage } from 'next';
import Link from 'next/link';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import Stripe from 'stripe';
import { useAuth } from '@flounder/cognito-auth';
import { isAxiosResponseError } from '@flounder/contracts';
import { usePayments } from 'modules/Api/Payment/PaymentApi.hooks';
import { errorToast } from 'modules/Toast';
import { PaymentProduct } from './PaymentProduct';
import { messages } from './messages';

export interface Product {
  id: string;
  name: string;
  description: string;
}
export interface Price {
  id: string;
  amount: number;
  currency: string;
  recurring: Stripe.Price.Recurring | null;
  product: Product;
}

export const Payment: NextPage = () => {
  const { currentUser } = useAuth();
  const { usePricesQuery } = usePayments();
  const { data: prices } = usePricesQuery();

  const handlePayment = async (selectedProductPriceId: string) => {
    try {
      const response = await axios.post('/api/checkout', {
        stripeId: selectedProductPriceId,
        id: currentUser?.cognito_id,
      });
      window.location.href = response.data.url;
    } catch (error) {
      if (isAxiosResponseError(error)) {
        // TODO RM AFTER TESTS!! ADD TRANSLATION
        console.log('Payment error:', error.response.data.message);
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
        <FormattedMessage {...messages.header} />
      </h1>
      <Link href={'/payment-subscription'} className="underline">
        <FormattedMessage {...messages.goToSubscriptions} />
      </Link>
      <ul className="flex flex-wrap justify-center gap-20 mt-6">
        {prices &&
          prices.map(price => (
            <PaymentProduct
              buttonText={messages.makePayment}
              onClick={handlePayment}
              key={price.id}
              price={price}
              name={price.product.name}
              description={price.product.description}
            />
          ))}
      </ul>
    </div>
  );
};
