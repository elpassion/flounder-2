import React from "react";

type AccordionIconProps = "left" | "right";

interface AccordionItemProps {
  id: number;
  title: string;
  description: React.ReactNode;
  expanded?: boolean;
}

export interface AccordionProps {
  divider?: boolean;
  icon?: AccordionIconProps;
  items: AccordionItemProps[];
}

export interface AccordionButtonProps
  extends Pick<AccordionItemProps, "title" | "expanded"> {
  children: React.ReactNode;
}

export interface AccordionBodyProps
  extends Pick<AccordionItemProps, "description" | "expanded"> {}
