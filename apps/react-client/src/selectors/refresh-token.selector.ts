import { createSelector } from 'reselect';
import { selectSessionState } from './session-state.selector';

export const selectRefreshToken = createSelector(
  [selectSessionState],
  sessionState => sessionState && sessionState.refreshToken,
);
