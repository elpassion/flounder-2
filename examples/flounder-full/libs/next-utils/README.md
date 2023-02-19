# next-utils

[comment]: <> (Required section: Description & Functionalities)

## Description

Miscellaneous app utils related to `Next.js`

Available via path `@flounder/next-utils`

Do not use helpers and functions from `next-utils` inside `mobile` app.

## Functionalities

### Utilities

- assertion functions
- `createHttpClient` helper that creates `HttpClient` with baseUrl from `PAGE_URL` env
- `deleteAllCookes` function for clearing existing cookies
- `getEnvVariables` function that exposes `API_URL` and `PAGE_URL` envs
- `ProxyProvider` for creating proxy using `http-proxy-middleware`
- `runMiddleware` helper that allows handling middleware in `next.js` API routes
- `useS3FileUpload` react hook for uploading file to use with `S3Api` & `imageApi`
