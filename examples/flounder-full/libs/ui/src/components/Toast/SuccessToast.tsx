import {CheckCircleIcon} from "@heroicons/react/solid";
import {ToastWrapper} from "./ToastWrapper";
import {CustomToastColorsClasses, CustomToastProps} from "./Toast.interface";

const toastColors: CustomToastColorsClasses = {
  toastBackground: 'bg-green-100',
  accentColor: 'text-green-400',
  accentStrokeColor: 'stroke-green-400',
  accentBeforeBackground: 'before:bg-green-400'
}

export const SuccessToast = (props: CustomToastProps) => {
  const ToastIcon = props.customIcon || CheckCircleIcon;
  return <ToastWrapper customToastColorsClasses={toastColors} CustomIcon={ToastIcon} title={props.title} description={props.description} id={props.id}/>;
};
