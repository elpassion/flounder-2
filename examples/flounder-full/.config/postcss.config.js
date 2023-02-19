module.exports = {
  'postcss-flexbugs-fixes': {},
  'postcss-import': {},
  'tailwindcss/nesting': {},
  'postcss-hexrgba': {},
  'postcss-preset-env': {
    autoprefixer: {
      flexbox: 'no-2009',
    },
    stage: 1,
    features: {
      'custom-properties': false,
    },
  },
};
