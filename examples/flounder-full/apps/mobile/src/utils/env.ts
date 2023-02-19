import {
  COGNITO_CLIENT_ID,
  COGNITO_ISSUER,
  COGNITO_LOGIN_REDIRECT,
  COGNITO_LOGOUT_REDIRECT,
  COGNITO_URL,
  API_URL,
} from '@env';

// fixing problem while running mobile tests with code-coverage flag
// ReferenceError: /apps/mobile/src/services/auth/AuthService.ts: Container is falsy
// > 1 | export * from './AuthService';
// https://github.com/istanbuljs/babel-plugin-istanbul/issues/116#issuecomment-385741823
export default {
  COGNITO_CLIENT_ID,
  COGNITO_ISSUER,
  COGNITO_LOGIN_REDIRECT,
  COGNITO_LOGOUT_REDIRECT,
  COGNITO_URL,
  API_URL,
};
