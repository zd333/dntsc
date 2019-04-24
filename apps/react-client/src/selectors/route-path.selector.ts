import { createSelector } from 'reselect';
import { selectRootState } from './root-state.selector';

// TODO: refactor most of units that use this selector with `createMatchSelector`
export const selectRoutePath = createSelector(
  [selectRootState],
  rootState =>
    rootState &&
    rootState.router &&
    rootState.router.location &&
    rootState.router.location.pathname,
);
