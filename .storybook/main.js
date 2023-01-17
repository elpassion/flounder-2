module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "storybook-addon-designs",
    "@storybook/preset-create-react-app",
    {
      name: "@storybook/addon-storysource",
      options: {
        loaderOptions: {
          parser: "typescript",
        },
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
};
