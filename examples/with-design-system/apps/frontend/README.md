> This is a [Next.js](https://nextjs.org/) project - app `frontend`.

## Installation

Frontend packages are installed during installation in root directory by

```bash
$ pnpm install
```

## Configuration setup

Frontend env are configured during general env decryption described in [Main README - Required setup after generating new project section](../../README.md#required-setup-after-generating-new-project-from-flounder).

AWS Cognito related envs come from `xxx-stg-public-user-pool-client-without-secret` cognito app.

## How To Use Environment Variables

Client-side part of `Next` app can use environment variables from `.env` files via `AuthConfigProvider` imported from `@flounder/next-utils` (cognito related envs) and via specific providers - they are used in `AppConfigProvider`.

### Using new variables from `.env`

1. In `modules/AppConfig/AppConfig.ts` in `AppConfig` class, add new getter that returns an object with new env & return it in `config` getter.

```ts
export class AppConfig {
  get newConfig() {
    return {
      newEnv: this.getOrThrow('NEW_ENV'),
    }
  }
  get config() {
    return {
      [existed configs],
      newConfig: this.newConfig,
    }
  }
}
```

2. Add your new provider to `AppConfigProvider` file.

```tsx
export const AppConfigProvider = ({ config, children }: IAppConfigProviderProps) => {
  const { newConfig, otherConfigs } = config;

  return (
    <OtherProvider config={otherConfigs}>
      <NewConfigProvider>{children}</NewConfigProvider>
    </OtherProvider>
  );
};
```

## Running the app

To run only frontend app (without backend):

```bash
pnpm nx run frontend:serve
```

Open [http://localhost:3000] with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

Individual pages import page components from `modules/Pages` directory and use `withSession` function for wrapping authorization logic.

The application provides healthcheck endpoint. It's accessible via: [http://localhost:3000/api/ping]

## Translations

The project uses [react-intl](https://formatjs.io/docs/getting-started/installation) library for handling internationalization. The extraction of default messages (for English) and compilation of all extracted messages is triggered automatically before `build` and `serve` targets. You can trigger this process manually by running

```
pnpm nx run frontend:translate
```

### Supported languages

The app currently supports two languages (English and Polish) with English as the default. You can find the source files used by the message compilation process in two locations

- `lang/exctracted` has automatically extracted default messages for default locale (`en`) and manually added messages for other locales.
- `lang/compiled` contains messages generated from extracted messages. These files are imported in the app and should not be edited manually.

To view the app with Polish translations visit [http://localhost:3000/pl/](http://localhost:3000/pl/)

## Open storybook

Run this in project root:

```
pnpm run storybook
```

all components from storybook are in:

```
libs/ui
```

and you can import them as:

```
import { ComponentName } from '@flounder/ui';
```

## Project dependencies

[comment]: <> (TODO: add link to ready README)
[comment]: <> (TODO: add nx-graph image)
Frontend app use project libs: `ui`, `contracts`, `shared-apis`, `cognito-auth`, `next-utils`, `http-client`, `ts-utils`.

For detailed graph dependencies run `pnpm nx graph`.

## Project details

- **Next.js custom server**
  - The project uses a custom `Next.js` server. All related files are stored inside `src/next-server` directory.
- **Styling**
  - The project uses classes from [tailwind](https://tailwindcss.com/) library for styling components. Components imported from `@flounder/ui` library also use `tailwind`.

## Project modules

- **AppConfig**
  - The `AppConfig` class with `env` getters
  - `AppConfigProvider` - a wrapper for each global Provider populating config data.
- **CustomAuth**
  - Complete flow: register, confirm, login user, forgot password, resend confirmation code, refresh session - via Cognito Amplify implemented - connected with `Auth` module from libs.
  - Currently ,you can choose between custom and `Cognito Hosted-UI` auth flows. The default is set to `custom`. If you want to use `Hosted-UI`, you have to set `custom` flag inside `Header.tsx` to false.
- **Emails**
  - Enables sending example emails. Contains `form`, `hook` and test handler.
- **Forms**
  - Reusable components from `@flounder/ui` connected with logic from `react-hook-form`. You can find, for example, various `inputs` (including `S3 File Input`) and components for handling errors or `label`.
- **Header**
  - Displays information about logged-in user and buttons for login / logout action.
- **Layout**
  - Layout components - sidebar, modal, navigation etc.
- **Newsletter**
  - Enables sending the newsletter. Contains `form` with subscription to newsletter feature, `hook` and test `handlers`.
- **Notification**
  - `NotificationWebSocketContext` and `useNotification` hook with exposed methods to handle notification websockets.
- **Pages**
  - Module stores page components that are imported in files inside `pages` directory.
- **Toast**
  - Frontend app uses [react-hot-toast](https://react-hot-toast.com) library for handling toast. The module contains helper methods to display toast components from `@flounder-ui`.
- **User**
  - Components related to `Users` page and handle displaying user list (`hook` for displaying and mutating data & `UserList` component).
- **UserProfile**
  - User profile page with edit personal data feature (first and last name, avatar), including uploading new avatar image.

## Manually triggered deploy count

🐟 🐟 🐟 🐟 🐟 🐟 🐟 🐟 🐟 🐟 🐟 🐟
