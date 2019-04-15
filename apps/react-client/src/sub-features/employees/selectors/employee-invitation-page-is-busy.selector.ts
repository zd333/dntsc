import { createSelector } from 'reselect';
import { selectEmployeesState } from './eployees-state.selector';

export const selectEmployeeInvitationPageIsBusy = createSelector(
  [selectEmployeesState],
  employeesState =>
    !!employeesState &&
    employeesState.createEmployeeRegistrationTokenInProgress,
);
