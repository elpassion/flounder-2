# http-client
## Description
The class with `axios` instance and handlers for CRUD methods (`get`, `put`, `post`, `delete`, `patch`).

Available via `@flounder/http-client`

## Functionalities
### HttpClient class
Class used in apps: `admin`, `frontend`, `mobile` and libs: `next-utils`, `cognito-auth`. 

You can configure `axios` instance via `options` object passed during creating `HttpClient` instance (e.g. set `baseUrl`).
- Available via `@flounder/http-client` pathname
- in apps (`frontend`, `admin`) use HttpClient when adding new api modules (according to e.g `NewsletterApi.ts` from `frontend` app, you can also use `createHttpClient` util function from `@flounder/next-utils`)
