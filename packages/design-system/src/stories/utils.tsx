import React from "react";
import CogSvg from "../svgs/CogSvg";
import UserSvg from "../svgs/UserSvg";
import HomeSvg from "../svgs/HomeSvg";
import HelpCircleSvg from "../svgs/HelpCircleSvg";
import CameraSvg from "../svgs/CameraSvg";
import ChevronDownSvg from "../svgs/ChevronDownSvg";

export const getImageUrl = (file: string) => {
  if (process.env.NODE_ENV === "development") {
    return file;
  }

  return "/flounder-2" + file;
};

const userIcon = <UserSvg className="aspect-square w-full" />;
const cogIcon = <CogSvg className="aspect-square w-full" />;
const helpIcon = <HelpCircleSvg className="aspect-square w-full" />;
const cameraIcon = <CameraSvg className="aspect-square w-full" />;
const homeIcon = <HomeSvg className="aspect-square w-full" />;
const chevronDownIcon = <ChevronDownSvg className="aspect-square w-full" />;
const chevronRightIcon = (
  <ChevronDownSvg className="aspect-square w-full -rotate-90 transform" />
);

const storyIcons = {
  userIcon,
  cogIcon,
  helpIcon,
  cameraIcon,
  homeIcon,
  chevronDownIcon,
  chevronRightIcon,
};

export const storybookIconControl = {
  options: [undefined, ...Object.keys(storyIcons)],
  mapping: storyIcons,
  control: {
    type: "select",
    labels: {
      undefined: "none",
      userIcon: "User",
      cogIcon: "Cog",
      helpIcon: "Help",
      homeIcon: "Home",
      cameraIcon: "Camera",
      chevronDownIcon: "ChevronDown",
      chevronRightIcon: "ChevronRight",
    },
  },
  description: "icon",
};

export const storybookAvatarImageControl = {
  description: "Image",
  control: {
    type: "select",
    labels: {
      "/red.png": "red",
      "/peach.png": "peach",
      "/yellow.png": "yellow",
      "/blue.png": "blue",
      "/pink.png": "pink",
    },
  },
  options: [
    undefined,
    getImageUrl("/red.png"),
    getImageUrl("/peach.png"),
    getImageUrl("/yellow.png"),
    getImageUrl("/blue.png"),
    getImageUrl("/pink.png"),
  ],
};
