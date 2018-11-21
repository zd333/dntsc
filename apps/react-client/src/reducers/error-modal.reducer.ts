import { errorModalInitialState } from './error-modal-initial-state';
import { ErrorModalState } from './error-modal-state.interface';
import {
  AllErrorModalActions,
  CLOSE_ERROR_NOTIFICATION_MODAL_ACTION_TYPE,
  isCommonErrorAction,
} from 'src/actions/error-modal.actions';

export function errorModalReducer(
  state: ErrorModalState = errorModalInitialState,
  action: AllErrorModalActions,
): ErrorModalState {
  if (action && action.type === CLOSE_ERROR_NOTIFICATION_MODAL_ACTION_TYPE) {
    return {
      ...state,
      errorModalIsShown: false,
    };
  }

  if (isCommonErrorAction(action)) {
    return {
      ...state,
      errorMessage: action.payload.errorMessage,
      errorModalIsShown: true,
    };
  }

  return state;
}
