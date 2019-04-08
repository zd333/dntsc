import { deleteSavedSessionFromLocalStorageOnLogoutEpic } from './delete-saved-session-from-localstorage-on-logout.epic';
import { Epic } from 'redux-observable';
import { getFeaturesApiCallEpic } from './get-features-api-call.epic';
import { getFeaturesOnStartupEpic } from './get-features-on-startup.epic';
import { redirectAuthenticatedFromLoginPageEpic } from './redirect-authenticated-from-login-page.epic';
import { redirectOnLoginEpic } from './redirect-on-login.epic';
import { redirectOnLogoutEpic } from './redirect-on-logout.epic';
import { redirectUnauthenticatedToLoginPageEpic } from './redirect-unauthenticated-to-login-page.epic';
import { refreshEmployeeSessionApiCallEpic } from './refresh-employee-session-api-call.epic';
import { saveSessionToLocalStorageOnLoginEpic } from './save-session-to-localstorage-on-login.epic';
import { signInEmployeeApiCallEpic } from './sign-in-employee-api-call.epic';
import { syncAppSessionWithSavedInLocalStorageSessionEpic } from './sync-session-with-saved-in-local-storage-session.epic';

// Add all root state epics to this array and they will be combined/added to epic middleware
export const appRootEpics: Array<Epic> = [
  deleteSavedSessionFromLocalStorageOnLogoutEpic,
  signInEmployeeApiCallEpic,
  getFeaturesApiCallEpic,
  getFeaturesOnStartupEpic,
  redirectAuthenticatedFromLoginPageEpic,
  redirectOnLoginEpic,
  redirectOnLogoutEpic,
  redirectUnauthenticatedToLoginPageEpic,
  saveSessionToLocalStorageOnLoginEpic,
  syncAppSessionWithSavedInLocalStorageSessionEpic,
  refreshEmployeeSessionApiCallEpic,
];

// TODO: implement effect that handles hasToChangePassword === true after login success (also take this into account in redirect on login effect)
