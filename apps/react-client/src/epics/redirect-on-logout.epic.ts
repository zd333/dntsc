import { Epic } from 'redux-observable';
import { mapTo } from 'rxjs/operators';
import { ofType } from '@martin_hotell/rex-tils';
import { routerActions } from 'connected-react-router';
import { SessionActionTypes } from '../actions/session.actions';

/**
 * Redirects user after logout.
 */
export const redirectOnLogoutEpic: Epic = action$ =>
  action$.pipe(
    ofType(SessionActionTypes.LOGOUT),
    mapTo(routerActions.push('/login')),
  );
