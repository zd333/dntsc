import { AllAppActions } from '..';
import { EMPTY } from 'rxjs';
import { Epic } from 'redux-observable';
import { ofType } from '@martin_hotell/rex-tils';
import { SAVED_SESSION_LOCAL_STORAGE_KEY } from './save-session-to-localstorage-on-login.epic';
import { SessionActionTypes } from '../actions/session.actions';
import { switchMapTo, tap } from 'rxjs/operators';

export const deleteSavedSessionFromLocalStorageOnLogoutEpic: Epic<
  AllAppActions
> = action$ =>
  action$.pipe(
    ofType(SessionActionTypes.LOGOUT),
    tap(() => {
      localStorage.removeItem(SAVED_SESSION_LOCAL_STORAGE_KEY);
    }),
    // Nothing to dispatch
    switchMapTo(EMPTY),
  );
