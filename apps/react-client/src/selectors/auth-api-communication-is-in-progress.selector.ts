import { createSelector } from 'reselect';
import { selectSessionState } from './session-state.selector';
import { selectUserIsLoggedIn } from './user-is-logged-in.selector';

export const selectAuthApiCommunicationIsInProgress = createSelector(
  [selectUserIsLoggedIn, selectSessionState],
  (userIsLoggedIn, sessionState) =>
    userIsLoggedIn ||
    !sessionState ||
    sessionState.authApiCommunicationIsInProgress,
);
