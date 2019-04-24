import { AllAppActions, AppEpicsDependencies, RootState } from '..';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { of as observableOf } from 'rxjs';
import { ofType } from '@martin_hotell/rex-tils';
import { SessionActions, SessionActionTypes } from '../actions/session.actions';

export const checkEmployeeRegistrationTokenApiCallEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { checkEmployeeRegistrationTokenApiConnector }) =>
  action$.pipe(
    ofType(SessionActionTypes.CHECK_EMPLOYEE_REGISTRATION_TOKEN_START),
    switchMap(action =>
      checkEmployeeRegistrationTokenApiConnector({
        registrationToken: action.payload.registrationToken,
      }).pipe(
        map(() => SessionActions.checkEmployeeRegistrationTokenSuccess()),
        catchError(() =>
          observableOf(SessionActions.checkEmployeeRegistrationTokenError()),
        ),
      ),
    ),
  );
