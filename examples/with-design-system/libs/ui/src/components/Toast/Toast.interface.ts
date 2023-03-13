import {Toast} from "react-hot-toast";
import {SVGProps} from "react";

export interface CustomToastProps extends Toast {
  title?: string;
  description?: string;
  customIcon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

export interface CustomToastColorsClasses {
  toastBackground: string;
  accentColor: string;
  accentStrokeColor: string;
  accentBeforeBackground: string
}
