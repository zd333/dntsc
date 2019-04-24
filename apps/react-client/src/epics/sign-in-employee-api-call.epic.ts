import { AllAppActions, AppEpicsDependencies, RootState } from '..';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { of as observableOf } from 'rxjs';
import { ofType } from '@martin_hotell/rex-tils';
import { SessionActions, SessionActionTypes } from '../actions/session.actions';

export const signInEmployeeApiCallEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { signInApiConnector }) =>
  action$.pipe(
    ofType(SessionActionTypes.LOGIN_START),
    switchMap(action =>
      signInApiConnector({
        login: action.payload.login,
        password: action.payload.password,
      }).pipe(
        map(dto =>
          SessionActions.loginSuccess({
            accessToken: dto.authToken,
            refreshToken: dto.refreshToken,
            userRoles: dto.roles || [],
            userName: dto.name,
          }),
        ),
        // ! This is special error case, do not use `createAppEpicErrorAction` here to avoid session refresh attempt
        catchError(error => observableOf(SessionActions.loginError({ error }))),
      ),
    ),
  );
