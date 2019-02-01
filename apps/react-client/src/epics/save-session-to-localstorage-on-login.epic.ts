import { AppEpicsDependencies, RootState } from '..';
import { EMPTY } from 'rxjs';
import { Epic } from 'redux-observable';
import { ofType } from '@martin_hotell/rex-tils';
import { switchMapTo, tap } from 'rxjs/operators';
import {
  SessionActionTypes,
  AllSessionActions,
} from '../actions/session.actions';

export const SAVED_SESSION_LOCAL_STORAGE_KEY = 'svd_ssn';

/**
 * Saves session (auth token for now - add more data if needed) to local storage after login success.
 */
export const saveSessionToLocalStorageOnLoginEpic: Epic<
  AllSessionActions,
  AllSessionActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { localStorageService }) =>
  action$.pipe(
    ofType(SessionActionTypes.EMAIL_LOGIN_SUCCESS),
    tap(action => {
      localStorageService.setItem(
        SAVED_SESSION_LOCAL_STORAGE_KEY,
        action.payload.emailAccessToken,
      );
    }),
    // Nothing to dispatch
    switchMapTo(EMPTY),
  );
