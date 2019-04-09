import { AllAppActions, AppEpicsDependencies, RootState } from '../';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { of as observableOf } from 'rxjs';
import { ofType } from '@martin_hotell/rex-tils';
import { selectRefreshToken } from '../selectors/refresh-token.selector';
import { SessionActions, SessionActionTypes } from '../actions/session.actions';

export const refreshEmployeeSessionApiCallEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { refreshSessionApiConnector }) => {
  const refreshToken$ = state$.pipe(map(selectRefreshToken));

  return action$.pipe(
    ofType(SessionActionTypes.REFRESH_SESSION_START),
    withLatestFrom(refreshToken$),
    switchMap(([, refreshToken]) => {
      if (!refreshToken) {
        return [SessionActions.logout()];
      }

      return refreshSessionApiConnector({ refreshToken }).pipe(
        map(dto =>
          SessionActions.refreshSessionSuccess({
            accessToken: dto.authToken,
            refreshToken: dto.refreshToken,
            userRoles: dto.roles,
            userName: dto.name,
          }),
        ),
        // ! This is special error case, do not use `createAppEpicErrorAction` here to avoid loopback
        catchError(() => observableOf(SessionActions.logout())),
      );
    }),
  );
};
