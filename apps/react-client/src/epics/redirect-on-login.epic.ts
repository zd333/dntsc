import { Epic } from 'redux-observable';
import { mapTo } from 'rxjs/operators';
import { ofType } from '@martin_hotell/rex-tils';
import { routerActions } from 'connected-react-router';
import { SessionActionTypes } from '../actions/session.actions';

/**
 * Redirects user after login.
 * Currently redirection target is always default route.
 * TODO: add logic to redirect to different routes depending on user role/permissions and features available for clinic.
 */
export const redirectOnLoginEpic: Epic = action$ =>
  action$.pipe(
    ofType(SessionActionTypes.EMAIL_LOGIN_SUCCESS),
    mapTo(routerActions.push('/')),
  );
