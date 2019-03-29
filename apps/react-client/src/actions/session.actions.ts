import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';
import { ApiError, createCommonErrorAction } from './error-modal.actions';
import { AppAccessRoles } from '@api/app-access-roles';
import { PlatformFeatures } from '@api/sub-features/tenants/db-schemas/tenant.db-schema';
import { SessionState } from '../../src/reducers/session-state.interface';

export enum SessionActionTypes {
  EMAIL_LOGIN_START = '[Session actions] Email login start',
  EMAIL_LOGIN_SUCCESS = '[Session actions] Email login success',
  EMAIL_LOGIN_ERROR = '[Session actions] Email login error',

  LOGOUT = '[Session actions] Logout',

  GET_FEATURES_START = '[Session actions] Get features start',
  GET_FEATURES_SUCCESS = '[Session actions] Get features success',
  GET_FEATURES_ERROR = '[Session actions] Get features error',

  CHANGE_LANGUAGE = '[Session actions] change language',
}

export const SessionActions = {
  emailLoginStart: (payload: {
    readonly email: string;
    readonly password: string;
  }) => createAction(SessionActionTypes.EMAIL_LOGIN_START, payload),
  emailLoginSuccess: (payload: {
    readonly emailAccessToken: string;
    readonly userRoles: Array<AppAccessRoles>;
    readonly userName: string;
    readonly hasToChangePassword?: boolean;
  }) => createAction(SessionActionTypes.EMAIL_LOGIN_SUCCESS, payload),
  emailLoginError: (payload: { readonly error?: ApiError }) =>
    createCommonErrorAction(SessionActionTypes.EMAIL_LOGIN_ERROR, {
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

  changeLanguage: (payload: {
    readonly language: SessionState['currentLanguage'];
  }) => createAction(SessionActionTypes.CHANGE_LANGUAGE, payload),
};

export type AllSessionActions = ActionsUnion<typeof SessionActions>;
