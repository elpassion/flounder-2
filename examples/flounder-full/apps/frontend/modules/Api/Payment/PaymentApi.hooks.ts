import { useQuery } from '@tanstack/react-query';
import { PaymentApi } from './PaymentApi';

export const usePayments = () => {
  const paymentApi = new PaymentApi();

  const usePricesQuery = () =>
    useQuery(['prices'], async () => await paymentApi.getPrices(), { refetchOnMount: false });

  return {
    usePricesQuery,
  };
};
