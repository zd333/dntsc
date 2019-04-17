import { EmployeesState } from './employees-state.interface';

export const EmployeesInitialState: EmployeesState = {
  employeesDict: {},
  fetchEmployeesApiRequestInProgress: false,
  saveEmployeeUpdatesApiRequestInProgress: false,
  createEmployeeRegistrationTokenInProgress: false,
  createdRegistrationToken: '',
};
