import { Action } from '@martin_hotell/rex-tils/types/redux/types';
import { AjaxError } from 'rxjs/ajax';
import { createAction } from '@martin_hotell/rex-tils';

// TODO: clarify what is this object and if this is `AjaxError` or not
// export type ApiError = AjaxError;
export interface ApiError {
  readonly error?: string;
  // tslint:disable-next-line:no-any
  readonly message?: Array<any>;
}

/**
 * Definition of this state slice is not standard
 * (does not follow convention due to it is very specific)
 * (designed to catch common error actions from all other state slices).
 * ! Do not copy-paste this code to define actions for new state slices!
 */

export const CLOSE_ERROR_NOTIFICATION_MODAL_ACTION_TYPE =
  '[Error modal] Close error notification modal';

export const closeErrorNotificationModalAction = () =>
  createAction(CLOSE_ERROR_NOTIFICATION_MODAL_ACTION_TYPE);

/**
 * This helper must be used to defined all global/common error actions
 * which require common error notification with modal
 */
export function createCommonErrorAction<
  T extends string,
  P extends CommonErrorActionPayload
>(type: T, payload: P): Action<T, P> {
  return createAction(type, payload);
}

export interface CommonErrorActionPayload {
  readonly isCommonErrorAction: true;
  /**
   * This can become type union if there are more than one type of error object
   */
  readonly error?: ApiError;
}

export type CommonErrorAction = Action<string, CommonErrorActionPayload>;

/**
 * Type guard to check if action follows CommonErrorActionType signature,
 * do use it in runtime to safely check if action is error action.
 */
export function isCommonErrorAction(
  action: AllErrorModalActions,
): action is CommonErrorAction {
  const act = action as CommonErrorAction;

  return act && act.payload && act.payload.isCommonErrorAction;
}

export type AllErrorModalActions =
  | CommonErrorAction
  | { readonly type: typeof CLOSE_ERROR_NOTIFICATION_MODAL_ACTION_TYPE };
