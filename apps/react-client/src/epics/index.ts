import { deleteSavedSessionFromLocalStorageOnLogoutEpic } from './delete-saved-session-from-localstorage-on-logout.epic';
import { emailSignInApiCallEpic } from './email-sign-in-api-call.epic';
import { Epic } from 'redux-observable';
import { redirectAuthenticatedFromLoginPageEpic } from './redirect-authenticated-from-login-page.epic';
import { redirectOnLoginEpic } from './redirect-on-login.epic';
import { redirectUnauthenticatedToLoginPageEpic } from './redirect-unauthenticated-to-login-page.epic';
import { saveSessionToLocalStorageOnLoginEpic } from './save-session-to-localstorage-on-login.epic';
import { syncAppSessionWithSavedInLocalStorageSessionEpic } from './sync-session-with-saved-in-local-storage-session.epic';

// Add all root state epics to this array and they will be combined/added to epic middleware
export const appRootEpics: Array<Epic> = [
  redirectUnauthenticatedToLoginPageEpic,
  redirectAuthenticatedFromLoginPageEpic,
  saveSessionToLocalStorageOnLoginEpic,
  deleteSavedSessionFromLocalStorageOnLogoutEpic,
  syncAppSessionWithSavedInLocalStorageSessionEpic,
  redirectOnLoginEpic,
  emailSignInApiCallEpic,
];

// TODO: implement effect that handles hasToChangePassword === true after login success (also take this into account in redirect on login effect)
