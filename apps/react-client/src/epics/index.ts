import { Epic } from 'redux-observable';
import { redirectAuthenticatedFromLoginPageEpic } from './redirect-authenticated-from-login-page.epic';
import { redirectUnauthenticatedEpic } from './redirect-unauthenticated.epic';

// Add all root state epics to this array and they will be combined/added to epic middleware
export const appRootEpics: Epic[] = [
  redirectUnauthenticatedEpic,
  redirectAuthenticatedFromLoginPageEpic,
];
