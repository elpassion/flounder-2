import type { TIcon } from "../../helpers/types";

interface Tab {
  id: string;
  label: string;
  icon?: TIcon;
}

export interface NavTabsProps {
  layout: "horizontal" | "vertical";
  tabs: Tab[];
  activeTab: string;
  onClick: (id: string) => void;
  type: "filled" | "outlined" | "line";
}
