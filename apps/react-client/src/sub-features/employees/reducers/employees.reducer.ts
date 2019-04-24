import { arrayToDictionary } from '../../../shared/helpers/array-to-dictionary';
import { EmployeesInitialState } from './employees-initial-state';
import { EmployeesState } from './employees-state.interface';
import {
  AllEmployeesActions,
  EmployeesActionTypes,
} from '../actions/employees.actions';

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

    case EmployeesActionTypes.FETCH_EMPLOYEES_START: {
      return {
        ...state,
        fetchEmployeesApiRequestInProgress: true,
      };
    }
    case EmployeesActionTypes.FETCH_EMPLOYEES_SUCCESS: {
      const {
        fetchResults: { items },
      } = action.payload;
      const newEmployeesDict = arrayToDictionary(items, 'id');
      // Merge new results
      const employeesDict = {
        ...state.employeesDict,
        ...newEmployeesDict,
      };

      return {
        ...state,
        employeesDict,
        fetchEmployeesApiRequestInProgress: false,
      };
    }
    case EmployeesActionTypes.FETCH_EMPLOYEES_ERROR: {
      return {
        ...state,
        fetchEmployeesApiRequestInProgress: false,
      };
    }

    case EmployeesActionTypes.UPDATE_EMPLOYEE_START: {
      const { updatedEmployee } = action.payload;
      // Optimistically update state
      const employeesDict = {
        ...state.employeesDict,
        [updatedEmployee.id]: updatedEmployee,
      };

      return {
        ...state,
        employeesDict,
        saveEmployeeUpdatesApiRequestInProgress: true,
      };
    }
    case EmployeesActionTypes.UPDATE_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        saveEmployeeUpdatesApiRequestInProgress: false,
      };
    }
    case EmployeesActionTypes.UPDATE_EMPLOYEE_ERROR: {
      const { originalEmployee } = action.payload;
      // Revert optimistic updates
      const employeesDict = {
        ...state.employeesDict,
        [originalEmployee.id]: originalEmployee,
      };

      return {
        ...state,
        employeesDict,
        saveEmployeeUpdatesApiRequestInProgress: false,
      };
    }

    default:
      return state;
  }
}
