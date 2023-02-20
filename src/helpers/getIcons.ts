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
