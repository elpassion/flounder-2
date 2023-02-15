import React from "react";

interface AccordionItemProps {
  id: number;
  title: string;
  description: React.ReactNode;
  expanded?: boolean;
}

export interface AccordionIconPositionVariants extends React.PropsWithChildren {
  align: "left" | "right";
}

export interface AccordionProps {
  variant: "bordered" | "borderless";
  icon: AccordionIconPositionVariants;
  items: AccordionItemProps[];
}

export interface AccordionButtonProps
  extends Pick<AccordionItemProps, "title" | "expanded">,
    Pick<AccordionProps, "icon">,
    React.PropsWithChildren {}

export interface AccordionBodyProps
  extends Pick<AccordionItemProps, "description" | "expanded">,
    Pick<AccordionIconPositionVariants, "align"> {}
