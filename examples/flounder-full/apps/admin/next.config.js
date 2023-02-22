// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

const API_URL = process.env.API_URL;
const PAGE_URL = process.env.PAGE_URL;

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  env: {
    API_URL,
    PAGE_URL,
  },
  images: {
    domains: ['flounder-stg-mainstorage.s3.eu-west-1.amazonaws.com', 'flounder-prod-mainstorage.s3.eu-west-1.amazonaws.com'], //REPLACE_PROJECT
  },
};

module.exports = withNx(nextConfig);
