export function getEnvVariables() {
  const API_URL = process.env['API_URL'];
  const PAGE_URL = process.env['PAGE_URL'];
  // TODO: Because of Next Prerendering this requires env variables to be available during build time.
  // assertIsNonEmptyString(API_URL);
  // assertIsNonEmptyString(PAGE_URL);

  return {
    API_URL: API_URL || '',
    PAGE_URL: PAGE_URL || '',
  };
}
