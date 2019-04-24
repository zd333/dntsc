import { createSelector } from 'reselect';
import { selectEmployeesState } from './eployees-state.selector';

export const selectCreatedEmployeeRegistrationToken = createSelector(
  [selectEmployeesState],
  employeesState => employeesState && employeesState.createdRegistrationToken,
);
