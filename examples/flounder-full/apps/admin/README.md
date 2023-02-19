> This is a project based on [refine](https://refine.dev/) - app `admin`.

## Installation

Admin packages are installed during installation in root directory by

```bash
$ pnpm install
```

## Configuration setup

Backend envs are configured using general env decryption described in [Main README - Required setup after generating new project section](../../README.md#required-setup-after-generating-new-project-from-flounder).

AWS Cognito related envs come from `xxx-stg-public-user-pool-client-without-secret` cognito app.

## How To Use Environment Variables

Client-side part of `Next` app can use environment variables from `.env` files via `ConfigContext` module imported from `@flounder/next-utils`.

## Running the app

To run only admin app (without backend):

```bash
pnpm nx run admin:serve
```

Open [http://localhost:3002](http://localhost:3002) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

Inside `pages/_app.tsx` you can setup main `Refine` functions as `dataProvider`, `authProvider` etc.

The application provides healthcheck endpoint. It's accessible via: [http://localhost:3002/api/ping](http://localhost:3002/api/ping)

## Project dependencies

[comment]: <> (TODO: add link to ready README)
[comment]: <> (TODO: add nx-graph image)
Admin app uses project libs: `ui`, `contracts`, `cognito-auth`, `next-utils`, `http-client`, `ts-utils`.

For detailed graph of dependencies run `pnpm nx graph`.

## Project details

### Styling

The project uses components from `@pankod/refine-antd` UI framework package (`ant` design system) and custom inline-styled components. `Tailwind` library still needs to be configured for usage in admin panel.

### Next.js custom server

The project uses custom `Next.js` server. All related files are stored inside `src/next-server` directory.

### What actions are implemented for each Resource?

#### Resource Users

- displaying user list
- editing users data (first, last name), avatar, description
- directly managing `AWS Cognito` groups the user belongs
- blocking / unblocking user

#### Resource Events

- displaying events list (sent newsletter) - function of resending newsletter is not implemented

#### Resource Feature Flags

- displaying feature flags list and managing their state (turn on /off)

## Project modules

- **Api**
  - `useApi` hook that exposes main custom actions (blocking users, managing groups etc.)
  - Apis related to managing uploading files (`ImageApi` & `S3Api`).
- **CustomSignInForm**
  - Sing In `refine` custom form, that uses sign in logic from `@flounder/cognito-auth` lib.
- **Forms**
  - Custom components used in `CustomSignInForm` (may be reusable) and not fully implemented `NewsletterForm`.
- **Pages**
  - Not resource-related pages components (ex. `HomePage` & `LoginPage`).
- **Resources**
  - Components related to resources managed by `refine` - now `users`, `events` & `feature-flags`.

## Manually triggered deploy count

🐟
