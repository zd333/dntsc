import { EMPTY } from 'rxjs';
import { Epic } from 'redux-observable';
import { ofType } from '@martin_hotell/rex-tils';
import { SAVED_SESSION_LOCAL_STORAGE_KEY } from './save-session-to-localstorage-on-login.epic';
import { switchMapTo, tap } from 'rxjs/operators';
import {
  SessionActionTypes,
  AllSessionActions,
} from '../actions/session.actions';

export const deleteSavedSessionFromLocalStorageOnLogoutEpic: Epic<
  AllSessionActions
> = action$ =>
  action$.pipe(
    ofType(SessionActionTypes.LOGOUT),
    tap(action => {
      localStorage.removeItem(SAVED_SESSION_LOCAL_STORAGE_KEY);
    }),
    // Nothing to dispatch
    switchMapTo(EMPTY),
  );
