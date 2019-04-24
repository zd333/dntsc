import { AllAppActions, AppEpicsDependencies, RootState } from '..';
import { catchError, map, switchMap } from 'rxjs/operators';
import { createAppEpicErrorAction } from '../shared/helpers/create-app-epic-error-action';
import { Epic } from 'redux-observable';
import { ofType } from '@martin_hotell/rex-tils';
import { SessionActions, SessionActionTypes } from '../actions/session.actions';

export const registerEmployeeApiCallEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { registerEmployeeApiConnector }) =>
  action$.pipe(
    ofType(SessionActionTypes.REGISTER_EMPLOYEE_START),
    switchMap(action =>
      registerEmployeeApiConnector({
        login: action.payload.login,
        password: action.payload.password,
        name: action.payload.name,
        registrationToken: action.payload.registrationToken,
      }).pipe(
        map(dto =>
          SessionActions.registerEmployeeSuccess({
            login: action.payload.login,
            password: action.payload.password,
          }),
        ),
        catchError(error =>
          createAppEpicErrorAction(
            error,
            SessionActions.registerEmployeeError({ error }),
          ),
        ),
      ),
    ),
  );
