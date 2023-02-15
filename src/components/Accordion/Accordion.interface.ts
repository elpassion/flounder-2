import React from "react";

interface AccordionItemProps {
  id: number;
  title: string;
  description: React.ReactNode;
  expanded?: boolean;
}

type AccordionIconAlignProps = "left" | "right";

export interface AccordionProps {
  variant: "bordered" | "solid";
  icon: AccordionIconAlignProps;
  items: AccordionItemProps[];
}

export interface AccordionButtonProps
  extends Pick<AccordionItemProps, "title" | "expanded">,
    Pick<AccordionProps, "icon">,
    React.PropsWithChildren {}

export interface AccordionBodyProps
  extends Pick<AccordionItemProps, "description" | "expanded">,
    Pick<AccordionProps, "icon"> {}
