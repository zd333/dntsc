import { createEmployeeRegistrationTokenApiConnector } from './create-employee-registration-token.api-connector';
import { searchEmployeesApiConnector } from './search-employees.api-connector';
import { updateEmployeeApiConnector } from './update-employee.api-connector';

export const employeesApiConnectors = {
  createEmployeeRegistrationTokenApiConnector,
  searchEmployeesApiConnector,
  updateEmployeeApiConnector,
};
