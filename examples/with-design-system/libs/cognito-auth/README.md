# cognito-auth

[comment]: <> (Required section: Description & Functionalities)

## Description

Lib contains various `hooks`, `providers` and `classes` related to the `authorization` process (custom auth flow using `Amplify` & `AWS Cognito`).

## Functionalities

### AuthProvider & useAuth hook

- Provider and hook allow using in app `CognitoApi`, getting info about logged in user and setting current user
- If `avatar_key` is null, then returns `avatar-logged.png` from frontend assets.

### CognitoApi

- Class with methods to work with `AWS Cognito` - configuring `Cognito` and handling auth actions - signing in, signing out, sending confirmation code and confirming user, resetting forgotten password process

### Utilities

- `ServerHttpClient` returns `httpClient` with `accessToken` if user is correctly logged in (works during SSR)
- `withSession` is higher-order component that checks if the user is logged-in and returns info about the user (or redirects if an anonymous user tries to get access to protected pages) (works during SSR)

### Google/Facebook Provider

- Setup chosen auth provider following these instructions: `https://docs.amplify.aws/lib/auth/social/q/platform/js/#oauth-and-federation-overview`
- Go to the AWS Cognito console and choose `user-pool`
  - go to `Sign-in experience` tab
    - In `Federated identity provider sign-in` click on chosen provider-> Click `Edit provider information` -> Change `Client ID` and `Client secret` for those generated in the google/facebook console -> Save changes
  - go to `App integration` tab
    - In `App clients and analytics` choose cognito client you want to use (the same as in COGNITO_CLIENT in env) -> In `Hosted UI` click `Edit` -> Add rediret urls to `Allowed callback URLs` and `Allowed sign-out URLs` and add provider in `Identity Providers` -> Save changes
- Make sure you have all required ENVS:
  - COGNITO_CLIENT_ID
  - COGNITO_ISSUER
  - COGNITO_URL_LOGOUT
  - COGNITO_REGION
  - COGNITO_USER_POOL_ID
  - COGNITO_USER_POOL_WEB_CLIENT_ID
  - COGNITO_OAUTH_REDIRECT_SIGNIN
  - COGNITO_OAUTH_REDIRECT_SIGNOUT
  - COGNITO_OAUTH_DOMAIN
