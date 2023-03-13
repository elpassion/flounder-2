import iconConfigFile from "../fonts/fonticon.json";
import type { Icon, IconConfigFile } from "./types";

export const getIcons = ({ icons }: IconConfigFile): Icon[] => {
  return Object.keys(icons)
    .map((key) => ({
      name: key.replace("IconsTest", ""),
      symbol: {
        unicode: `\\u${icons[key]}`,
        entity: `&#x${icons[key]}`,
      },
    }))
    .sort((a, b) => (a.name > b.name ? 1 : -1));
};

export const getIconUnicodeForPseudo = (input: string) => {
  const iconsObject = getIcons(iconConfigFile);
  const foundEntity = iconsObject.find((item) => item.name === input);

  return foundEntity?.symbol.unicode;
};
