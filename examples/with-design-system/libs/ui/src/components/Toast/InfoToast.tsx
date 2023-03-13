import {InformationCircleIcon} from "@heroicons/react/solid";
import {ToastWrapper} from "./ToastWrapper";
import {CustomToastColorsClasses, CustomToastProps} from "./Toast.interface";

const toastColors: CustomToastColorsClasses = {
  toastBackground: 'bg-sky-100',
  accentColor: 'text-sky-400',
  accentStrokeColor: 'stroke-sky-400',
  accentBeforeBackground: 'before:bg-sky-400'
}

export const InfoToast = (props: CustomToastProps) => {
  const ToastIcon = props.customIcon || InformationCircleIcon;
  return <ToastWrapper customToastColorsClasses={toastColors} CustomIcon={ToastIcon} title={props.title} description={props.description} id={props.id}/>;
};
