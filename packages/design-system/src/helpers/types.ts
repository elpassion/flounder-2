import type { ReactNode } from "react";

export type TIcon = ReactNode;

export interface IconConfigFile {
  name: string;
  icons: { [key: string]: string };
}

export interface Icon {
  name: string;
  symbol: {
    unicode: string;
    entity: string;
  };
}

export interface GenericKeys {
  [key: string]: string | GenericKeys;
}
