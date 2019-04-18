import { createEmployeeRegistrationTokenApiCallEpic } from './create-employee-registration-token-api-call.epic';
import { Epic } from 'redux-observable';
import { fetchEmployeesOnNvaigationToInventoryManagement } from './fetch-employees-on-navigation-to-employee-management.epic';
import { resetTokenOnNavigationToEmployeeInvitationEpic } from './reset-token-on-navigation-to-employee-invitation.epic';
import { searchEmployeesApiCallEpic } from './search-employees-api-call.epic';

// Add all employee state slice epics to this array and they will be combined/added to epic middleware
export const employeesEpics: Array<Epic> = [
  createEmployeeRegistrationTokenApiCallEpic,
  resetTokenOnNavigationToEmployeeInvitationEpic,
  searchEmployeesApiCallEpic,
  fetchEmployeesOnNvaigationToInventoryManagement,
];
