import { createSelector } from 'reselect';
import { selectSessionState } from './session-state.selector';

/**
 * Returns `undefined` when it is still unknown if token is valid or not.
 */
export const selectEmployeeRegistrationTokenIsAlreadyUsedOrExpired = createSelector(
  [selectSessionState],
  sessionState => {
    if (!sessionState) {
      return undefined;
    }

    return typeof sessionState.employeeRegistrationTokenIsValid === 'undefined'
      ? undefined
      : !sessionState.employeeRegistrationTokenIsValid;
  },
);
