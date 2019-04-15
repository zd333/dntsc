import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';
import { AppAccessRoles } from '@api/app-access-roles';
import {
  ApiError,
  createCommonErrorAction,
} from '../../../actions/error-modal.actions';

export enum EmployeesActionTypes {
  CREATE_EMPLOYEE_REGISTRATION_TOKEN_START = '[Employees actions] Create employee registration token start',
  CREATE_EMPLOYEE_REGISTRATION_TOKEN_SUCCESS = '[Employees actions] Create employee registration token success',
  CREATE_EMPLOYEE_REGISTRATION_TOKEN_ERROR = '[Employees actions] Create employee registration token error',
}

export const EmployeesActions = {
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
};

export type AllEmployeesActions = ActionsUnion<typeof EmployeesActions>;
