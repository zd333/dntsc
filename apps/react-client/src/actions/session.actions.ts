import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';

export enum SessionActionTypes {
  EMAIL_LOGIN_START = '[Session actions] Email login start',
  EMAIL_LOGIN_SUCCESS = '[Session actions] Email login success',
  EMAIL_LOGIN_ERROR = '[Session actions] Email login error',
}

export const SessionActions = {
  emailLoginStart: (payload: {
    readonly email: string;
    readonly password: string;
  }) => createAction(SessionActionTypes.EMAIL_LOGIN_START, payload),
  emailLoginSuccess: (payload: { readonly emailAccessToken: string }) =>
    createAction(SessionActionTypes.EMAIL_LOGIN_SUCCESS, payload),
  emailLoginError: (payload: { readonly errorMessage: string }) =>
    createAction(SessionActionTypes.EMAIL_LOGIN_ERROR, payload),
};

export type AllSessionActions = ActionsUnion<typeof SessionActions>;
