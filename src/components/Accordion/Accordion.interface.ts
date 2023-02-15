import React from "react";

interface AccordionItemProps {
  id: number;
  title: string;
  description: React.ReactNode;
  expanded?: boolean;
}

export interface AccordionIconPositionVariants {
  align: "left" | "right";
}

export interface AccordionProps {
  divider?: boolean;
  icon?: AccordionIconPositionVariants;
  items: AccordionItemProps[];
}

export interface AccordionButtonProps
  extends Pick<AccordionItemProps, "title" | "expanded"> {
  children: React.ReactNode;
}

export interface AccordionBodyProps
  extends Pick<AccordionItemProps, "description" | "expanded"> {}
