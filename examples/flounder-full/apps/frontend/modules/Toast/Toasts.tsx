import { toast } from 'react-hot-toast';
import { ErrorToast, InfoToast, SuccessToast, WarningToast } from '@flounder/ui';

interface ToastProps {
  title?: string;
  description?: string;
}

export const errorToast = ({ title, description }: ToastProps) =>
  toast.custom(t => <ErrorToast title={title || 'Error'} description={description} {...t} />);

export const successToast = ({ title, description }: ToastProps) =>
  toast.custom(t => <SuccessToast title={title || 'Success'} description={description} {...t} />);

export const infoToast = ({ title, description }: ToastProps) =>
  toast.custom(t => <InfoToast title={title || 'Info'} description={description} {...t} />);

export const warningToast = ({ title, description }: ToastProps) =>
  toast.custom(t => <WarningToast title={title || 'Warning'} description={description} {...t} />);
