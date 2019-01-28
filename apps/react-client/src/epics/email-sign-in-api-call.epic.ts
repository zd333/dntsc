import { ActionsObservable, Epic } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';
import { ofType } from '@martin_hotell/rex-tils';
import { RootEpiMiddlewareDependencies } from '../../src';
import {
  SessionActionTypes,
  AllSessionActions,
  SessionActions,
} from '../../src/actions/session.actions';

export const emailSignInApiCall: Epic = (
  action$: ActionsObservable<AllSessionActions>,
  $state,
  { signInApiConnector }: RootEpiMiddlewareDependencies,
) =>
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
            hasToChangePassword: dto.hasToChangePassword,
          }),
        ),
        catchError(error =>
          observableOf(SessionActions.emailLoginError({ error })),
        ),
      ),
    ),
  );
