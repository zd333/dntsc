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
      const {
        userRoles,
        userName,
        emailAccessToken: authToken,
      } = action.payload;

      return {
        ...state,
        authToken,
        userRoles,
        userName,
        userIsLoggedIn: true,
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
        userRoles: [],
        userName: undefined,
        userIsLoggedIn: false,
      };
    }

    case SessionActionTypes.GET_FEATURES_SUCCESS: {
      const { features } = action.payload;

      return {
        ...state,
        availableFeatures: features,
      };
    }

    case SessionActionTypes.CHANGE_LANGUAGE: {
      const { language: currentLanguage } = action.payload;

      return {
        ...state,
        currentLanguage,
      };
    }

    default:
      return state;
  }
}
