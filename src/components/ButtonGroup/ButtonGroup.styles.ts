export const buttonBorderVariants = {
  primary: "border-primary-100 hover:border-primary-100",
  outlined: "",
  ghost: "",
  destructive: "border-error-100",
  destructiveOutlined: "",
  destructiveGhost: "",
};

export const buttonRadiusVariants = (array: string | any[]) => {
  const lastIndex = array.length - 1;

  return {
    0: "rounded-r-none",
    [lastIndex]: "rounded-l-none -ml-px",
  };
};
