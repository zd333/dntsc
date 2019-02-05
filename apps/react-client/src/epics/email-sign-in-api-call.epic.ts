import { AppEpicsDependencies, RootState } from '../../src';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { of as observableOf } from 'rxjs';
import { ofType } from '@martin_hotell/rex-tils';
import {
  SessionActionTypes,
  AllSessionActions,
  SessionActions,
} from '../../src/actions/session.actions';

export const emailSignInApiCallEpic: Epic<
  AllSessionActions,
  AllSessionActions,
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
            emailAccessToken: dto.authToken,
            userRoles: dto.roles,
            userName: dto.name,
            hasToChangePassword: dto.hasToChangePassword,
          }),
        ),
        catchError(error =>
          observableOf(SessionActions.emailLoginError({ error })),
        ),
      ),
    ),
  );
