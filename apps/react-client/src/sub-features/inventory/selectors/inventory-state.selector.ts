import { createSelector } from 'reselect';
import { selectRootState } from '../../../selectors/root-state.selector';

export const selectInventoryState = createSelector(
  [selectRootState],
  rootState => rootState && rootState.inventory,
);
