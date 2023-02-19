module.exports = {
  stories: [],
  addons: ['@storybook/addon-essentials','@storybook/addon-a11y',],
  webpackFinal: async (config, { configType }) => {
    return config;
  },
};
