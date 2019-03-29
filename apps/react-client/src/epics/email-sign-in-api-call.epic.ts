import { AllAppActions, AppEpicsDependencies, RootState } from '../../src';
import { catchError, map, switchMap } from 'rxjs/operators';
import { createAppEpicErrorAction } from '../shared/helpers/create-app-epic-error-action';
import { Epic } from 'redux-observable';
import { ofType } from '@martin_hotell/rex-tils';
import {
  SessionActionTypes,
  SessionActions,
} from '../../src/actions/session.actions';

export const emailSignInApiCallEpic: Epic<
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
            emailAccessToken: dto.authToken,
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
