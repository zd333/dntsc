import { Epic } from 'redux-observable';
import { redirectAuthenticatedFromLoginPageEpic } from './redirect-authenticated-from-login-page.epic';
import { redirectUnauthenticatedToLoginPageEpic } from './redirect-unauthenticated-to-login-page.epic';
import { emailSignInApiCall } from './email-sign-in-api-call.epic';

// Add all root state epics to this array and they will be combined/added to epic middleware
export const appRootEpics: Epic[] = [
  redirectUnauthenticatedToLoginPageEpic,
  redirectAuthenticatedFromLoginPageEpic,
  emailSignInApiCall,
];

// TODO: implement effect that handles hasToChangePassword === true after login success
