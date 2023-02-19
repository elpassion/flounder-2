import { FormattedMessage } from 'react-intl';
import { Button } from '@flounder/ui';
import { Price } from './Payment';

interface PaymentProductProps {
  buttonText: { id: string; defaultMessage: string };
  onClick: (id: string) => Promise<void>;
  name: string;
  description: string;
  price: Price;
}

export const PaymentProduct = ({
  buttonText,
  onClick,
  name,
  description,
  price,
}: PaymentProductProps) => {
  return (
    <li
      className="flex flex-col items-center gap-4 
    border border-gray-800 px-6 py-12 w-[320px] rounded-md
     bg-gray-800 text-gray-300 
     hover:bg-gray-700 hover:text-white"
    >
      <h5 className="font-bold text-lg">{name}</h5>
      <p>{description}</p>
      <div className="py-10 font-bold">
        {`${(price.amount / 100).toFixed(2)} ${price.currency.toUpperCase()}`}
        {price.recurring && ` / ${price.recurring.interval_count} ${price.recurring.interval}`}
      </div>
      <Button onClick={() => onClick(price.id)}>
        <FormattedMessage {...buttonText} />
      </Button>
    </li>
  );
};
