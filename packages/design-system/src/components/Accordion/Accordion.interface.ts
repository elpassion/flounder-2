import type { ReactNode, PropsWithChildren } from "react";
import type { TIcon } from "../../helpers/types";

interface AccordionItemProps {
  id: number;
  title: string;
  description: ReactNode;
}

type iconPositions = "left" | "right";

export interface AccordionIconProps {
  icon: TIcon;
  iconPosition: iconPositions;
}

export interface AccordionProps {
  variant: "bordered" | "solid";
  icon?: "chevron" | "plus";
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
