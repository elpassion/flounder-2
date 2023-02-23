import React from "react";
import { IconTypes } from "utils/iconType";

interface AccordionItemProps {
  id: number;
  title: string;
  description: React.ReactNode;
  expanded?: boolean;
}

type iconPositions = "left" | "right";

export interface AccordionIconProps {
  icon: IconTypes;
  iconPosition: iconPositions;
}

export interface AccordionProps {
  variant: "bordered" | "solid";
  iconPosition: iconPositions;
  items: AccordionItemProps[];
}

export interface AccordionButtonProps
  extends Pick<AccordionItemProps, "title" | "expanded">,
    Pick<AccordionProps, "iconPosition" | "variant">,
    React.PropsWithChildren {}

export interface AccordionBodyProps
  extends Pick<AccordionItemProps, "description" | "expanded">,
    Pick<AccordionProps, "iconPosition"> {}
