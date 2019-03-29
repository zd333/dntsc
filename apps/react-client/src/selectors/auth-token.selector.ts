import { createSelector } from 'reselect';
import { selectSessionState } from './session-state.selector';

export const selectAuthToken = createSelector(
  [selectSessionState],
  sessionState => sessionState && sessionState.authToken,
);
