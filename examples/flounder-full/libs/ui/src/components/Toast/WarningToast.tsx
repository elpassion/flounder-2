import {ExclamationIcon} from "@heroicons/react/solid";
import {ToastWrapper} from "./ToastWrapper";
import {CustomToastColorsClasses, CustomToastProps} from "./Toast.interface";

const toastColors: CustomToastColorsClasses = {
  toastBackground: 'bg-orange-100',
  accentColor: 'text-amber-400',
  accentStrokeColor: 'stroke-amber-400',
  accentBeforeBackground: 'before:bg-amber-400'
}

export const WarningToast = (props: CustomToastProps) => {
  const ToastIcon = props.customIcon || ExclamationIcon;
  return <ToastWrapper customToastColorsClasses={toastColors} CustomIcon={ToastIcon} title={props.title} description={props.description} id={props.id}/>;
};
