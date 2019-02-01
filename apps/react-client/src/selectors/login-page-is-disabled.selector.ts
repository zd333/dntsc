import { createSelector } from 'reselect';
import { selectSessionState } from './session-state.selector';
import { selectUserIsLoggedIn } from './user-is-logged-in.selector';

/**
 * Disable (fade out and show spinner) login page if user is logged in
 * or authentication API communication is in progress.
 */
export const selectLoginPageIsDisabled = createSelector(
  [selectUserIsLoggedIn, selectSessionState],
  (userIsLoggedIn, sessionState) =>
    userIsLoggedIn ||
    !sessionState ||
    sessionState.authApiCommunicationIsInProgress,
);
