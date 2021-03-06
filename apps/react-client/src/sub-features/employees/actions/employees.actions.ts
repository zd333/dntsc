import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';
import { AppAccessRoles } from '@api/app-access-roles';
import { EmployeeDetailsOutDto } from '@api/sub-features/employees/dto/employee-details.out-dto';
import { EmployeeVM } from '../components/EmployeeListItem';
import { PaginatedListOutDto } from '@api/sub-features/shared/dto/paginated-list-out-dto.interface';
import {
  ApiError,
  createCommonErrorAction,
} from '../../../actions/error-modal.actions';

export enum EmployeesActionTypes {
  FETCH_EMPLOYEES_START = '[Employees] Fetch employees start',
  FETCH_EMPLOYEES_SUCCESS = '[Employees] Fetch employees success',
  FETCH_EMPLOYEES_ERROR = '[Employees] Fetch employees error',

  UPDATE_EMPLOYEE_START = '[Employees] Update employee start',
  UPDATE_EMPLOYEE_SUCCESS = '[Employees] Update employee success',
  UPDATE_EMPLOYEE_ERROR = '[Employees] Update employee error',

  CREATE_EMPLOYEE_REGISTRATION_TOKEN_START = '[Employees] Create employee registration token start',
  CREATE_EMPLOYEE_REGISTRATION_TOKEN_SUCCESS = '[Employees] Create employee registration token success',
  CREATE_EMPLOYEE_REGISTRATION_TOKEN_ERROR = '[Employees] Create employee registration token error',
  RESET_EMPLOYEE_REGISTRATION_TOKEN = '[Employees] Reset employee registration token',
}

export const EmployeesActions = {
  fetchEmployeesStart: () =>
    createAction(EmployeesActionTypes.FETCH_EMPLOYEES_START),
  fetchEmployeesSuccess: (payload: {
    readonly fetchResults: PaginatedListOutDto<EmployeeDetailsOutDto>;
  }) => createAction(EmployeesActionTypes.FETCH_EMPLOYEES_SUCCESS, payload),
  fetchEmployeesError: (payload: { readonly error?: ApiError }) =>
    createCommonErrorAction(EmployeesActionTypes.FETCH_EMPLOYEES_ERROR, {
      isCommonErrorAction: true,
      error: payload.error,
    }),

  updateEmployeeStart: (payload: {
    readonly updatedEmployee: EmployeeVM;
    readonly originalEmployee: EmployeeVM;
  }) => createAction(EmployeesActionTypes.UPDATE_EMPLOYEE_START, payload),
  updateEmployeeSuccess: () =>
    createAction(EmployeesActionTypes.UPDATE_EMPLOYEE_SUCCESS),
  updateEmployeeError: (payload: {
    readonly originalEmployee: EmployeeVM;
    readonly error?: ApiError;
  }) =>
    createCommonErrorAction(EmployeesActionTypes.UPDATE_EMPLOYEE_ERROR, {
      isCommonErrorAction: true,
      error: payload.error,
      originalEmployee: payload.originalEmployee,
    }),

  createEmployeeRegistrationTokenStart: (payload: {
    readonly roles?: Array<AppAccessRoles>;
  }) =>
    createAction(
      EmployeesActionTypes.CREATE_EMPLOYEE_REGISTRATION_TOKEN_START,
      payload,
    ),
  createEmployeeRegistrationTokenSuccess: (payload: {
    readonly registrationToken: string;
  }) =>
    createAction(
      EmployeesActionTypes.CREATE_EMPLOYEE_REGISTRATION_TOKEN_SUCCESS,
      payload,
    ),
  createEmployeeRegistrationTokenError: (payload: {
    readonly error?: ApiError;
  }) =>
    createCommonErrorAction(
      EmployeesActionTypes.CREATE_EMPLOYEE_REGISTRATION_TOKEN_ERROR,
      {
        isCommonErrorAction: true,
        error: payload.error,
      },
    ),
  resetEmployeeRegistrationToken: () =>
    createAction(EmployeesActionTypes.RESET_EMPLOYEE_REGISTRATION_TOKEN),
};

export type AllEmployeesActions = ActionsUnion<typeof EmployeesActions>;
