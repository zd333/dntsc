import { EmployeesInitialState } from './employees-initial-state';
import { EmployeesState } from './employees-state.interface';
import {
  AllEmployeesActions,
  EmployeesActionTypes,
} from '../actions/amployees.actions';

export function employeesReducer(
  state: EmployeesState = EmployeesInitialState,
  action: AllEmployeesActions,
): EmployeesState {
  switch (action.type) {
    case EmployeesActionTypes.CREATE_EMPLOYEE_REGISTRATION_TOKEN_START: {
      return {
        ...state,
        createEmployeeRegistrationTokenInProgress: true,
      };
    }
    case EmployeesActionTypes.CREATE_EMPLOYEE_REGISTRATION_TOKEN_SUCCESS: {
      const { registrationToken } = action.payload;

      return {
        ...state,
        createEmployeeRegistrationTokenInProgress: false,
        createdRegistrationToken: registrationToken,
      };
    }
    case EmployeesActionTypes.RESET_EMPLOYEE_REGISTRATION_TOKEN:
    case EmployeesActionTypes.CREATE_EMPLOYEE_REGISTRATION_TOKEN_ERROR: {
      return {
        ...state,
        createEmployeeRegistrationTokenInProgress: false,
        createdRegistrationToken: '',
      };
    }

    default:
      return state;
  }
}
