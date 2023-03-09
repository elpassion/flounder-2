module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "storybook-addon-designs",
    "storybook-dark-mode",
    {
      name: "@storybook/preset-create-react-app",
      options: {
        scriptsPackageName: 'react-scripts'
      }
    }
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  staticDirs: ['../src/static'],
};
