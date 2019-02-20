import { AppRouePaths } from '../components/app-routes';
import { Epic } from 'redux-observable';
import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
import { ofType } from '@martin_hotell/rex-tils';
import { routerActions } from 'connected-react-router';
import { selectRoutePath } from '../selectors/route-path.selector';
import { SessionActionTypes } from '../actions/session.actions';

/**
 * Redirects user after login.
 * Currently redirection target is always default route.
 */
export const redirectOnLoginEpic: Epic = (action$, state$) => {
  const currentRoutePath$ = state$.pipe(map(selectRoutePath));

  return action$.pipe(
    ofType(SessionActionTypes.EMAIL_LOGIN_SUCCESS),
    withLatestFrom(currentRoutePath$),
    filter(([, currentRoutePath]) => currentRoutePath === AppRouePaths.login),
    mapTo(routerActions.push('/')),
  );
};
