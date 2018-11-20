import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';
import { createCommonErrorAction } from './error-modal.actions';
import { SessionState } from 'src/reducers/session-state.interface';

export enum SessionActionTypes {
  EMAIL_LOGIN_START = '[Session actions] Email login start',
  EMAIL_LOGIN_SUCCESS = '[Session actions] Email login success',
  EMAIL_LOGIN_ERROR = '[Session actions] Email login error',

  CHANGE_LANGUAGE = '[Session actions] change language',
}

export const SessionActions = {
  emailLoginStart: (payload: {
    readonly email: string;
    readonly password: string;
  }) => createAction(SessionActionTypes.EMAIL_LOGIN_START, payload),
  emailLoginSuccess: (payload: { readonly emailAccessToken: string }) =>
    createAction(SessionActionTypes.EMAIL_LOGIN_SUCCESS, payload),
  emailLoginError: (payload: { readonly errorMessage: string }) =>
    createCommonErrorAction(SessionActionTypes.EMAIL_LOGIN_ERROR, {
      isCommonErrorAction: true,
      errorMessage: payload.errorMessage,
    }),
  changeLanguage: (payload: {
    readonly language: SessionState['currentLanguage'];
  }) => createAction(SessionActionTypes.EMAIL_LOGIN_SUCCESS, payload),
};

export type AllSessionActions = ActionsUnion<typeof SessionActions>;
