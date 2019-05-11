import { sessionInitialState } from './session-initial-state';
import { SessionState } from './session-state.interface';
import {
  AllSessionActions,
  SessionActionTypes,
} from '../actions/session.actions';

export function sessionReducer(
  state: SessionState = sessionInitialState,
  action: AllSessionActions,
): SessionState {
  switch (action.type) {
    case SessionActionTypes.LOGIN_START: {
      return {
        ...state,
        authApiCommunicationIsInProgress: true,
      };
    }
    case SessionActionTypes.LOGIN_SUCCESS:
    case SessionActionTypes.REFRESH_SESSION_SUCCESS: {
      const {
        userRoles,
        userName,
        accessToken: authToken,
        refreshToken,
      } = action.payload;

      return {
        ...state,
        authToken,
        refreshToken,
        userRoles,
        userName,
        userIsLoggedIn: true,
        authApiCommunicationIsInProgress: false,
      };
    }
    case SessionActionTypes.LOGIN_ERROR: {
      return {
        ...state,
        authApiCommunicationIsInProgress: false,
      };
    }

    case SessionActionTypes.LOGOUT: {
      return {
        ...state,
        authToken: undefined,
        refreshToken: undefined,
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

    case SessionActionTypes.CHECK_EMPLOYEE_REGISTRATION_TOKEN_START: {
      return {
        ...state,
        employeeRegistrationTokenIsValid: undefined,
      };
    }
    case SessionActionTypes.CHECK_EMPLOYEE_REGISTRATION_TOKEN_SUCCESS: {
      return {
        ...state,
        employeeRegistrationTokenIsValid: true,
      };
    }
    case SessionActionTypes.CHECK_EMPLOYEE_REGISTRATION_TOKEN_ERROR: {
      return {
        ...state,
        employeeRegistrationTokenIsValid: false,
      };
    }

    case SessionActionTypes.REGISTER_EMPLOYEE_START: {
      return {
        ...state,
        authApiCommunicationIsInProgress: true,
        employeeRegistrationTokenIsValid: false,
      };
    }
    case SessionActionTypes.REGISTER_EMPLOYEE_SUCCESS:
    case SessionActionTypes.REGISTER_EMPLOYEE_ERROR: {
      return {
        ...state,
        authApiCommunicationIsInProgress: false,
      };
    }

    default:
      return state;
  }
}
