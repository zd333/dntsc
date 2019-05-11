import { errorModalInitialState } from './error-modal-initial-state';
import { ErrorModalState } from './error-modal-state.interface';
import {
  AllErrorModalActions,
  CLOSE_ERROR_NOTIFICATION_MODAL_ACTION_TYPE,
  isCommonErrorAction,
  ApiError,
} from '../actions/error-modal.actions';

export function errorModalReducer(
  state: ErrorModalState = errorModalInitialState,
  action: AllErrorModalActions,
): ErrorModalState {
  // Close modal action
  if (action && action.type === CLOSE_ERROR_NOTIFICATION_MODAL_ACTION_TYPE) {
    return {
      ...state,
      errorModalIsShown: false,
    };
  }

  if (isCommonErrorAction(action)) {
    return {
      ...state,
      errorMessage: extractErrorMessage(action.payload.error),
      errorModalIsShown: true,
    };
  }

  return state;
}

function extractErrorMessage(error?: ApiError): string | undefined {
  return !!error && typeof error.error === 'string' ? error.error : undefined;
}
