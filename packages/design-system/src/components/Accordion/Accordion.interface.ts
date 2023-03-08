import { IconTypes } from "../../utils/iconType";
import type { ReactNode, PropsWithChildren } from "react";

interface AccordionItemProps {
  id: number;
  title: string;
  description: ReactNode;
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
    PropsWithChildren {
  expanded: boolean;
}

export interface AccordionBodyProps
  extends Pick<AccordionItemProps, "description">,
    Pick<AccordionProps, "iconPosition"> {
}
