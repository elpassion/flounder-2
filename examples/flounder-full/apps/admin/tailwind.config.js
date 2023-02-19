const { join } = require('path');
const { merge } = require('lodash');
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');
const baseConfig = require('../../.config/tailwind.config');

module.exports = merge(baseConfig, {
  content: [
    join(__dirname, './modules/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, './pages/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
});
