import { AllAppActions, AppEpicsDependencies, RootState } from '..';
import { catchError, map, switchMap } from 'rxjs/operators';
import { createAppEpicErrorAction } from '../shared/helpers/create-app-epic-error-action';
import { Epic } from 'redux-observable';
import { ofType } from '@martin_hotell/rex-tils';
import { SessionActions, SessionActionTypes } from '../actions/session.actions';

export const signInEmployeeApiCallEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { signInApiConnector }) =>
  action$.pipe(
    ofType(SessionActionTypes.EMAIL_LOGIN_START),
    switchMap(action =>
      signInApiConnector({
        login: action.payload.email,
        password: action.payload.password,
      }).pipe(
        map(dto =>
          SessionActions.emailLoginSuccess({
            accessToken: dto.authToken,
            refreshToken: dto.refreshToken,
            userRoles: dto.roles,
            userName: dto.name,
            hasToChangePassword: dto.hasToChangePassword,
          }),
        ),
        catchError(error =>
          createAppEpicErrorAction(
            error,
            SessionActions.emailLoginError({ error }),
          ),
        ),
      ),
    ),
  );
