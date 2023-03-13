import {ExclamationCircleIcon} from "@heroicons/react/solid";
import {ToastWrapper} from "./ToastWrapper";
import {CustomToastColorsClasses, CustomToastProps} from "./Toast.interface";

const toastColors: CustomToastColorsClasses = {
  toastBackground: 'bg-red-100',
  accentColor: 'text-red-400',
  accentStrokeColor: 'stroke-red-400',
  accentBeforeBackground: 'before:bg-red-400'
}

export const ErrorToast = (props: CustomToastProps) => {
  const ToastIcon = props.customIcon || ExclamationCircleIcon;
  return <ToastWrapper customToastColorsClasses={toastColors} CustomIcon={ToastIcon} title={props.title} description={props.description} id={props.id}/>;
};
