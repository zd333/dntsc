import { emailSignInApiCall } from './email-sign-in-api-call.epic';
import { Epic } from 'redux-observable';
import { redirectAuthenticatedFromLoginPageEpic } from './redirect-authenticated-from-login-page.epic';
import { redirectUnauthenticatedToLoginPageEpic } from './redirect-unauthenticated-to-login-page.epic';

// Add all root state epics to this array and they will be combined/added to epic middleware
export const appRootEpics: Array<Epic> = [
  redirectUnauthenticatedToLoginPageEpic,
  redirectAuthenticatedFromLoginPageEpic,
  emailSignInApiCall,
];

// TODO: implement effect that handles hasToChangePassword === true after login success
