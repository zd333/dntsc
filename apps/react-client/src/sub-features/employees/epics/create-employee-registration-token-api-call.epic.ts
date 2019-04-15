import { AllAppActions, AppEpicsDependencies, RootState } from '../../..';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { createAppEpicErrorAction } from '../../../shared/helpers/create-app-epic-error-action';
import { EMPTY } from 'rxjs';
import { Epic } from 'redux-observable';
import { ofType } from '@martin_hotell/rex-tils';
import { selectAuthToken } from '../../../selectors/auth-token.selector';
import {
  EmployeesActionTypes,
  EmployeesActions,
} from '../actions/amployees.actions';

export const createEmployeeRegistrationTokenApiCallEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { createEmployeeRegistrationTokenApiConnector }) => {
  const authToken$ = state$.pipe(map(selectAuthToken));

  return action$.pipe(
    ofType(EmployeesActionTypes.CREATE_EMPLOYEE_REGISTRATION_TOKEN_START),
    withLatestFrom(authToken$),
    switchMap(([action, authToken]) => {
      const { roles } = action.payload;

      return createEmployeeRegistrationTokenApiConnector({
        roles,
        authToken,
      }).pipe(
        map(registrationToken =>
          EmployeesActions.createEmployeeRegistrationTokenSuccess({
            registrationToken,
          }),
        ),
        catchError(error =>
          createAppEpicErrorAction(
            error,
            EmployeesActions.createEmployeeRegistrationTokenError({ error }),
          ),
        ),
      );
    }),
  );
};
