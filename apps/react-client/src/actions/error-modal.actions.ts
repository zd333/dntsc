import { createAction } from '@martin_hotell/rex-tils';

/**
 * Definition of this state slice does not follow convention due to it is very specific
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
export function createCommonErrorAction(
  type: string,
  payload: CommonErrorActionPayload,
) {
  return createAction(type, payload);
}

interface CommonErrorActionPayload {
  isCommonErrorAction: true;
  errorMessage?: string;
}

type CommonErrorAction = ReturnType<typeof createCommonErrorAction>;

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
