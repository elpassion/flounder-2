const { merge } = require('webpack-merge');
const glob = require('glob');
const { basename } = require('path');

module.exports = config => {
  const migrations = glob.sync('apps/backend/src/migrations/*.ts').reduce((acc, file) => {
    const fileName = basename(file);
    acc[`migrations/${fileName}`] = file;
    return acc;
  }, {});

  return merge(config, {
    entry: migrations,
    output: {
      filename: '[name].js',
    },
  });
};
