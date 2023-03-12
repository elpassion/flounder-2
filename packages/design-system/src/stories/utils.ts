export const getImageUrl = (file: string) => {
  if (process.env.NODE_ENV === "development") {
    return file;
  }

  return "/flounder-2" + file;
};
