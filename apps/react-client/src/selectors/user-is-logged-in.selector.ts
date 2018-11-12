import { createSelector } from 'reselect';
import { selectSessionState } from './session-state.selector';

export const selectUserIsLoggedIn = createSelector(
  [selectSessionState],
  sessionState => !!sessionState && !!sessionState.isLoggedIn,
);
