import { createSelector } from 'reselect';
import { selectRootState } from '../../../selectors/root-state.selector';

export const selectEmployeesState = createSelector(
  [selectRootState],
  rootState => rootState && rootState.employees,
);
