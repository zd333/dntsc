import { createSelector } from 'reselect';
import { selectEmployeesState } from './eployees-state.selector';

export const selectEmployeeManagementPageIsBusy = createSelector(
  [selectEmployeesState],
  employeesState =>
    (!!employeesState && employeesState.fetchEmployeesApiRequestInProgress) ||
    !!employeesState.saveEmployeeUpdatesApiRequestInProgress,
);
