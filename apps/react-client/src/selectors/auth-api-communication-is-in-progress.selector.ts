import { createSelector } from 'reselect';
import { selectSessionState } from './session-state.selector';

export const selectAuthApiCommunicationIsInProgress = createSelector(
  [selectSessionState],
  sessionState =>
    !!sessionState && sessionState.authApiCommunicationIsInProgress,
);
