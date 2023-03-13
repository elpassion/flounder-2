import type { Icon, IconConfigFile, IconObject } from "./types";
import iconConfigFile from "../fonts/fonticon.json";

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

export const getIconsObject = ({ icons }: IconConfigFile): IconObject => {
  return Object.keys(icons).reduce(
    (acc, red) => ({
      [red.replace("IconsTest", "")]: {
        unicode: `\\u${icons[red]}`,
        entity: `&#x${icons[red]}`,
      },
      ...acc,
    }),
    {}
  );
};

export const Icons = getIconsObject(iconConfigFile);

export const getIconUnicodeForPseudo = (input: string) => {
  const iconsObject = getIcons(iconConfigFile);
  const foundEntity = iconsObject.find((item) => item.name === input);

  return foundEntity?.symbol.unicode;
};
