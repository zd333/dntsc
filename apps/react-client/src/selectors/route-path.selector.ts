import { createSelector } from 'reselect';
import { selectRootState } from './root-state.selector';

/**
 * ! Avoid using this, in most cases you need `appRoutesMatchSelectors`!
 */
export const selectRoutePath = createSelector(
  [selectRootState],
  rootState =>
    rootState &&
    rootState.router &&
    rootState.router.location &&
    rootState.router.location.pathname,
);
