import React from "react";
import CogSvg from "../svgs/CogSvg";
import UserSvg from "../svgs/UserSvg";

export const getImageUrl = (file: string) => {
  if (process.env.NODE_ENV === "development") {
    return file;
  }

  return "/flounder-2" + file;
};

const userIcon = <UserSvg className="aspect-square w-full" />;
const cogIcon = <CogSvg className="aspect-square w-full" />;
const storyIcons = { userIcon, cogIcon };

export const storybookIconControl = {
  options: [undefined, ...Object.keys(storyIcons)],
  mapping: storyIcons,
  control: {
    type: "select",
    labels: {
      undefined: "none",
      userIcon: "User Icon",
      cogIcon: "Cog Icon",
    },
  },
  description: "icon",
};
