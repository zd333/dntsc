import { createSelector } from 'reselect';
import { selectSessionState } from './session-state.selector';

export const selectAvailableFeatures = createSelector(
  [selectSessionState],
  sessionState => (sessionState && sessionState.availableFeatures) || [],
);
