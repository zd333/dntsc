import { createSelector } from 'reselect';
import { selectRootState } from './root-state.selector';

export const selectSessionState = createSelector(
  [selectRootState],
  rootState => rootState && rootState.session,
);
