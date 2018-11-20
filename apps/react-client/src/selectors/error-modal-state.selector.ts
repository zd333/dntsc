import { createSelector } from 'reselect';
import { selectRootState } from './root-state.selector';

export const selectErrorModalState = createSelector(
  [selectRootState],
  rootState => rootState && rootState.errorModal,
);
