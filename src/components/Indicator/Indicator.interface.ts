import React from "react";

export interface IndicatorComponentsProps {
  type: "default" | "error" | "warning" | "processing" | "success";
  variant: "default" | "count" | "badge";
}

export interface IndicatorWrapperProps
  extends IndicatorComponentsProps,
    React.PropsWithChildren {}

export interface IndicatorProps extends IndicatorComponentsProps {
  text?: string;
  number?: number;
}
