import { createSelector } from 'reselect';
import { selectSessionState } from './session-state.selector';

export const selectCurrentUserName = createSelector(
  [selectSessionState],
  session => (session && session.userName) || '',
);
