const withNx = require('@nrwl/next/plugins/with-nx');

const locales = ['en', 'pl'];
const defaultLocale = 'en';

const API_URL = process.env.API_URL;
const PAGE_URL = process.env.PAGE_URL;

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withNx(withBundleAnalyzer({
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  env: {
    API_URL,
    PAGE_URL,
  },
  i18n: {
    locales,
    defaultLocale,
    localeDetection: false,
  },
  trailingSlash: true,
  images: {
    domains: ['flounder-stg-mainstorage.s3.eu-west-1.amazonaws.com', 'flounder-prod-mainstorage.s3.eu-west-1.amazonaws.com'],
  }
}));

module.exports = {
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      loader: require.resolve('@svgr/webpack'),
    });
    return config;
  },
  mode: process.env.NODE_ENV,
};