import { createSelector } from 'reselect';
import { selectRootState } from './root-state.selector';

export const selectRoutePath = createSelector(
  [selectRootState],
  rootState =>
    rootState &&
    rootState.router &&
    rootState.router.location &&
    rootState.router.location.pathname,
);
