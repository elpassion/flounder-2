import React from "react";
import { IconTypes } from "../../utils/iconType";

interface AccordionItemProps {
  id: number;
  title: string;
  description: React.ReactNode;
}

type iconPositions = "left" | "right";

export interface AccordionIconProps {
  icon: IconTypes;
  iconPosition: iconPositions;
}

export interface AccordionProps {
  variant: "bordered" | "solid";
  iconPosition: iconPositions;
  expandedId: number;
  items: AccordionItemProps[];
}

export interface AccordionButtonProps
  extends Pick<AccordionItemProps, "title">,
    Pick<AccordionProps, "iconPosition" | "variant">,
    React.PropsWithChildren {
  expanded: boolean;
}

export interface AccordionBodyProps
  extends Pick<AccordionItemProps, "description">,
    Pick<AccordionProps, "iconPosition"> {
}
