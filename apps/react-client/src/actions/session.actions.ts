import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';
import { ApiError, createCommonErrorAction } from './error-modal.actions';
import { AppAccessRoles } from '@api/app-access-roles';
import { AppLanguages } from '../../src/reducers/session-state.interface';
import { PlatformFeatures } from '@api/sub-features/tenants/db-schemas/tenant.db-schema';

export enum SessionActionTypes {
  LOGIN_START = '[Session] Login start',
  LOGIN_SUCCESS = '[Session] Login success',
  LOGIN_ERROR = '[Session] Login error',

  REFRESH_SESSION_START = '[Session] Refresh session start',
  REFRESH_SESSION_SUCCESS = '[Session] Refresh session success',
  REFRESH_SESSION_ERROR = '[Session] Refresh session error',

  LOGOUT = '[Session] Logout',

  GET_FEATURES_START = '[Session] Get features start',
  GET_FEATURES_SUCCESS = '[Session] Get features success',
  GET_FEATURES_ERROR = '[Session] Get features error',

  CHANGE_LANGUAGE = '[Session] change language',

  REGISTER_EMPLOYEE_START = '[Session] Register via token start',
  REGISTER_EMPLOYEE_SUCCESS = '[Session] Register via token success',
  REGISTER_EMPLOYEE_ERROR = '[Session] Register via token error',
}

export const SessionActions = {
  loginStart: (payload: {
    readonly login: string;
    readonly password: string;
  }) => createAction(SessionActionTypes.LOGIN_START, payload),
  loginSuccess: (payload: {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly userRoles: Array<AppAccessRoles>;
    readonly userName: string;
  }) => createAction(SessionActionTypes.LOGIN_SUCCESS, payload),
  loginError: (payload: { readonly error?: ApiError }) =>
    createCommonErrorAction(SessionActionTypes.LOGIN_ERROR, {
      isCommonErrorAction: true,
      error: payload.error,
    }),

  refreshSessionStart: () =>
    createAction(SessionActionTypes.REFRESH_SESSION_START),
  refreshSessionSuccess: (payload: {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly userRoles: Array<AppAccessRoles>;
    readonly userName: string;
  }) => createAction(SessionActionTypes.REFRESH_SESSION_SUCCESS, payload),
  refreshSessionError: (payload: { readonly error?: ApiError }) =>
    createCommonErrorAction(SessionActionTypes.REFRESH_SESSION_ERROR, {
      isCommonErrorAction: true,
      error: payload.error,
    }),

  logout: () => createAction(SessionActionTypes.LOGOUT),

  getFeaturesStart: () => createAction(SessionActionTypes.GET_FEATURES_START),
  getFeaturesSuccess: (payload: {
    readonly features: Array<PlatformFeatures>;
  }) => createAction(SessionActionTypes.GET_FEATURES_SUCCESS, payload),
  getFeaturesError: (payload: { readonly error?: ApiError }) =>
    createCommonErrorAction(SessionActionTypes.GET_FEATURES_ERROR, {
      isCommonErrorAction: true,
      error: payload.error,
    }),

  changeLanguage: (payload: { readonly language: AppLanguages }) =>
    createAction(SessionActionTypes.CHANGE_LANGUAGE, payload),

  registerEmployeeStart: (payload: {
    readonly login: string;
    readonly password: string;
    readonly name: string;
    readonly registrationToken: string;
  }) => createAction(SessionActionTypes.REGISTER_EMPLOYEE_START, payload),
  registerEmployeeSuccess: (payload: {
    readonly login: string;
    readonly password: string;
  }) => createAction(SessionActionTypes.REGISTER_EMPLOYEE_SUCCESS, payload),
  registerEmployeeError: (payload: { readonly error?: ApiError }) =>
    createCommonErrorAction(SessionActionTypes.REGISTER_EMPLOYEE_ERROR, {
      isCommonErrorAction: true,
      error: payload.error,
    }),
};

export type AllSessionActions = ActionsUnion<typeof SessionActions>;
