import React from "react";
import iconConfigFile from "../../fonts/fonticon.json";
import { getIcons, getIconsObject } from "../../helpers/getIcons";
import { Icon as IconComponent } from "../../components/Icon";

export const Icon = () => {
  const icons = getIcons(iconConfigFile);

  return (
    <>
      <IconComponent iconName="wifi" size="lg" />
    </>
  );
};

export default {
  title: "🟢 Atoms/Icon",
  component: Icon,
};
