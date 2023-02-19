const { postCssPlugins } = require('../../.config/postcss.config');
const { join } = require('path');

module.exports = {
  plugins: {
    ...postCssPlugins,
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js'),
    },
  },
};
