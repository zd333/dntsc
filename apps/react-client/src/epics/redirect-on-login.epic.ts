import { appRoutesMatchSelectors } from '../selectors/app-routes-match.selector';
import { Epic } from 'redux-observable';
import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
import { ofType } from '@martin_hotell/rex-tils';
import { routerActions } from 'connected-react-router';
import { SessionActionTypes } from '../actions/session.actions';

/**
 * Redirects user after login.
 * Currently redirection target is always default route.
 */
export const redirectOnLoginEpic: Epic = (action$, state$) => {
  const loginRouteMatch$ = state$.pipe(
    map(appRoutesMatchSelectors.selectLoginRouteMatch),
  );

  return action$.pipe(
    ofType(SessionActionTypes.LOGIN_SUCCESS),
    withLatestFrom(loginRouteMatch$),
    filter(([, loginRouteMatch]) => !!loginRouteMatch),
    mapTo(routerActions.push('/')),
  );
};
