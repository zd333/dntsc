import { Epic } from 'redux-observable';
import { map, mapTo, withLatestFrom } from 'rxjs/operators';
import { ofType } from '@martin_hotell/rex-tils';
import { routerActions } from 'connected-react-router';
import { selectRoutePath } from '../selectors/route-path.selector';
import { SessionActionTypes } from '../actions/session.actions';

export const reloadRouteOnSessionRefreshEpic: Epic = (action$, state$) => {
  const currentRoutePath$ = state$.pipe(map(selectRoutePath));

  return action$.pipe(
    ofType(SessionActionTypes.REFRESH_SESSION_SUCCESS),
    withLatestFrom(currentRoutePath$),
    // Reload current path
    map(([, currentRoutePath]) => routerActions.push(currentRoutePath)),
  );
};
