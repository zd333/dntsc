import { AllAppActions, AppEpicsDependencies, RootState } from '../';
import { createAppEpicErrorAction } from '../shared/helpers/create-app-epic-error-action';
import { Epic } from 'redux-observable';
import { Observable, of as observableOf } from 'rxjs';
import { ofType } from '@martin_hotell/rex-tils';
import { selectAuthToken } from '../selectors/auth-token.selector';
import { selectRefreshToken } from '../selectors/refresh-token.selector';
import { SessionActions, SessionActionTypes } from '../actions/session.actions';
import {
  catchError,
  map,
  switchMap,
  withLatestFrom,
  filter,
} from 'rxjs/operators';

export const refreshEmployeeSessionApiCallEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { refreshSessionApiConnector }) => {
  const authToken$ = state$.pipe(map(selectAuthToken));
  const refreshToken$ = state$.pipe(map(selectRefreshToken));

  return action$.pipe(
    ofType(SessionActionTypes.REFRESH_SESSION_START),
    withLatestFrom(authToken$, refreshToken$),
    filter(([, authToken, refreshToken]) => !!authToken && !!refreshToken),
    switchMap(([, authToken, refreshToken]) =>
      refreshSessionApiConnector({
        authToken: authToken as string,
        refreshToken: refreshToken as string,
      }).pipe(
        map(dto =>
          SessionActions.refreshSessionSuccess({
            accessToken: dto.authToken,
            refreshToken: dto.refreshToken,
          }),
        ),
        // ! This is special error case, do not use `createAppEpicErrorAction` here to avoid loopback
        catchError(() => observableOf(SessionActions.logout())),
      ),
    ),
  );
};
