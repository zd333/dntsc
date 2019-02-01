import { sessionInitialState } from './session-initial-state';
import { SessionState } from './session-state.interface';
import {
  AllSessionActions,
  SessionActionTypes,
} from '../../src/actions/session.actions';

export function sessionReducer(
  state: SessionState = sessionInitialState,
  action: AllSessionActions,
): SessionState {
  switch (action.type) {
    case SessionActionTypes.EMAIL_LOGIN_START: {
      return {
        ...state,
        authApiCommunicationIsInProgress: true,
      };
    }
    case SessionActionTypes.EMAIL_LOGIN_SUCCESS: {
      const authToken = action.payload.emailAccessToken;

      return {
        ...state,
        authToken,
        authApiCommunicationIsInProgress: false,
      };
    }
    case SessionActionTypes.EMAIL_LOGIN_ERROR: {
      return {
        ...state,
        authApiCommunicationIsInProgress: false,
      };
    }
    case SessionActionTypes.LOGOUT: {
      return {
        ...state,
        authToken: undefined,
      };
    }
    default:
      return state;
  }
}
