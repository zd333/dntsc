import { createEmployeeRegistrationTokenApiCallEpic } from './create-employee-registration-token-api-call.epic';
import { Epic } from 'redux-observable';

// Add all employee state slice epics to this array and they will be combined/added to epic middleware
export const employeesEpics: Array<Epic> = [
  createEmployeeRegistrationTokenApiCallEpic,
];
