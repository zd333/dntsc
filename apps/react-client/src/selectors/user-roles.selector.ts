import { createSelector } from 'reselect';
import { selectSessionState } from './session-state.selector';

export const selectUserRoles = createSelector(
  [selectSessionState],
  sessionState => (sessionState && sessionState.userRoles) || [],
);
