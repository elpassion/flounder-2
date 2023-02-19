> This is a [React Native](https://reactnative.dev/) project - app `mobile`.

## Installation

```bash
$ pnpm install
```

If project was created from template go to android directory and run:

```bash
$ gradle wrapper
```

If you want to run iOS:
```bash
pnpm nx install-ios-pods mobile
```

## Configuration setup

Mobile env are configured during general env decryption described in [Main README - Required setup after generating new project section](../../README.md#required-setup-after-generating-new-project-from-flounder).

AWS Cognito related envs come from `xxx-stg-public-user-pool-client-without-secret` cognito app.

👉 If you want to add new `env` variables, you have to add them both to `.env` and `apps/mobile/src/types/env.d.ts` files.  

👉 Additionally you have to import and export them in `apps/mobile/src/utils/env.ts`. 
It is connected with bug described here: [babel plugin bug](https://github.com/istanbuljs/babel-plugin-istanbul/issues/116#issuecomment-385741823)

👉 Remember that when you add environment variables you have to update secrets (needed for deployment). 
Go to github repo -> Settings -> Security -> Secrets and variables -> Actions. 
Now add new repository secrets or modify the existing ones.  

After adding new secret you have to update mobile deployment workflow (maybe you have to update variables of only one platform - android or ios or both).  
Workflow location: `.github/workflows/deploy-mobile.yml`

Just add your variables to the rest of them  
Android part:
```yaml
      - name: Upload to Google Internal Tests with Fastlane
        run: pnpm run fastlane:buildAndroid
        env:
          YOUR_VARIABLE: ${{ secrets.YOUR_VARIABLE }}
```
iOS part:
```yaml
      - name: Upload to Testflight with Fastlane
        run: pnpm run fastlane:buildIos
        env:
          YOUR_VARIABLE: ${{ secrets.YOUR_VARIABLE }}
```
## How To Use Environment Variables

```ts
import env from '../../utils/env';

env.YOUR_VARIABLE
```

## Running the app

```bash
# to run android on simulator/device
$ npm nx run-android mobile

# to run iso on simulator/device
$ npm nx run-ios mobile
```

Use npm in above commands, with pnpm react-native application won't start

## Deploying the app to Google Internal Test and Testflight

#### Before deploying

In console inside IDE run this command:

```bash
$ pnpm nx install-ios-pods mobile
```

Inside mobile/android/fastlane and mobile/ios/fastlane \
Configure `.env` file based on `.env.development`

Ensure that you have:

- google api key file (.json) inside `mobile/android` directory
- release keystore file (.keystore) inside `mobile/android/fastlane` directory
- apple api key file (.p8) inside `mobile/ios/fastlane`

#### Deploy

```bash
# to deploy android
$ pnpm nx fastlane-deploy-android mobile

# to deploy ios
$ pnpm nx fastlane-deploy-ios mobile
```

### 📱 Download the app from store

If you would like to download mobile app from store

- Android - your email has to be added to `testers` group on Google and you have to get the link to download app
- iOS - you have to be added as `developer` to `App Store Connect` and get email invitation to `Testflight`

## Project dependencies

Mobile app uses project libs: `contracts`, `http-client`

## Project modules

- **Components**

  Includes basic components like `NavigationBar`, `StyledButton` etc.

  - NavigationBar (Header) - application's top bar component with menu button
  - PageContainer - it wraps the app screen with safe area view and scroll view (so the whole page content should be visible) - every screen should use that component

- **Context**

  Providers for styling (react-native-paper) and store (react-redux)

- **Hooks**

  Custom hooks, eg. drawer hooks

- **Reducers**

  Grouped app states with functions to mutate that states, eg. in user reducer set isFetching to true before fetching user from api so you could show spinner, after request is completed set isFetching to false and hide spinner

- **Screens**

  App screens

- **Routes**

  Handling navigation between screens

- **Services**

  Communication with API, filling the store with the data that will probably be shown somewhere, managing secure storage

  - Auth (register, confirm, login user, forgot password, refresh session) flow via Cognito - Currently only one auth flow is implemented - `Cognito Hosted-UI`. - Registration only with email
  - User
  - Storage - secure storage for keeping sensitive data like tokens. Data is encrypted before being saved
  - `MobileHttpClientWithSession` - it extends HttpClient module, it adds token to every API request

- **Store**

  Redux toolkit store setup, persistor is used so state is retrieved after reopening app (user session is retrieved after reopening app)

- **Theme**

  App styles theme setup, eg. colors, font sizes, images

- **Types**

  Additional types, needed for react-native-dotenv

- **Utils**

  Helper functions, eg. decoding and checking expiration of jwt token

- **Theme**

  App styling eg. colors, font sizes, margins etc. and images

## Known issues

- **Failing mobile tests**
  - problem with hooks (for example wrong usage)
  - problem with environment variables like API_URL  
  
  If you have one of problems above try to delete node_modules from mobile app and then run tests one more time

## Manually triggered deploy count

🐟 🐟 🐟 🐟
